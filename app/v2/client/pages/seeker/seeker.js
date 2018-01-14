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
        userWXInfo: {},
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
        // set page info
        wx.setNavigationBarTitle({
          title: '我要找对象'
        })
        var that = this;
        // set register page info
        var curRegPageId = this.data.registerPage.curPageId
        that.setData({
            'registerPage.curInfo': this.data.registerPage.list[curRegPageId]
        })
        // get user info if registered
        try {
            // get wechat login info from local cache
            var loginInfo = wx.getStorageSync('loginInfo')
            if(loginInfo){
                var userInfo = loginInfo.data.data
                that.setData({
                    'homePage.userWXInfo': userInfo,
                    'userWXInfo': userInfo
                })
                // check if this seeker is registered
                wx.request({
                    url: config.service.getUserInfoUrl,
                    data: {
                        open_id: userInfo.openId,
                        role: 'seeker'
                    },
                    success: function(res){
                        var result = res.data.data.result
                        // get seeker info successfull
                        if(result.status == 200) {
                            that.setHomePage(result.data[0])
                            that.setData({
                                //'homePage.loginInfo': loginInfo,
                                //'homePage.seekerInfo': res.seekerInfo[0],
                                registered: true
                            })
                        } else {
                            that.setRegisterPage()
                        }
                    }
                })
            } else {
                util.showModel('get wechat login info failed!')
            }
        } catch(e) {
            util.showModel(JSON.stringify(e))
        }
        that.setData({
            title: opt.title
        })
        // show share menu
        wx.showShareMenu({
            withShareTicket: true
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
    },
    setHomePage: function(opt) {
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
        //var myInfoData = this.data.homePage.tabContent.list.myInfo
        //var identityInfo = myInfoData.data.list.identityInfo
        //var publicInfo = myInfoData.data.list.publicInfo
        //var privateInfo = myInfoData.data.list.privateInfo
        //// set identity info
        //identityInfo.data = {
        //    name: {title: '姓名', placeHolder: '请输入您的姓名', value: opt.name},
        //    gender: {title: '性别', placeHolder: '请输入您的性别', value: opt.gender},
        //    identity_num: {title: '身份证号', placeHolder: '请输入您的身份证号', value: opt.identity_num},
        //    wechat: {title: '微信号', placeHolder: '请输入您的微信号', value: opt.wechat},
        //    phone_num: {title: '手机号', placeHolder: '请输入您的手机号', value: opt.phone_num},
        //    verifyCode: {title: '验证码', placeHolder: '请输入您的验证码', value: ''}
        //}
        //// set public info
        //publicInfo.data = {
        //    age: {title: '年龄', placeHolder: '请输入您的年龄', value: opt.age},
        //    height: {title: '身高', placeHolder: '请输入您的身高', value: opt.height},
        //    education: {title: '学历', placeHolder: '请输入您的学历', value: opt.education},
        //    constellation: {title: '星座', placeHolder: '请输入您的星座', value: opt.constellation},
        //    blood_type: {title: '血型', placeHolder: '请输入您的血型', value: opt.blood_type}
        //}
        //this.setData({
        //    'homePage.tabContent.list.myInfo': myInfoData
        //})
    },


    //---------------both Page functions -----------------//
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


    //--------------- Home Page functions -----------------//
    handleZanTabChange(e) {
      var componentId = e.componentId;
      var selectedId = e.selectedId;
    
      this.setData({
        [`${componentId}.selectedId`]: selectedId
      });
    },
    // functions related about myinfo navigate page
    tabClick: function (opt) {
        var curData = 'homePage.tabContent.list.myInfo.data'
        var selectedId = opt.currentTarget.dataset.infotype
        this.setData({
            [curData + '.sliderOffset']: opt.currentTarget.offsetLeft,
            [curData + '.activeIndex']: opt.currentTarget.id,
            [curData + '.selectedId']: selectedId
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
        updateData['open_id'] = this.data.userWXInfo.openId
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
    // set private info about photos
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var filesUrl = that.data.registerPage.list.privateInfo.data.life_photo.value.concat(res.tempFilePaths)
                that.setData({
                    'registerPage.list.privateInfo.data.life_photo.value': filesUrl,
                    'registerPage.curInfo.data.life_photo.value': filesUrl
                });
            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.registerPage.list.privateInfo.data.life_photo.value // 需要预览的图片http链接列表
        })
    },
    getCurDatetime: function() {
        var date = new Date();//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    },
    generateRegisterInfo: function(opt) {
        var curUserInfo = this.data.userWXInfo
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
        // get user info
        var userInfo = {
            open_id: curUserInfo.openId,
            public_key: curUserInfo.openId + '12345',
            chain_addr: curUserInfo.openId + '98765',
            balance: 100,
            gender: curUserInfo.gender==1?'男':'女',
            register_time: this.getCurDatetime(),
            identity_hash: curUserInfo.openId + 'yaoz',
            status: 0,
            role: 0
        }
        return {
            userInfo: {
                data: userInfo,
                role: 'user'
            },
            seekerInfo: {
                data: seekerInfo,
                role: 'seeker'
            }
        }
    },
    submitRegister: function(opt) {
        var that = this
        var data = that.generateRegisterInfo(that.data.registerPage)
        wx.request({
            url: config.service.registerUrl,
            data: data.userInfo,
            success: function(res) {
                that.setData({
                    registered: true
                })
            }
        })
        wx.request({
            url: config.service.registerUrl,
            data: data.seekerInfo,
            success: function(res) {
                var registerData = that.data.registerPage.list
                that.setData({
                    'homePage.tabContent.list.myInfo.data.list.identityInfo.data': registerData.identityInfo.data,
                    'homePage.tabContent.list.myInfo.data.list.publicInfo.data': registerData.publicInfo.data,
                    'homePage.tabContent.list.myInfo.data.list.privateInfo.data': registerData.privateInfo.data
                })
            }
        })
    }
}));






