const { mysql: config } = require('../../config')
var mysql = require('mysql')
var urlParser = require('url')
var queryString  = require("querystring");
var util = require('./util')

var connection = mysql.createConnection({
    host     : config.host,
    port     : config.port,
    user     : config.user,
    password : config.pass,
    database : config.db
});

connection.connect()

var updateInfo = async function(ctx) {
    var result = await updateInfo_r(ctx,connection)
    ctx.state.data = {
        result: result
    }
}

var cancelPushSeekerInfo = async function(ctx) {
    var result = await cancelPushSeekerInfo_r(ctx,connection)
    ctx.state.data = {
        result: result
    }
}

var pushSeekerInfo = async function(ctx) {
    var result = await pushSeekerInfo_r(ctx,connection)
    ctx.state.data = {
        result: result
    }
}

function cancelPushSeekerInfo_r(ctx, connection) {
    return new Promise(function (resolve, reject) {
    
        var data = urlParser.parse(ctx.originalUrl,true).query
        var queryStr = "update DelegationShip set is_release='0' where delegationship_id='" + data.id + "'"
    
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

function pushSeekerInfo_r(ctx, connection) {
    return new Promise(function (resolve, reject) {
    
        var data = urlParser.parse(ctx.originalUrl,true).query
        var queryStr = "update DelegationShip set is_release='1' where delegationship_id='" + data.id + "'"
    
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

function updateInfo_r(ctx, connection) {
    return new Promise(function (resolve, reject) {
    
        var data = urlParser.parse(ctx.originalUrl,true).query
        var tableId = ''
        switch(data.role) {
            case 'user': tableId='User';break;
            case 'seeker': tableId='SeekerInfo';break;
            case 'delegator': tableId='DelegatorInfo';break;
        }
        var updateData = JSON.parse(data.data)
        var setStr = ''
        for(e in updateData) {
            var tmp = updateData[e]
            if(tmp == null || tmp === '') setStr += (e + "=NULL,")
            else setStr += (e + "='" + tmp + "',")
        }
        setStr = setStr.substring(0,setStr.length-1)
        var queryStr = "update " + tableId + " set " +  setStr + " where open_id='" + data.open_id + "'"
    
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

function queryFromDB(resolve, reject, queryStr, connection) {
        // update SeekerInfo by open_id
    connection.query(queryStr, function (error, results, fields) {
        var retInfo = {}
        if (error) {
            console.log(error);
            retInfo = {
                msg: 'get seeker info SeekerInfo failed!',
                code: error.code,
                errno: error.errno,
                sqlMessage: error.sqlMessage,
                status: 400
            }
        } else {
            retInfo = {
                msg: 'get seeker info from SeekerInfo successfully!',
                seekerInfo: results,
                status: 200
            }
        }
        resolve(retInfo)
    });
}

module.exports = {
    updateInfo: updateInfo,
    pushSeekerInfo: pushSeekerInfo,
    cancelPushSeekerInfo: cancelPushSeekerInfo
}
