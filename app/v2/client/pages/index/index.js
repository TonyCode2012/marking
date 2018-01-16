//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: ''
    },

    onShow: function(opt) {
        // 获取登录场景值
        var appInstance = getApp()
        var loginAppInfo = appInstance.data.loginAppInfo
        if(loginAppInfo.scene == 1044) {
            // 转发登录场景
            this.login({loginAppInfo:loginAppInfo},() => {
                if(loginAppInfo.query.role == 'seeker') {
                    wx.switchTab({
                        url: '../seeker/seeker'
                    })
                } else {
                    wx.switchTab({
                        url: '../delegator/delegator'
                    })
                }
            })
        }
    },
    onLoad: function(opt) {
        wx.showShareMenu({
            withShareTicket: true
        })
        // get opening share info
        //if(opt.scene == 1044) {
        //    wx.getShareInfo({
        //        shareTicket: opt.shareTicket,
        //        success: function(res) {
        //            var encryptedData = res.encryptedData;
        //            var iv = res.iv;
        //        }
        //    })
        //}
    },
    // 转发应该设置在客户或者红娘页面
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '转发给',
          path: '/pages/index/index?openId='+openId+'&role=delegator',
          success: function(res) {
            // 转发成功
            util.showSuccess('转发成功')
            //util.showSuccess(JSON.stringify(res))
          },
          fail: function(res) {
            // 转发失败
            util.showSuccess('转发失败')
          }
        }
    },
    getReceiverInfo: function(options) {
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
    },
    // 用户登录示例
    login: function(args,callback) {
        if (this.data.logged) return

        util.showBusy('正在登录')
        var that = this

        // 调用登录接口
        qcloud.login({
            success(result) {
                if(result) {
                    //if(result.code) {
                    //    wx.request({
                    //        url: 'https://api.weixin.qq.com/sns/jscode2session',
                    //        data: {
                    //            appid: 'wx8727802679966793',
                    //            secret: '20a3bf08c37e5006e37e409797a6cd67',
                    //            js_code: result.code,
                    //            grant_type: 'authorization_code'
                    //        },
                    //        success: function(result) {
                    //            var opt = {
                    //                sessionInfo: result
                    //            }
                    //            // 获取转发到的微信组群的信息
                    //            that.getReceiverInfo(opt)
                    //            // 在首次登录的时候就行用户的注册
                    //            //that.registerUser(result.data.data)
                    //        }
                    //    })
                    //}
                    // 在首次登录的时候就行用户的注册
                    that.registerUser(result,callback)
                    // 保存登录获取的用户微信信息
                    try {
                        wx.setStorageSync('loginInfo',result)
                    } catch(e) {
                        util.showModel('set login info failed!',JSON.stringify(e))
                    }
                    // 根据场景值判断是否进行转发
                    if(args.loginAppInfo == undefined) {
                        wx.switchTab({
                            url: '../delegator/delegator'
                        })
                    }
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    qcloud.request({
                        url: config.service.requestUrl,
                        login: true,
                        success(result) {
                            util.showSuccess('登录成功')
                            // 保存登录获取的用户微信信息
                            try {
                                wx.setStorageSync('loginInfo',result)
                            } catch(e) {
                                util.showModel('set login info failed!',JSON.stringify(e))
                            }
                            if(args.loginAppInfo == undefined) {
                                wx.switchTab({
                                    url: '../delegator/delegator'
                                })
                            }
                            callback()
                        },
                        fail(error) {
                            util.showModel('请求失败', error)
                            console.log('request fail', error)
                        }
                    })
                }
            },

            fail(error) {
                util.showModel('登录失败', error)
                console.log('登录失败', error)
            }
        })
    },

    registerUser: function(opt,callback) {
        var openId = opt.openId
        var userInfo = {
            data: {
                open_id: openId,
                public_key: openId + '12345',
                chain_addr: openId + '98765',
                balance: 100,
                //gender: gender==1?'男':'女',
                register_time: util.getCurDatetime(),
                identity_hash: openId + 'yaoz',
                status: 0,
                role: 0
            },
            role: 'user'
        }
        wx.request({
            url: config.service.registerUrl,
            data: userInfo,
            success: function(res) {
                callback()
                //util.showSuccess('Register user successfully!')
            },
            fail: function(res) {
                callback()
            }
        })
    },

    // 切换是否带有登录态
    switchRequestMode: function (e) {
        this.setData({
            takeSession: e.detail.value
        })
        this.doRequest()
    },

    doRequest: function () {
        util.showBusy('请求中...')
        var that = this
        var options = {
            url: config.service.requestUrl,
            login: true,
            success (result) {
                util.showSuccess('请求成功完成')
                console.log('request success', result)
                that.setData({
                    requestResult: JSON.stringify(result.data)
                })
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        }
        if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
            qcloud.request(options)
        } else {    // 使用 wx.request 则不带登录态
            wx.request(options)
        }
    },

    // 上传图片接口
    doUpload: function () {
        var that = this

        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
                util.showBusy('正在上传')
                var filePath = res.tempFilePaths[0]

                // 上传图片
                wx.uploadFile({
                    url: config.service.uploadUrl,
                    filePath: filePath,
                    name: 'file',

                    success: function(res){
                        util.showSuccess('上传图片成功')
                        console.log(res)
                        res = JSON.parse(res.data)
                        console.log(res)
                        that.setData({
                            imgUrl: res.data.imgUrl
                        })
                    },

                    fail: function(e) {
                        util.showModel('上传图片失败')
                    }
                })

            },
            fail: function(e) {
                console.error(e)
            }
        })
    },

    // 预览图片
    previewImg: function () {
        wx.previewImage({
            current: this.data.imgUrl,
            urls: [this.data.imgUrl]
        })
    },

    // 切换信道的按钮
    switchChange: function (e) {
        var checked = e.detail.value

        if (checked) {
            this.openTunnel()
        } else {
            this.closeTunnel()
        }
    },

    openTunnel: function () {
        util.showBusy('信道连接中...')
        // 创建信道，需要给定后台服务地址
        var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl)

        // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
        tunnel.on('connect', () => {
            util.showSuccess('信道已连接')
            console.log('WebSocket 信道已连接')
            this.setData({ tunnelStatus: 'connected' })
        })

        tunnel.on('close', () => {
            util.showSuccess('信道已断开')
            console.log('WebSocket 信道已断开')
            this.setData({ tunnelStatus: 'closed' })
        })

        tunnel.on('reconnecting', () => {
            console.log('WebSocket 信道正在重连...')
            util.showBusy('正在重连')
        })

        tunnel.on('reconnect', () => {
            console.log('WebSocket 信道重连成功')
            util.showSuccess('重连成功')
        })

        tunnel.on('error', error => {
            util.showModel('信道发生错误', error)
            console.error('信道发生错误：', error)
        })

        // 监听自定义消息（服务器进行推送）
        tunnel.on('speak', speak => {
            util.showModel('信道消息', speak)
            console.log('收到说话消息：', speak)
        })

        // 打开信道
        tunnel.open()

        this.setData({ tunnelStatus: 'connecting' })
    },

    /**
     * 点击「发送消息」按钮，测试使用信道发送消息
     */
    sendMessage() {
        if (!this.data.tunnelStatus || !this.data.tunnelStatus === 'connected') return
        // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
        if (this.tunnel && this.tunnel.isActive()) {
            // 使用信道给服务器推送「speak」消息
            this.tunnel.emit('speak', {
                'word': 'I say something at ' + new Date(),
            });
        }
    },

    /**
     * 点击「关闭信道」按钮，关闭已经打开的信道
     */
    closeTunnel() {
        if (this.tunnel) {
            this.tunnel.close();
        }
        util.showBusy('信道连接中...')
        this.setData({ tunnelStatus: 'closed' })
    }
})
