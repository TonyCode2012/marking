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

var registerDelegationship = async function(ctx) {
    var data = urlParser.parse(ctx.originalUrl,true).query
    var result = await register_r(data,'DelegationShip')
    ctx.state.data = {
        result: result
    }
}

var registerUser = async function(ctx) {
    var data = urlParser.parse(ctx.originalUrl,true).query
    var result = await register_r(data,'User')
    ctx.state.data = {
        result: result
    }
}

var registerSeeker = async function(ctx) {
    var data = urlParser.parse(ctx.originalUrl,true).query
    var result = await register_r(data,'SeekerInfo')
    ctx.state.data = {
        result: result
    }
}

var registerDelegator = async function(ctx) {
    var data = urlParser.parse(ctx.originalUrl,true).query
    var result = await register_r(data,'DelegatorInfo')
    ctx.state.data = {
        result: result
    }
}

function register_r(data,tableId) {
    return new Promise(function (resolve, reject) {
        var kvPair = util.getJSONKeyVal(data)
        var queryStr = 'insert into '+tableId+' '+kvPair.keyStr+' values '+kvPair.valStr
        queryFromDB(resolve,reject,queryStr,tableId,connection)
    })
}

function queryFromDB(resolve, reject, queryStr, tableId, connection) {
    connection.query(queryStr, function (error, results, fields) {
        //if (error) throw error;
        var retInfo = {}
        if (error) {
            console.log(error);
            retInfo = {
                msg: 'register ' + tableId + ' failed!',
                code: error.code,
                errno: error.errno,
                sqlMessage: error.sqlMessage,
                status: 400
            }
        } else {
            retInfo = {
                msg: 'register ' + tableId + ' successfully!',
                seekerInfo: results,
                status: 200
            }
        }
        resolve(retInfo)
    });
}

module.exports = {
    registerUser: registerUser,
    registerSeeker: registerSeeker,
    registerDelegator: registerDelegator,
    registerDelegationship: registerDelegationship
}
