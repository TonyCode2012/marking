//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({
    onLaunch: function (opt) {
        qcloud.setLoginUrl(config.service.loginUrl)
        // get opening share info
        //if(opt.scene == 1044) {
        //    wx.getShareInfo({
        //        shareTicket: opt.shareTicket,
        //        success: function(res) {
        //            var encryptedData = res.encryptedData;
        //            var iv = res.iv;
        //            wx.request({
        //                url: config.service.decryptUrl,
        //                //method: 'POST',
        //                header:{
        //                    //"content-Type":"application/x-www-form-urlencoded"
        //                    "content-Type":"application/json"
        //                },
        //                data: {
        //                    "iv": iv,
        //                    "appId":'wx8727802679966793',
        //                    "encryptedData": encryptedData
        //                }, 
        //                //dataType:"JSON",
        //                success (result) {
        //                    util.showSuccess(JSON.stringify(result))
        //                },
        //                fail (error) {
        //                    util.showModel('请求失败', error);
        //                    console.log('request fail', error);
        //                }
        //            })
        //        }
        //    })
        //}
    }
})
