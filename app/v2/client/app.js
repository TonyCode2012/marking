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

        // 用户登录示例
        //if (this.data.logged) return
        util.showBusy('正在登录')
        var that = this
        // 调用登录接口
        qcloud.login({
            success(result) {
                if(result && result.code) {
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session',
                        data: {
                            appid: 'wx8727802679966793',
                            secret: '20a3bf08c37e5006e37e409797a6cd67',
                            js_code: result.code,
                            grant_type: 'authorization_code'
                        },
                        success: function(result) {
                            opt['sessionInfo'] = result
                            getSenderInfo(opt)
                        }
                    })
                }
                qcloud.request({
                    url: config.service.requestUrl,
                    login: true,
                    success(result) {
                        //util.showSuccess('登录成功')
                        try {
                            wx.setStorageSync('loginInfo',result)
                        } catch(e) {
                            util.showModel(JSON.stringify(e))
                        }
                        //that.registerUser(result.data.data)
                        wx.switchTab({
                            url: '../delegator/delegator'
                        })
                        //that.setData({
                        //    userInfo: result.data.data,
                        //    logged: true
                        //})
                    },
                    fail(error) {
                        util.showModel('请求失败', error)
                        console.log('request fail', error)
                    }
                })
            },

            fail(error) {
                util.showModel('登录失败', error)
                console.log('登录失败', error)
            }
        })
        // get opening share info
        //wx.login({
        //    success: function(res) {
        //        if(res.code) {
        //            wx.request({
        //                url: 'https://api.weixin.qq.com/sns/jscode2session',
        //                data: {
        //                    appid: 'wx8727802679966793',
        //                    secret: '20a3bf08c37e5006e37e409797a6cd67',
        //                    js_code: res.code,
        //                    grant_type: 'authorization_code'
        //                },
        //                success: function(result) {
        //                    opt['sessionInfo'] = result
        //                    getSenderInfo(opt)
        //                }
        //            })
        //        }
        //    }
        //})
    }
})
