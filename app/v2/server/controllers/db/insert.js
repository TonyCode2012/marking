const { mysql: config } = require('../../config')
var mysql = require('mysql')
var urlParser = require('url')
var queryString  = require("querystring");
var util = require('./util')
var sd = require('silly-datetime');
var getQ = require('./getInfo')


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

var insertMatchContract = async function(ctx) {
    var data = urlParser.parse(ctx.originalUrl,true).query
    var result = {}
    var pSQuery = {
        open_id: data.pSeeker_openid,
        fields: "reward,advance"
    }
    var tSQuery = {
        open_id: data.tSeeker_openid,
        fields: "reward,advance"
    }
    var pSInfo = await getQ.getSeekerInfoByField(pSQuery)
    var tSInfo = await getQ.getSeekerInfoByField(tSQuery)
    if(pSInfo.status == 200 && tSInfo.status == 200) {
        pSInfo = pSInfo.data[0]
        tSInfo = tSInfo.data[0]
        var time = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
        var qData = {
            contract_addr: 'xxx',
            pDelegator_openid: data.pDelegator_openid,
            pSeeker_openid: data.pSeeker_openid,
            tDelegator_openid: data.tDelegator_openid,
            tSeeker_openid: data.tSeeker_openid,
            pReward: pSInfo.reward,
            tReward: tSInfo.reward,
            pAdvance: pSInfo.advance,
            tAdvance: tSInfo.advance,
            status: 0,
            signature: 'xxxx',
            signature_date: time
        }
        var kvPair = util.getJSONKeyVal(qData)
        result = await insertMatchContract_r(kvPair,connection)
    } else {
        result['status'] = 400
        result['msg'] = 'Get seeker reward or advance failed!'
    }
    ctx.state.data = {
        result: result
    }
}

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
    dataList = JSON.parse(dataList)
    var resArry = []
    for(var i=0;i<dataList.length;i++) {
        var cdStr = util.getCondition(dataList[i],allIDFields,'and')
        var data = {
            condition: cdStr,
            tableId: tableId
        }
        var res_f = await confirmNODup(data,connection)
        if(res_f.data.length == 0) {
            var time = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
            dataList[i].status = 0
            dataList[i].start_time = time
            var kvPair = util.getJSONKeyVal(dataList[i])
            var res = await insertRelation_r(tableId,kvPair,connection)
            resArry.push(res)
        } else {
            console.log('Record has been existed!')
        }
    }

    return resArry
}

function insertMatchContract_r(data,connection) {
    return new Promise(function (resolve, reject) {
        var queryStr = "insert into MatchContract "+data.keyStr+" values "+data.valStr
        queryFromDB(resolve, reject, queryStr,connection)
    })
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
    insertD2D: insertD2D,
    insertMatchContract: insertMatchContract
}
