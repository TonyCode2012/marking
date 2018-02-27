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

var updateSeekerInfo = async function(opt) {
    var result = await updateInfoByCd(opt,'SeekerInfo')
}

var setMarryAccept = async function(ctx) {
    var data = urlParser.parse(ctx.originalUrl,true).query
    var queryData = data.queryData
    var cdStr = util.getConditionAll(JSON.parse(queryData),'and')
    var orgState = data.state
    var role = data.role
    var state = 0
    if (orgState == 1 || orgState == 3) state = 5
    else state = (role == 'pSeeker' ? 1 : 3)
    var para = {
        state: state,
        cdStr: cdStr
    }
    var result = await setMarry_r(para,connection)
    
    finalState = (result.status == 200 ? state : -1)

    ctx.state.data = {
        result: result,
        state: finalState
    }
}

var setMarryRefuse = async function(ctx) {
    var data = urlParser.parse(ctx.originalUrl,true).query
    var cdStr = util.getConditionAll(JSON.parse(data.queryData),'and')
    var state = (data.role == 'pSeeker' ? 2 : 4)
    var para = {
        state: state,
        cdStr: cdStr
    }
    var result = await setMarry_r(para,connection)
    ctx.state.data = {
        result: result
    }
}

var setMatchAccept = async function(ctx) {
    var data = urlParser.parse(ctx.originalUrl,true).query
    var queryData = JSON.parse(data.queryData)
    var cdStr = util.getConditionAll(queryData,'and')
    var orgState = data.state
    var role = data.role
    var state = 0
    if (orgState == 1 || orgState == 3) state = 5
    else state = (role == 'pSeeker' ? 1 : 3)
    var para = {
        state: state,
        cdStr: cdStr
    }
    var result = await setMatch_r(para,connection)
    if ( state == 5 ) {
        // 恋爱成功，更改SeekerInfo表中的status状态为’冻结‘
        console.log("queryData is:" + JSON.stringify(queryData))
        var sVal = "status='1'"
        var sPcd = "open_id='" + queryData.pSeeker_openid + "'"
        var sTcd = "open_id='" + queryData.tSeeker_openid + "'"
        var opt1 = { val: sVal, cdStr: sPcd }
        var opt2 = { val: sVal, cdStr: sTcd }
        var pSeeker_res = await updateSeekerInfo(opt1)
        var tSeeker_res = await updateSeekerInfo(opt2)
    }
    
    var finalState = (result.status == 200 ? state : -1)

    ctx.state.data = {
        result: result,
        state: finalState
    }
}

var setMatchRefuse = async function(ctx) {
    var data = urlParser.parse(ctx.originalUrl,true).query
    var cdStr = util.getConditionAll(JSON.parse(data.queryData),'and')
    var state = (data.role == 'pSeeker' ? 2 : 4)
    var para = {
        state: state,
        cdStr: cdStr
    }
    var result = await setMatch_r(para,connection)
    ctx.state.data = {
        result: result
    }
}

var updateInfo = async function(ctx) {
    var result = await updateInfo_r(ctx,connection)
    ctx.state.data = {
        result: result
    }
}

var cancelPushSeekerInfo = async function(ctx) {
    var result = await chgSRelease(ctx,0,connection)
    ctx.state.data = {
        result: result
    }
}

var pushSeekerInfo = async function(ctx) {
    var result = await chgSRelease(ctx,1,connection)
    ctx.state.data = {
        result: result
    }
}

function updateInfoByCd(opt,tableId) {
    return new Promise(function (resolve, reject) {
        var queryStr = "update " + tableId + " set " + opt.val + " where " + opt.cdStr
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

function setMarry_r(data,connection) {
    return new Promise(function (resolve, reject) {
    
        var queryStr = "update MatchContract set status='" + data.state + "' where " + data.cdStr
    
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

function setMatch_r(data,connection) {
    return new Promise(function (resolve, reject) {
    
        var queryStr = "update D2SPush set status='" + data.state + "' where " + data.cdStr
    
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

function updateD2SStatus(id,state,connection) {
    return new Promise(function (resolve, reject) {
    
        var data = urlParser.parse(ctx.originalUrl,true).query
        var queryStr = "update D2SPush set status='"+state+"' where delegationship_id='" + data.id + "'"
    
        queryFromDB(resolve,reject,queryStr,connection)
    })
}

function chgSRelease(ctx, state, connection) {
    return new Promise(function (resolve, reject) {
    
        var data = urlParser.parse(ctx.originalUrl,true).query
        var cdStr = util.getConditionAll(data,'and')
        var queryStr = "update DelegationShip set is_release='" + state + "' where " + cdStr
    
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
                msg: 'update info failed!',
                code: error.code,
                errno: error.errno,
                sqlMessage: error.sqlMessage,
                status: 400
            }
        } else {
            retInfo = {
                msg: 'update info successfully!',
                result: results,
                status: 200
            }
        }
        resolve(retInfo)
    });
}

module.exports = {
    updateInfo: updateInfo,
    updateSeekerInfo: updateSeekerInfo,
    pushSeekerInfo: pushSeekerInfo,
    cancelPushSeekerInfo: cancelPushSeekerInfo,
    setMatchAccept: setMatchAccept,
    setMatchRefuse: setMatchRefuse,
    setMarryAccept: setMarryAccept,
    setMarryRefuse: setMarryRefuse
}
