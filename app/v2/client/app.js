//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({
    onLaunch: function (opt) {
        qcloud.setLoginUrl(config.service.loginUrl)
        var getSenderInfo = options => {
            if(options.scene == 1044) {
                var sessionInfo = options.sessionInfo.data
                wx.getShareInfo({
                    shareTicket: options.shareTicket,
                    success: function(res) {
                        var encryptedData = res.encryptedData;
                        var iv = res.iv;
                        wx.request({
                            url: config.service.decryptUrl,
                            //method: 'POST',
                            header:{
                                //"content-Type":"application/x-www-form-urlencoded"
                                "content-Type":"application/json"
                            },
                            data: {
                                "iv": iv,
                                "session_key": sessionInfo.session_key,
                                "appId":'wx8727802679966793',
                                "encryptedData": encryptedData
                            }, 
                            //dataType:"JSON",
                            success (result) {
                                var testRes = result;
                                //util.showSuccess(JSON.stringify(result))
                            },
                            fail (error) {
                                util.showModel('请求失败', error);
                                console.log('request fail', error);
                            }
                        })
                    }
                })
            }
        }
        // get opening share info
        wx.login({
            success: function(res) {
                if(res.code) {
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session',
                        data: {
                            appid: 'wx8727802679966793',
                            secret: '20a3bf08c37e5006e37e409797a6cd67',
                            js_code: res.code,
                            grant_type: 'authorization_code'
                        },
                        success: function(result) {
                            opt['sessionInfo'] = result
                            getSenderInfo(opt)
                        }
                    })
                }
            }
        })
    },
    getSenderInfo: function(opt) {
    }
})
