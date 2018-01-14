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
        var tableId = ''
        switch(data.role) {
            case 'user': tableId='User';break;
            case 'seeker': tableId='SeekerInfo';break;
            case 'delegator': tableId='DelegatorInfo';break;
        }
        var queryStr = "select * from " + tableId + " where open_id='" + openId + "'"
    
        connection.connect();
        // get info from User by open_id
        connection.query(queryStr, function (error, results, fields) {
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
                    data: results,
                    status: 200
                }
            }
            resolve(retInfo)
        });
        
        connection.end();
    })
}

module.exports = async ctx => {
    var result = await getInfo(ctx)
    ctx.state.data = {
        result: result
    }
}
