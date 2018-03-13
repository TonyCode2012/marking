var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js')
var config = require('../../config')
const { Tab, extend } = require('../../3rd_party/zanui-style/index');

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
                                    title: '收到的推送',
                                    data: {
                                        list: []
                                    }
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
                    messageList: {
                        id: 'messageList',
                        title: '信息发布榜',
                        data: {
                            list: []
                        }
                    },
                    myTask:{
                        id: 'myTask',
                        title: '我的任务',
                        data: {
                            list: []
                        }
                    },
                    myInfo: {
                        id: 'myInfo',
                        title: '我的信息',
                        data: {
                            list: {
                                identityInfo: { title: '身份信息',mode: 'show',isEditMod: false,data: {}}
                            },
                            //activeIndex: 0,
                            selectedId: 'identityInfo',
                            sliderOffset: 0,
                            sliderLeft: 0
                        }
                    }
                },
                selectedId: 'myPush',
                scroll: false,
                height: 45
            },
            delegatorInfo: {},
            title: '',
            toView: 'red' ,
            scrollTop: 100
        },
        registerPage: {
            curPageId: 'identityInfo',
            curInfo: {},
            list: {
                identityInfo: {title:'身份识别信息', mode:'register', data:{}}
            }
        },
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
        },
        registered: false,
        nonRegInfo: {verifyCode:'y'},
        wxUserInfo: {},
        userInfo: {}
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        var openId = this.data.wxUserInfo.open_id
        return {
          title: '转发给',
          path: '/pages/delegator/delegator?openId='+openId+'&role=seeker',
          success: function(res) {
            // 转发成功
            //util.showSuccess('转发成功')
          },
          fail: function(res) {
            // 转发失败
            util.showSuccess('转发失败')
          }
        }
    },

    onShow: function(opt) {
        //var that = this
        //this.getMessageList()   // 获取信息发布榜信息
    },
    onLoad: function (opt) {
        var that = this;
        // show share menu
        wx.showShareMenu({
            withShareTicket: true
        })
        // set page info
        wx.setNavigationBarTitle({
          title: '我是红娘'
        })

        // 获取SeekerInfo
        try {
            var userInfo = wx.getStorageSync('roleUserInfo')
            var wxUserInfo = wx.getStorageSync('wxUserInfo')
            // 设置userinfo
            that.setData({
                wxUserInfo: wxUserInfo,
                userInfo: userInfo
            })
            var openId = userInfo.open_id
            if(opt.openId) openId = opt.openId
            wx.request({
                url: config.service.getDelegatorInfoUrl,
                data: {open_id: openId},
                success: function(res) {
                    var result = res.data.data.result
                    if(result.status == 200) {
                        var delegatorInfo = result.data[0]
                        //delegatorInfo['wx_portraitAddr'] = wxUserInfo.avatarUrl
                        delegatorInfo['nickName'] = wxUserInfo.nickName
                        that.setData({
                            'homePage.delegatorInfo': delegatorInfo,
                            registered: true
                        })
                        that.setHomePage(delegatorInfo) //设置首页数据
                        that.getPush(openId)    // 获取当前红娘收到的推送
                        that.getTask(openId)    // 获取红娘任务
                        that.getMessageList()   // 获取信息发布榜信息
                    } else {
                        that.setRegisterPage()
                    }
                },
                fail: function(res) {
                    util.showModel('Get Seeker('+openId+') info failed!',JSON.stringify(res.data.data.result))
                }
            })
        } catch(e) {
            util.showModel('Get user info failed!',JSON.stringify(e))
        }

        // 演示数据 start {
        //var openId = opt.openId
        //var userInfo = this.getDemoRoleInfo(openId)
        //var wxUserInfo = this.getDemoWxInfo(openId)
        //that.setData({
        //    registered: true
        //})
        // } end


        // 获取转发邀请的用户信息
        /*try {
            var userInfo = wx.getStorageSync('userInfo')
            var wxUserInfo = wx.getStorageSync('wxUserInfo')
            wxUserInfo = wxUserInfo.data.data
            if(userInfo && userInfo.registered){
                that.setHomePage(userInfo.data)
                that.setData({
                    'homePage.wxUserInfo': wxUserInfo,
                    'registered': true
                })
            } else {
                that.setRegisterPage()
            }
            that.setData({
                'wxUserInfo': wxUserInfo
            })
        } catch(e) {
            that.setRegisterPage()
            util.showModel('get role user info failed!',JSON.stringify(e))
        }*/
        // 初始化信息
        //that.getReceivedPush(openId)  // 获取当前红娘收到的推送
        //that.setData({
        //    title: opt.title
        //})
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
        // set register page info
        var curRegPageId = this.data.registerPage.curPageId
        this.setData({
            'registerPage.curInfo': this.data.registerPage.list[curRegPageId]
        })
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
    },



    //--------------- for demo  -----------------//
    getDemoRoleInfo(openId) {
        var that = this
        wx.request({
            url: config.service.getDelegatorInfoUrl,
            data: {
                open_id: openId
            },
            success: function(res) {
                var data = res.data.data.result.data[0]
                that.setHomePage(data)
                that.setData({
                    'homePage.userInfo': data
                })
            }
        })
    },
    getDemoWxInfo(openId) {
        var that = this
        wx.request({
            url: config.service.getUserInfoUrl,
            data: {
                open_id: openId
            },
            success: function(res) {
                that.setData({
                    'homePage.wxUserInfo': res.data.data.result.data[0]
                })
            }
        })
    },
    writeFile(content){   
        var fso, f, s ;   
        fso = new ActiveXObject("Scripting.FileSystemObject");      
        f = fso.OpenTextFile('../../../delegator',8,true);   
        f.WriteLine(content);     
        f.Close();   
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
    /*从数据库获取相关数据*/
    // 获取客户信息
    getTask(openId) {
        var that = this
        wx.request({
            url: config.service.getDTaskInfoUrl,
            data: {
                delegator_openid: openId,
            },
            success: function(res) {
                var data = res.data.data.result
                that.setData({
                    'homePage.tabContent.list.myTask.data.list': data
                })
            }
        })
    },
    // 获取信息发布榜信息
    getMessageList() {
        var that = this
        wx.request({
            url: config.service.getMessageListUrl,
            success: function(res) {
                var data = res.data.data.result
                that.setMsgDataType(data)
                that.setData({
                    'homePage.tabContent.list.messageList.data.list': data
                })
            }
        })
    },
    // 获取当前代理人收到的推送
    //getReceivedPush(open_id) {
    getPush(open_id) {
        var that = this
        wx.request({
            url: config.service.getDPushUrl,
            data: {
                delegator_openid: open_id
            },
            success: function(res) {
                var result = res.data.data.result
                that.setRecvdPushType(result)
                //var recvdPush = result.recvdPush
                //var sendedPush = result.sendedPush
                //that.setData({
                //    'homePage.tabContent.list.myPush.data.list.receivedPush.data.list': recvdPush,
                //    'homePage.tabContent.list.myPush.data.list.sendedPush.data.list': sendedPush
                //})
            }
        })
    },
    // 获取合同信息
    getContractByIdsList(idsList,callback) {
        wx.request({
            url: config.service.getContractByIdsListUrl,
            data: {
                idsList: idsList
            },
            success: function(res) {
                var contracts = res.data.data.result
                callback(contracts)
            }
        })
    },
    // 跳转到当前代理人代理的seeker页面
    goTaskDetail(opt) {
        var data = opt.currentTarget.dataset.item
        var index = opt.currentTarget.dataset.index
        var eData = {
            seeker_openid: data['open_id'],
            delegator_openid: this.data.wxUserInfo.open_id,
            index: index,
            type: 'seekerInfo',
            tArry: ["myTask"]
        }
        wx.navigateTo({
            url: './seekerDetail?data='+JSON.stringify(eData),
            success: function(res) {
            }
        })
    },
    // 跳转到当前选择信息页面
    goMessageDetail(opt) {
        var data = opt.currentTarget.dataset.item
        var index = opt.currentTarget.dataset.index
        var eData = {
            delegator_openid: this.data.wxUserInfo.open_id,
            MS_openid: data['open_id'],         // 发布信息的seeker id
            MD_openid: data['delegator_openid'],// 发布信息的seeker的红娘id
            isOwn: data['isOwn'],
            index: index,
            type: 'messageList',
            tArry: ["messageList"]
        }
        wx.navigateTo({
            url: './seekerDetail?data='+JSON.stringify(eData),
            success: function(res) {
            }
        })
    },
    // 跳转到当前推送匹配的具体页面
    goRecvdPushDetail(opt) {
        var data = opt.currentTarget.dataset.item
        var index = opt.currentTarget.dataset.index
        var eData = {
            index: index,
            pDelegator_openid: this.data.wxUserInfo.open_id,
            type: 'receivedPush'
        }
        wx.navigateTo({
            url: './pushDetail?data='+JSON.stringify(eData),
            success: function(res) {
            }
        })
    },
    // 跳转到发出推送匹配的具体页面
    goSendedPushDetail(opt) {
        var data = opt.currentTarget.dataset.item
        var index = opt.currentTarget.dataset.index
        var eData = {
            index: index,
            pDelegator_openid: this.data.wxUserInfo.open_id,
            type: 'sendedPush',
        }
        wx.navigateTo({
            url: './pushDetail?data='+JSON.stringify(eData),
            success: function(res) {
            }
        })
    },
    setRecvdPushType(data) {
        var that = this
        var cur_openId = that.data.wxUserInfo.open_id
        var recvdPush = data.recvdPush
        var sendedPush = data.sendedPush
        var rRecvdPush= []
        var rSendedPush = []
        var recvdIdsList = []
        var sendedIdsList = []
        for(var i=0;i<recvdPush.length;i++) {
            var matchInfo = recvdPush[i]
            if(recvdPush[i].status == 5) {
                recvdIdsList.push({
                    ids: {
                        pDelegator_openid: cur_openId,
                        pSeeker_openid: matchInfo.toSeekerInfo.open_id,
                        tDelegator_openid: matchInfo.receivedDInfo.open_id,
                        tSeeker_openid: matchInfo.receivedSInfo.open_id,
                    },
                    index: i
                })
            }
            rRecvdPush.push({
                matchInfo: matchInfo
            })
        }
        for(var i=0;i<sendedPush.length;i++) {
            var matchInfo = sendedPush[i]
            if(sendedPush[i].status == 5) {
                sendedIdsList.push({
                    ids: {
                        pDelegator_openid: matchInfo.sendedDInfo.open_id,
                        pSeeker_openid: matchInfo.sendedSInfo.open_id,
                        tDelegator_openid: cur_openId,
                        tSeeker_openid: matchInfo.fromSeekerInfo.open_id,
                    },
                    index: i
                })
            }
            rSendedPush.push({
                matchInfo: matchInfo
            })
        }
        if(recvdIdsList.length != 0) {
            this.getContractByIdsList(recvdIdsList,(result) => {
                for(var i=0;i<result.length;i++) {
                    var item = result[i]
                    var index = item.index
                    rRecvdPush[index]['contractInfo'] = item
                }
                this.setData({
                    'homePage.tabContent.list.myPush.data.list.receivedPush.data.list': rRecvdPush
                })
            })
        } else {
            this.setData({
                'homePage.tabContent.list.myPush.data.list.receivedPush.data.list': rRecvdPush
            })
        }
        if(sendedIdsList.length != 0) {
            this.getContractByIdsList(sendedIdsList,(result) => {
                for(var i=0;i<result.length;i++) {
                    var item = result[i]
                    var index = item.index
                    rSendedPush[index]['contractInfo'] = item
                }
                this.setData({
                    'homePage.tabContent.list.myPush.data.list.sendedPush.data.list': rSendedPush
                })
            })
        } else {
            this.setData({
                'homePage.tabContent.list.myPush.data.list.sendedPush.data.list': rSendedPush
            })
        }
    },
    setMsgDataType(data) {
        var curOpenId = this.data.wxUserInfo.open_id
        for(var i=0;i<data.length;i++) {
            if(data[i].delegator_openid != curOpenId) {
                data[i]['bgc'] = '#96CE54'
                data[i]['isOwn'] = false
            } else {
                data[i]['isOwn'] = true
            }
        }
    },
    /*有关页面的操作*/
    handleZanTabChange(e) {
      var componentId = e.componentId;
      var selectedId = e.selectedId;
    
      this.setData({
        [`${componentId}.selectedId`]: selectedId
      });
    },
    // functions related about myinfo navigate page
    tabClick: function (opt) {
        var selectedId = opt.currentTarget.dataset.infotype
        var tabName = opt.currentTarget.dataset.tabname
        var curData = 'homePage.tabContent.list.' + tabName + '.data'
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
        //updateData['open_id'] = this.data.wxUserInfo.open_id
        updateData['open_id'] = this.data.userInfo.open_id
        updateData['role'] = 'delegator'
        wx.request({
            url: config.service.updateUserInfoUrl,
            data: updateData,
            success: function(res) {
                util.showSuccess('update info successfully!')
            }
        })
    },


    //--------------- Register Page functions -----------------//
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
        //var curUserInfo = this.data.wxUserInfo
        var wxUserInfo = this.data.wxUserInfo
        var curUserInfo = this.data.userInfo
        var delegatorInfo = {}
        // get delegator info
        var objKeys = Object.keys(opt.list)
        for(var i=0;i<objKeys.length;i++) {
            var info = opt.list[objKeys[i]].data
            var fieldKeys = Object.keys(info)
            for(var j=0;j<fieldKeys.length;j++) {
                var fieldKey = fieldKeys[j]
                var fieldObj = info[fieldKey]
                if(this.data.nonRegInfo[fieldKey] == undefined)
                    delegatorInfo[fieldKey] = fieldObj.value
            }
        }
        delegatorInfo['open_id'] = curUserInfo.open_id
        delegatorInfo['wx_portraitAddr'] = wxUserInfo.avatarUrl
        return delegatorInfo
    },
    submitRegister: function(opt) {
        var that = this
        var data = that.generateRegisterInfo(that.data.registerPage)
        wx.request({
            url: config.service.registerDelegatorUrl,
            data: data,
            success: function(res) {
                var registerData = that.data.registerPage.list
                that.setData({
                    'homePage.tabContent.list.myInfo.data.list.identityInfo.data': registerData.identityInfo.data,
                    'homePage.delegatorInfo': data,
                    registered: true
                })
                //that.writeFile(data.open_id)
            }
        })
    }
}));
