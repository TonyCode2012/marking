const { mysql: config } = require('../../config')
var mysql = require('mysql')
var urlParser = require('url')
var queryString  = require("querystring");

//module.exports = async (ctx, next) => {
module.exports = ctx => {
    //var data = ctx.req.data.request.url
    var connection = mysql.createConnection({
        host     : config.host,
        port     : config.port,
        user     : config.user,
        password : config.pass,
        database : config.db
    });

    var data = urlParser.parse(ctx.originalUrl,true).query
    var userInfo = JSON.parse(data.userInfo)
    var seekerInfo = JSON.parse(data.seekerInfo)
    var userInfo_key = '('
    var userInfo_val = '('
    var seekerInfo_key = '('
    var seekerInfo_val = '('
    for(e in userInfo) {
        userInfo_key = userInfo_key + e + ','
        if(userInfo[e] === '') userInfo_val = userInfo_val + "NULL,"
        else userInfo_val = userInfo_val + "'" + userInfo[e] + "',"
    }
    userInfo_key = userInfo_key.substring(0,userInfo_key.length-1) + ')'
    userInfo_val = userInfo_val.substring(0,userInfo_val.length-1) + ')'
    for(e in seekerInfo) {
        seekerInfo_key = seekerInfo_key + e + ','
        if(seekerInfo[e] === '') seekerInfo_val = seekerInfo_val + "NULL,"
        else seekerInfo_val = seekerInfo_val + "'" + seekerInfo[e] + "',"
    }
    seekerInfo_key = seekerInfo_key.substring(0,seekerInfo_key.length-1) + ')'
    seekerInfo_val = seekerInfo_val.substring(0,seekerInfo_val.length-1) + ')'
    var userQuery = 'insert into User ' + userInfo_key + ' values ' + userInfo_val
    var seekerQuery = 'insert into SeekerInfo '  + seekerInfo_key + ' values ' + seekerInfo_val

    connection.connect();
    //console.log('user query is:' + userQuery)
    //console.log('seeker query is:' + seekerQuery)
    var retInfo = {}
    // insert info into User table
    connection.query(userQuery, function (error, results, fields) {
        //if (error) throw error;
        if (error) {
            console.log(error);
            retInfo = {
                msg: 'insert into db failed!',
                code: error.code,
                errno: error.errno,
                sqlMessage: error.sqlMessage
            }
        } else {
            retInfo = {
                msg: 'insert into db successfully!'
            }
        }
    });
    // insert info into SeekerInfo table
    connection.query(seekerQuery, function (error, results, fields) {
        //if (error) throw error;
        if (error) {
            console.log(error);
            retInfo = {
                msg: 'insert into db failed!',
                code: error.code,
                errno: error.errno,
                sqlMessage: error.sqlMessage
            }
        } else {
            retInfo = {
                msg: 'insert into db successfully!'
            }
        }
    });
    
    connection.end();
    
    ctx.state.data = {
        retInfo: retInfo
    }
}


