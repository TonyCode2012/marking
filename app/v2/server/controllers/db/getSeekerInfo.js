const { mysql: config } = require('../../config')
var mysql = require('mysql')
var urlParser = require('url')
var queryString  = require("querystring");

function getInfo(ctx) {
    return new Promise(function (resolve, reject) {
        var connection = mysql.createConnection({
            host     : config.host,
            port     : config.port,
            user     : config.user,
            password : config.pass,
            database : config.db
        });
    
        var data = urlParser.parse(ctx.originalUrl,true).query
        var openId = data.open_id
        var queryStr = "select * from SeekerInfo where open_id='" + openId + "'"
    
        connection.connect();
        // get info from User by open_id
        connection.query(queryStr, function (error, results, fields) {
            //if (error) throw error;
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
    var result = await getInfo(ctx)
    ctx.state.data = {
        result: result
    }
}
