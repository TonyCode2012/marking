var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js')
var config = require('../../config')
const { Tab, extend } = require('../../zanui-style/index');

Page(extend({}, Tab, {
    data: {
        homePage: {
            tabContent: {
                list: {
                    myPush: {
                        id: 'myPush',
                        title: '我的推送',
                        data: {
                            list: {
                                receivedPush: {
                                    id: 'receivedPush',
                                    title: '收到的推送'
                                },
                                sendedPush: {
                                    id: 'sendedPush',
                                    title: '发出的推送'
                                }
                            },
                            activeIndex: 0,
                            selectedId: 'receivedPush',
                            sliderOffset: 0,
                            sliderLeft: 0,
                            title: '新建发布',
                            myRequest: '我的要求'
                        }
                    },
                    myMatch: {
                        id: 'myMatch',
                        title: '我的匹配'
                    },
                    messageList: {
                        id: 'messageList',
                        title: '信息发布榜'
                    },
                    myDelegator:{
                        id: 'myMatchMaker',
                        title: '我的红娘'
                    },
                    myInfo: {
                        id: 'myInfo',
                        title: '我的信息',
                        data: {
                            list: {
                                identityInfo: { title: '身份信息',mode: 'show',isEditMod: false,data: {}},
                                publicInfo: { title: '可公布信息',mode: 'show',isEditMod: false,data: {}},
                                privateInfo: { title: '隐私信息',mode: 'show',isEditMod: false,data: {}},
                                releaseInfo: { title: '我的发布',mode: 'show',isEditMod: false,data: {}}
                            },
                            activeIndex: 0,
                            selectedId: 'identityInfo',
                            sliderOffset: 0,
                            sliderLeft: 0
                        }
                    }
                },
                selectedId: 'myPush',
                scroll: true,
                height: 45
            },
            loginInfo: {},
            seekerInfo: {},
            userInfo: {},
            wxUserInfo: {},
            transSceneInfo: {},
            title: '',
            toView: 'red' ,
            scrollTop: 100
        },
        registerPage: {
            curPageId: 'identityInfo',
            curInfo: {},
            list: {
                identityInfo: {mode:'register', title:'身份识别信息', data:{}},
                publicInfo: {mode:'register', title:'可公布信息', data:{}},
                privateInfo: {mode:'register', title:'隐私信息', data:{}}
            }
        },
        registered: false,
        nonRegInfo: {verifyCode:'y'},
        wxUserInfo: {},
        dataTpl: {
            identityInfo: {
                name: {title: '姓名', placeHolder: '请输入您的姓名', value: ''},
                gender: {title: '性别', placeHolder: '请输入您的性别', value: ''},
                identity_num: {title: '身份证号', placeHolder: '请输入您的身份证号', value: ''},
                wechat: {title: '微信号', placeHolder: '请输入您的微信号', value: ''},
                phone_num: {title: '手机号', placeHolder: '请输入您的手机号', value: ''},
                verifyCode: {title: '验证码', placeHolder: '请输入您的验证码', value: ''}
            },
            publicInfo: {
                age: {title: '年龄', placeHolder: '请输入您的年龄', value: ''},
                height: {title: '身高', placeHolder: '请输入您的身高', value: ''},
                education: {title: '学历', placeHolder: '请输入您的学历', value: ''},
                constellation: {title: '星座', placeHolder: '请输入您的星座', value: ''},
                blood_type: {title: '血型', placeHolder: '请输入您的血型', value: ''}
            },
            privateInfo: {
                life_photo: {title:'生活照', placeHolder:'请上传您的生活照', value:[]}
            },
            releaseInfo: {
                self_introduction: {title:'自我介绍', type:'textarea', placeHolder:'请输入您的自我介绍', value:''},
                requirement: {title:'我的要求', type:'textarea', placeHolder:'请输入您的要求', value:''},
                reward: {title:'悬赏金额', placeHolder:'请输入您的悬赏金额', value:'', valueType:'人民币'}
            }
        }
    },

    onLoad: function (opt) {
        // 显示分享按钮
        wx.showShareMenu({
            withShareTicket: true
        })
        // 设置页面主题
        wx.setNavigationBarTitle({
          title: '我要找对象'
        })
        var that = this;
        // 获取转发邀请的用户信息
        try {
            var roleUserInfo = wx.getStorageSync('roleUserInfo')
            var wxUserInfo = wx.getStorageSync('wxUserInfo')
            var transSceneInfo = wx.getStorageSync('transSceneInfo')
            wxUserInfo = wxUserInfo.data.data
            if(roleUserInfo && roleUserInfo.registered){
                that.setHomePage(roleUserInfo.data)
                that.setData({
                    'homePage.wxUserInfo': wxUserInfo,
                    'homePage.transSceneInfo': transSceneInfo,
                    'registered': true
                })
                if(transSceneInfo.scene == 1044) 
                    that.addFriendQeq()
            } else {
                that.setRegisterPage()
            }
            that.setData({
                'wxUserInfo': wxUserInfo
            })
        } catch(e) {
            that.setRegisterPage()
            util.showModel('get user info failed!',JSON.stringify(e))
        }
        this.getReceivedPush()
        that.setData({
            title: opt.title
        })
        //wx.getSystemInfo({
        //    success: function(res) {
        //        that.setData({
        //            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
        //            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        //        });
        //    }
        //});
    },
    setRegisterPage: function() {
        var registerTitle = 'registerPage.list.'
        var registerPageList = this.data.registerPage.list
        var keyArry = Object.keys(registerPageList)
        for(var i=0;i<keyArry.length;i++) {
            var field = keyArry[i]
            var setKey = registerTitle + field
            this.setData({
                [setKey + '.data']: this.data.dataTpl[field]
            })
        }
        // 设置注册页面的当前页面
        var curRegPageId = this.data.registerPage.curPageId
        this.setData({
            'registerPage.curInfo': this.data.registerPage.list[curRegPageId]
        })
    },
    setHomePage: function(opt) {
        opt.life_photo = []
        var homePageTitle = 'homePage.tabContent.list.myInfo.data.list.'
        var homePageList = this.data.homePage.tabContent.list.myInfo.data.list
        var keyArry = Object.keys(homePageList)
        for(var i=0;i<keyArry.length;i++) {
            var field = keyArry[i]
            var setKey = homePageTitle + field
            this.setData({
                [setKey + '.data']: this.data.dataTpl[field]
            })
            var listData = homePageList[field].data
            var listTitle = 'homePage.tabContent.list.myInfo.data.list.' + field + '.data.'
            var listKeyArry = Object.keys(listData)
            for(var j=0;j<listKeyArry.length;j++) {
                var listField = listKeyArry[j]
                var listSetKey = listTitle + listField
                this.setData({
                    [listSetKey + '.value']: opt[listField]
                })
            }
        }
    },


    //--------------- both Page functions -----------------//
    getInputVal: function(opt) {
        var curInfoType = opt.currentTarget.dataset.infotype
        var mode = opt.currentTarget.dataset.mode
        var curDataId = opt.currentTarget.dataset.id
        var curKey = ''
        if(mode == 'register') curKey = 'registerPage.list.' + curInfoType + '.data.' + curDataId
        else curKey = 'homePage.tabContent.list.myInfo.data.list.' + curInfoType + '.data.' + curDataId
        // get new value and set to corresponding info(not curInfo)
        this.setData({
            [curKey + '.value']: opt.detail.value
        })
    },
    // set private info about photos
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var filesUrl = []
                if(that.data.registered) {
                    filesUrl = that.data.homePage.tabContent.list.myInfo.data.list.privateInfo.data.life_photo.value.concat(res.tempFilePaths)
                    that.setData({
                        'homePage.tabContent.list.myInfo.data.list.privateInfo.data.life_photo.value': filesUrl
                    });
                } else {
                    filesUrl = that.data.registerPage.list.privateInfo.data.life_photo.value.concat(res.tempFilePaths)
                    that.setData({
                        'registerPage.list.privateInfo.data.life_photo.value': filesUrl,
                        'registerPage.curInfo.data.life_photo.value': filesUrl
                    });
                }
                // 上传图片
                wx.uploadFile({
                    url: config.service.uploadUrl,
                    //filePath: filePath,
                    header:{
                        //"content-Type":"application/x-www-form-urlencoded"
                        //"content-Type":"application/json"
                        "content-Type":"multipart/form-data, boundary=AaB03x"
                    },
                    filePath: filesUrl[0],
                    name: 'file',
                    success: function(res){
                        util.showSuccess('上传图片成功')
                        console.log(res)
                        res = JSON.parse(res.data)
                        console.log(res)
                        //that.setData({
                        //    imgUrl: res.data.imgUrl
                        //})
                    },
                    fail: function(e) {
                        util.showModel('上传图片失败',e)
                    }
                })
            }
        })
    },
    // upload picture
    savePrivateInfo: function () {
        var that = this
        util.showBusy('正在上传')
        //var filePath = res.tempFilePaths[0]
        var filePath = []
        if(that.data.registered) {
            filePath = that.data.homePage.tabContent.list.myInfo.data.list.privateInfo.data.life_photo.value[0]
        } else {
            filePath = that.data.registerPage.list.privateInfo.life_photo.value
        }
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
                //that.setData({
                //    imgUrl: res.data.imgUrl
                //})
            },
            fail: function(e) {
                util.showModel('上传图片失败')
            }
        })
    },


    //--------------- Home Page functions -----------------//
    // 获取当前红娘收到的推送
    getReceivedPush() {
        var that = this
        wx.request({
            url: config.service.getSReceivedPushUrl,
            data: {
                seeker_openid: that.data.wxUserInfo.openId
            },
            success: function(res) {
                that.setData({
                    'homePage.tabContent.list.myPush.data.list.receivedPush.data.list': res.data.data.result
                })
            }
        })
    },
    // 跳转到推送信息具体页面
    goRecvdPushDetail(opt) {
        var index = opt.currentTarget.dataset.index
        var data = opt.currentTarget.dataset.item
        wx.navigateTo({
            url: './seekerDetail?type=recvdPushInfo&index='+index+'&data='+JSON.stringify(data)
        })
    },
    handleZanTabChange(e) {
      var componentId = e.componentId;
      var selectedId = e.selectedId;
    
      this.setData({
        [`${componentId}.selectedId`]: selectedId
      });
    },
    // functions related about myinfo navigate page
    tabClick: function (opt) {
        var type = opt.currentTarget.dataset.type
        var title = 'homePage.tabContent.list.'+type+'.data'
        var selectedId = opt.currentTarget.dataset.infotype
        this.setData({
            [title + '.sliderOffset']: opt.currentTarget.offsetLeft,
            [title + '.activeIndex']: opt.currentTarget.id,
            [title + '.selectedId']: selectedId
        });
    },
    editMyInfoBtn: function(opt) {
        var curDataStr = 'homePage.tabContent.list.myInfo.data.list.' + opt.currentTarget.dataset.infotype
        this.setData({
            [curDataStr + '.mode']: 'edit'
        })
    },
    cancelMyInfoBtn: function(opt) {
        var curDataStr = 'homePage.tabContent.list.myInfo.data.list.' + opt.currentTarget.dataset.infotype
        this.setData({
            [curDataStr + '.mode']: 'show'
        })
    },
    saveMyInfoBtn: function(opt) {
        var curInfoData = this.data.homePage.tabContent.list.myInfo.data.list[opt.currentTarget.dataset.infotype].data
        var updateData = {
            data: {}
        }
        for(var e in curInfoData) {
            if(e != 'verifyCode')
                updateData['data'][e] = curInfoData[e].value
        }
        updateData['open_id'] = this.data.wxUserInfo.openId
        updateData['role'] = 'seeker'
        wx.request({
            url: config.service.updateUserInfoUrl,
            data: updateData,
            success: function(res) {
                util.showSuccess('update info successfully!')
                //util.showSuccess(JSON.stringify(res))
            }
        })
    },
    releaseInfoBtn: function(opt) {
        var openId = this.data.wxUserInfo.openId
        wx.request({
            url: config.service.updateUserInfoUrl,
            data: {
                data:{ is_public: 1 },
                open_id: openId,
                role: 'seeker'
            },
            success: function(res) {
                util.showSuccess('update info successfully!')
                //util.showSuccess(JSON.stringify(res))
            }
        })
    },
    addFriendQeq: function() {
        var that = this
        wx.showModal({
            title: '代理人请提醒',
            content: '您的好友想成为您的代理人，是否同意？',
            confirmText: "同意",
            cancelText: "拒绝",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    var seekerId= that.data.homePage.wxUserInfo.openId
                    var delegatorId = that.data.homePage.transSceneInfo.query.openId
                    // 将转发者作为当前seeker的delegator在关系表中进行注册
                    var relationData = {
                        delegator_openId: delegatorId,
                        seeker_openId: seekerId,
                        delegationship_id: delegatorId+seekerId
                    }
                    wx.request({
                        url: config.service.registerUrl,
                        data: {
                            data: relationData,
                            role: 'delegationShip'
                        },
                        success: function(res) {
                            util.showSuccess('添加好友成功!')
                        }
                    })
                }else{
                }
            }
        });
    },


    //---------------Register Page functions -----------------//
    goNextStep: function(opt) {
        var nextPageId = opt.currentTarget.dataset.nextpageid
        this.setData({
            'registerPage.curPageId': nextPageId,
            'registerPage.curInfo': this.data.registerPage.list[nextPageId]
        })
    },
    goPreStep: function(opt) {
        var prePageId = opt.currentTarget.dataset.prepageid
        this.setData({
            'registerPage.curPageId': prePageId,
            'registerPage.curInfo': this.data.registerPage.list[prePageId]
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.registerPage.list.privateInfo.data.life_photo.value // 需要预览的图片http链接列表
        })
    },
    generateRegisterInfo: function(opt) {
        var curUserInfo = this.data.wxUserInfo
        var userInfo = {}
        var seekerInfo = {}
        // get seeker info
        var objKeys = Object.keys(opt.list)
        for(var i=0;i<objKeys.length;i++) {
            var info = opt.list[objKeys[i]].data
            var fieldKeys = Object.keys(info)
            for(var j=0;j<fieldKeys.length;j++) {
                var fieldKey = fieldKeys[j]
                var fieldObj = info[fieldKey]
                if(this.data.nonRegInfo[fieldKey] == undefined)
                    seekerInfo[fieldKey] = fieldObj.value
            }
        }
        seekerInfo['open_id'] = curUserInfo.openId
        return { data: seekerInfo,role: 'seeker' }
    },
    submitRegister: function(opt) {
        var that = this
        var data = that.generateRegisterInfo(that.data.registerPage)
        wx.request({
            url: config.service.registerUrl,
            data: data,
            success: function(res) {
                var registerData = that.data.registerPage.list
                that.setData({
                    'homePage.tabContent.list.myInfo.data.list.identityInfo.data': registerData.identityInfo.data,
                    'homePage.tabContent.list.myInfo.data.list.publicInfo.data': registerData.publicInfo.data,
                    'homePage.tabContent.list.myInfo.data.list.privateInfo.data': registerData.privateInfo.data,
                    registered: true
                })
            }
        })
    }
}));
