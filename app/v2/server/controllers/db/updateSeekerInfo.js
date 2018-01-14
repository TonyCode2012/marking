const { mysql: config } = require('../../config')
var mysql = require('mysql')
var urlParser = require('url')
var queryString  = require("querystring");
var util = require('./util')

function updateInfo(ctx) {
    return new Promise(function (resolve, reject) {
        var connection = mysql.createConnection({
            host     : config.host,
            port     : config.port,
            user     : config.user,
            password : config.pass,
            database : config.db
        });
    
        var data = urlParser.parse(ctx.originalUrl,true).query
        var updateData = JSON.parse(data.data)
        var setStr = ''
        for(e in updateData) {
            var tmp = updateData[e]
            if(tmp == null || tmp === '') setStr += (e + "=NULL,")
            else setStr += (e + "='" + tmp + "',")
        }
        setStr = setStr.substring(0,setStr.length-1)
        var queryStr = "update SeekerInfo set " +  setStr + " where open_id='" + data.open_id + "'"
    
        connection.connect();
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
        
        connection.end();
    })
}

module.exports = async ctx =>  {
    var result = await updateInfo(ctx)
    ctx.state.data = {
        result: result
    }
}

