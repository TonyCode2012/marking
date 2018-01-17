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
            case 'delegationShip': tableId='DelegationShip';break;
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
                    msg: 'register ' + role + ' failed!',
                    code: error.code,
                    errno: error.errno,
                    sqlMessage: error.sqlMessage,
                    status: 400
                }
            } else {
                retInfo = {
                    msg: 'register ' + role + ' successfully!',
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
