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

var insertD2S = async function(ctx) {
    var dataList = urlParser.parse(ctx.originalUrl,true).query.insertArry
    var dataList = JSON.parse(dataList)
    var resArry = []
    for(var i=0;i<dataList.length;i++) {
        var kvPair = util.getJSONKeyVal(dataList[i])
        var cdStr = util.getCondition(dataList[i],'and')
        var res_f = await confirmNODup(cdStr,connection)
        if(res_f.data.length == 0) {
            var res = await insertD2S_r(kvPair,connection)
            resArry.push(res)
        } else {
            console.log('Record has been existed!')
        }
    }

    ctx.state.data = {
        result: resArry
    }
}

function confirmNODup(condition,connection) {
    return new Promise(function (resolve, reject) {
        var queryStr = "select * from D2SPush where " + condition
        queryFromDB(resolve, reject, queryStr,connection)
    })
}

function insertD2S_r(kvPair,connection) {
    return new Promise(function (resolve, reject) {
        var queryStr = "insert into D2SPush " + kvPair.keyStr + " values " + kvPair.valStr
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
    insertD2S: insertD2S
}
