var WXBizDataCrypt = require('./dataCrypt/WXBizDataCrypt')
var urlParser = require('url')
var queryString  = require("querystring");

//module.exports = async (ctx, next) => {
module.exports = ctx => {
    // 获取上传之后的结果
    // 具体可以查看：
    //const data = await ctx.req.data
    //var data = ctx.req.data.request.url
    var data = urlParser.parse(ctx.originalUrl,true).query

    var pc = new WXBizDataCrypt(data.appId, data.session_key)
    
    var decryptedData = pc.decryptData(data.encryptedData, data.iv)

    ctx.state.data = {
        decryptedData: decryptedData
    }
}

