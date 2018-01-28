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

connection.connect();

var allIDFields = ['pDelegator_openid','pSeeker_openid','tDelegator_openid','tSeeker_openid']
var twoIDFields = ['delegator_openid','seeker_openid']

var insertDelegationShip = async function(ctx) {
    var idata = urlParser.parse(ctx.originalUrl,true).query.data
    var cdStr = util.getCondition(idata,twoIDFields,'and')
    var res = {}
    var data = {
        condition: cdStr,
        tableId: 'DelegationShip'
    }
    var res_f = await confirmNODup(data,connection)
    if(res_f.status != 200 ) {
        res = await insertDelegationShip_r(ctx,connection)
    } else {
        console.log('Record has been existed!')
        res.status = 400
    }

    ctx.state.data = {
        result: res
    }
}

var insertD2D = function(ctx) {
    var resArry = insertRelation(ctx,'D2DPush')
    ctx.state.data = {
        result: resArry
    }
}

var insertD2S = function(ctx) {
    var resArry = insertRelation(ctx,'D2SPush')
    ctx.state.data = {
        result: resArry
    }
}

var insertRelation = async function(ctx,tableId) {
    var dataList = urlParser.parse(ctx.originalUrl,true).query.insertArry
    var dataList = JSON.parse(dataList)
    var resArry = []
    for(var i=0;i<dataList.length;i++) {
        var kvPair = util.getJSONKeyVal(dataList[i])
        var cdStr = util.getCondition(dataList[i],allIDFields,'and')
        var data = {
            condition: cdStr,
            tableId: tableId
        }
        var res_f = await confirmNODup(cdStr,connection)
        if(res_f.data.length == 0) {
            var res = await insertRelation_r(tableId,kvPair,connection)
            resArry.push(res)
        } else {
            console.log('Record has been existed!')
        }
    }

    return resArry
}

function insertDelegationShip_r(ctx,connection) {
    return new Promise(function (resolve, reject) {
        var queryStr = "insert into DelegationShip " + 
        queryFromDB(resolve, reject, queryStr,connection)
    })
}

function confirmNODup(data,connection) {
    return new Promise(function (resolve, reject) {
        var queryStr = "select * from " + data.tableId + " where " + data.condition
        queryFromDB(resolve, reject, queryStr,connection)
    })
}

function insertRelation_r(tableId,kvPair,connection) {
    return new Promise(function (resolve, reject) {
        var queryStr = "insert into " + tableId + " " + kvPair.keyStr + " values " + kvPair.valStr
        queryFromDB(resolve, reject, queryStr,connection)
    })
}

function queryFromDB(resolve, reject, queryStr, connection) {
    // get info from User by open_id
    connection.query(queryStr, function (error, results, fields) {
        var retInfo = {}
        if (error) {
            console.log(error);
            retInfo = {
                msg: 'insert record failed!',
                code: error.code,
                errno: error.errno,
                sqlMessage: error.sqlMessage,
                status: 400
            }
        } else {
            retInfo = {
                msg: 'insert record successfully!',
                data: results,
                status: 200
            }
        }
        resolve(retInfo)
    });
    
}

module.exports = {
    insertD2S: insertD2S,
    insertDelegationShip: insertDelegationShip,
    insertD2D: insertD2D
}
