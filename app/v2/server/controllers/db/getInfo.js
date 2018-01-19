const { mysql: config } = require('../../config')
var mysql = require('mysql')
var urlParser = require('url')
var queryString  = require("querystring");


var connection = mysql.createConnection({
    host     : config.host,
    port     : config.port,
    user     : config.user,
    password : config.pass,
    database : config.db
});

connection.connect();

var getMessageList = async function(ctx) {

    var data = await getMessageList_r(connection)
    var idArry = data.data
    var resArry = []
    for(var i=0;i<idArry.length;i++) {
        var queryStr = "select * from SeekerInfo where open_id='" + idArry[i].seeker_openId + "' and is_public='1'"
        var result = await getSeekerInfo_r(queryStr,connection)
        if(result.data) {
            resArry.push(result.data[0])
        }
    }

    ctx.state.data = {
        result: resArry
    }
}

var getUserInfo = async function(ctx) {

    var result = await getUserInfo_r(ctx,connection)

    ctx.state.data = {
        result: result
    }
}

var getDTaskInfo = async function(ctx) {

    var data = await getDTaskInfo_r(ctx,connection)
    var idArry = data.data
    var resArry = []
    for(var i=0;i<idArry.length;i++) {
        var queryStr = "select * from SeekerInfo where open_id='" + idArry[i].seeker_openId + "'"
        var result = await getSeekerInfo_r(queryStr,connection)
        if(result.data) {
            result.data[0]['is_release'] = idArry[i]['is_release']
            resArry.push(result.data[0])
        }
    }

    ctx.state.data = {
        result: resArry
    }
}

function getUserInfo_r(ctx, connection) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query

        var openId = data.open_id
        var tableId = ''
        switch(data.role) {
            case 'user': tableId='User';break;
            case 'seeker': tableId='SeekerInfo';break;
            case 'delegator': tableId='DelegatorInfo';break;
        }
        var queryStr = "select * from " + tableId + " where open_id='" + openId + "'"

        queryFromDB(resolve, reject, queryStr,connection)
    })
}

function getDTaskInfo_r(ctx,connection) {
    return new Promise(function (resolve, reject) {
        var data = urlParser.parse(ctx.originalUrl,true).query
        var queryStr = "select * from DelegationShip where delegator_openId='" + data.delegator_openId + "'"

        queryFromDB(resolve, reject, queryStr,connection)
    })
}

function getSeekerInfo_r(queryStr, connection) {
    return new Promise(function (resolve, reject) {

        queryFromDB(resolve, reject, queryStr, connection)
    })
}

function getMessageList_r(connection) {
    return new Promise(function (resolve, reject) {
        var queryStr = "select * from DelegationShip where is_release='1'"
        queryFromDB(resolve, reject, queryStr, connection)
    })
}

function queryFromDB(resolve, reject, queryStr, connection) {
    // get info from User by open_id
    connection.query(queryStr, function (error, results, fields) {
        var retInfo = {}
        if (error) {
            console.log(error);
            retInfo = {
                msg: 'get info failed!',
                code: error.code,
                errno: error.errno,
                sqlMessage: error.sqlMessage,
                status: 400
            }
        } else if(results.length == 0) {
            retInfo = {
                msg: 'no record found!',
                status: 201
            }
        } else {
            retInfo = {
                msg: 'get info successfully!',
                data: results,
                status: 200
            }
        }
        resolve(retInfo)
    });
    
}

module.exports = {
    getUserInfo: getUserInfo,
    getDTaskInfo: getDTaskInfo,
    getMessageList: getMessageList
}
