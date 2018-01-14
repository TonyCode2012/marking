const { mysql: config } = require('../../config')
var mysql = require('mysql')
var urlParser = require('url')
var queryString  = require("querystring");
var util = require('./util')

function register(ctx) {
    return new Promise(function (resolve, reject) {
        var connection = mysql.createConnection({
            host     : config.host,
            port     : config.port,
            user     : config.user,
            password : config.pass,
            database : config.db
        });
    
        var args = urlParser.parse(ctx.originalUrl,true).query
        var userInfo = util.getJSONKeyVal(JSON.parse(args.data))
        var role = args.role
        var tableId = ''
        switch(role) {
            case 'user': tableId='User';break;
            case 'seeker': tableId='SeekerInfo';break;
            case 'delegator': tableId='DelegatorInfo';break;
        }
        var userQuery = 'insert into ' + tableId + ' ' + userInfo.keyStr + ' values ' + userInfo.valStr
    
        connection.connect();
        console.log('user query is:' + userQuery)
        var retInfo = {}
        // insert info into User table
        connection.query(userQuery, function (error, results, fields) {
            //if (error) throw error;
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
                    msg: 'New user, please register!',
                    status: 201
                }
            } else {
                retInfo = {
                    msg: 'get info successfully!',
                    seekerInfo: results,
                    status: 200
                }
            }
            resolve(retInfo)
        });
        
        connection.end();
        
    })
}

function registerSeeker(ctx) {
    return new Promise(function (resolve, reject) {
        var connection = mysql.createConnection({
            host     : config.host,
            port     : config.port,
            user     : config.user,
            password : config.pass,
            database : config.db
        });
    
        var data = urlParser.parse(ctx.originalUrl,true).query
        var seekerInfo = util.getJSONKeyVal(data)
        var seekerQuery = 'insert into SeekerInfo '  + seekerInfo.keyStr + ' values ' + seekerInfo.valStr
    
        connection.connect();
        console.log('seeker query is:' + seekerQuery)
        var retInfo = {}
        // insert info into SeekerInfo table
        connection.query(seekerQuery, function (error, results, fields) {
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
            } else if(results.length == 0) {
                retInfo = {
                    msg: 'New user please register!',
                    status: 201
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
        
        connection.end();
        
    })
}

module.exports = async ctx => {
    var result = await register(ctx)
    ctx.state.data = {
        result: result
    }
}
