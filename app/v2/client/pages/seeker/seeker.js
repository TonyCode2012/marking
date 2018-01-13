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
                            id2Index: {},
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
                                identityInfo: {
                                    id: 'identityInfo',
                                    title: '身份信息',
                                    isEditMod: false,
                                    data: {}
                                },
                                publicInfo: {
                                    id: 'publicInfo',
                                    title: '可公布信息',
                                    isEditMod: false,
                                    data: {}
                                },
                                privateInfo: {
                                    id: 'privateInfo',
                                    title: '隐私信息',
                                    isEditMod: false,
                                    data: {}
                                },
                                releaseInfo: {
                                    id: 'releaseInfo',
                                    title: '我的发布',
                                    isEditMod: false,
                                    data: {}
                                }
                            },
                            id2Index: {},
                            activeIndex: 0,
                            selectedId: 'identityInfo',
                            sliderOffset: 0,
                            sliderLeft: 0
                        }
                    }
                },
                selectedId: 'myPush',
                scroll: true,
                id2Index: {},
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
            identityInfo: {
                data: {
                    name: {id: 'name',title: '姓名', placeHolder: '请输入您的姓名', value: ''},
                    gender: {id: 'gender',title: '性别', placeHolder: '请输入您的性别', value: ''},
                    identityNum: {id: 'identityNum',title: '身份证号', placeHolder: '请输入您的身份证号', value: ''},
                    wechat: {id: 'wechat',title: '微信号', placeHolder: '请输入您的微信号', value: ''},
                    phoneNum: {id: 'phoneNum',title: '手机号', placeHolder: '请输入您的手机号', value: ''},
                    verifyCode: {id: 'verifyCode',title: '验证码', placeHolder: '请输入您的验证码', value: ''}
                },
                title: '身份识别信息'
            },
            publicInfo: {
                data: {
                    age: {id: 'age',title: '年龄', placeHolder: '请输入您的年龄', value: ''},
                    height: {id: 'height',title: '身高', placeHolder: '请输入您的身高', value: ''},
                    education: {id: 'education',title: '学历', placeHolder: '请输入您的学历', value: ''},
                    constellation: {id: 'constellation',title: '星座', placeHolder: '请输入您的星座', value: ''},
                    bloodType: {id: 'bloodType',title: '血型', placeHolder: '请输入您的血型', value: ''}
                },
                title: '可公布信息'
            },
            privateInfo: {
                data: {
                    files: []
                },
                title: '隐私信息'
            }
        },
        registered: false,
        userInfo: {}
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
            'registerPage.curInfo': this.data.registerPage[curRegPageId]
        })
        // get user info if registered
        try {
            // get login info from local cache
            var loginInfo = wx.getStorageSync('loginInfo')
            if(loginInfo){
                var userInfo = loginInfo.data.data
                that.setData({
                    'homePage.userInfo': userInfo
                })
                // check if this user is registered
                wx.request({
                    url: config.service.getSeekerInfoUrl,
                    data: {
                        open_id: userInfo.openId
                    },
                    success: function(res){
                        var result = res.data.data.result
                        if(result.status == 200) {
                            that.setMyInfoData(result.seekerInfo[0])
                            that.setData({
                                //'homePage.loginInfo': loginInfo,
                                //'homePage.seekerInfo': res.seekerInfo[0],
                                registered: true
                            })
                        }
                    }
                })
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
        //wx.getUserInfo({
        //  success: function(res) {
        //    that.setData({
        //        userInfo: res.userInfo
        //    })
        //  }
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
    setMyInfoData: function(opt) {
        var myInfoData = this.data.homePage.tabContent.list.myInfo
        var identityInfo = myInfoData.data.list.identityInfo
        var publicInfo = myInfoData.data.list.publicInfo
        var privateInfo = myInfoData.data.list.privateInfo
        // set identity info
        identityInfo.data = {
            name: {title: '姓名', placeHolder: '请输入您的姓名', value: opt.name},
            gender: {title: '性别', placeHolder: '请输入您的性别', value: opt.gender},
            identityNum: {title: '身份证号', placeHolder: '请输入您的身份证号', value: opt.identity_num},
            wechat: {title: '微信号', placeHolder: '请输入您的微信号', value: opt.wechat},
            phoneNum: {title: '手机号', placeHolder: '请输入您的手机号', value: opt.phone_num},
            verifyCode: {title: '验证码', placeHolder: '请输入您的验证码', value: ''}
        }
        // set public info
        publicInfo.data = {
            age: {title: '年龄', placeHolder: '请输入您的年龄', value: opt.age},
            height: {title: '身高', placeHolder: '请输入您的身高', value: opt.height},
            education: {title: '学历', placeHolder: '请输入您的学历', value: opt.education},
            constellation: {title: '星座', placeHolder: '请输入您的星座', value: opt.constellation},
            bloodType: {title: '血型', placeHolder: '请输入您的血型', value: opt.blood_type}
        }
        this.setData({
            'homePage.tabContent.list.myInfo': myInfoData
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
    tabClick: function (opt) {
        var curData = 'homePage.tabContent.list.myInfo.data'
        var selectedId = opt.currentTarget.dataset.infotype
        this.setData({
            [curData + '.sliderOffset']: opt.currentTarget.offsetLeft,
            [curData + '.activeIndex']: opt.currentTarget.id,
            [curData + '.selectedId']: selectedId
        });
    },
    //findIndex: function(tabContent) {
    //    var curId = tabContent.selectedId
    //    var i = 0;
    //    if(tabContent.id2Index[curId] != undefined) {
    //        i = tabContent.id2Index[curId];
    //    } else {
    //        for(;i<tabContent.list.length;i++){
    //            if(tabContent.list[i].id == tabContent.selectedId){
    //                break;
    //            }
    //        }
    //        tabContent.id2Index[curId] = i
    //    }
    //    return i;
    //},
    //editMyInfoBtn: function(opt) {
    //    var i = this.findIndex(this.data.tabContent);
    //    var j = this.findIndex(this.data.tabContent.list[i].data)
    //    //var curData = "tabContent.list[" + i + "].data.list[" + j + "]." + opt.currentTarget.dataset.infotype;
    //    var curData = "tabContent.list[" + i + "].data.list[" + j + "].data";
    //    this.setData({
    //        [curData + '.edit_vis']: true
    //    })
    //},
    changeInfoTblStatus: function(opt) {
    },


    //---------------Register Page functions -----------------//
    getInputVal: function(opt) {
        var curInfoType = opt.currentTarget.dataset.infotype
        var curDataId = opt.currentTarget.dataset.id
        var curInfoData = this.data.registerPage[curInfoType].data
        var curKey = 'registerPage.' + curInfoType + '.data.' + curDataId
        //var curBufInfo = 'registerPage.curInfo.data.' + curDataId
        // get new value and set to corresponding info(not curInfo)
        this.setData({
            [curKey + '.value']: opt.detail.value
            //[curBufInfo + '.value']: opt.detail.value
        })
    },
    goNextStep: function(opt) {
        var nextPageId = opt.currentTarget.dataset.nextpageid
        this.setData({
            'registerPage.curPageId': nextPageId,
            'registerPage.curInfo': this.data.registerPage[nextPageId]
        })
    },
    goPreStep: function(opt) {
        var prePageId = opt.currentTarget.dataset.prepageid
        this.setData({
            'registerPage.curPageId': prePageId,
            'registerPage.curInfo': this.data.registerPage[prePageId]
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
                var filesUrl = that.data.registerPage.privateInfo.data.files.concat(res.tempFilePaths)
                that.setData({
                    'registerPage.privateInfo.data.files': filesUrl,
                    'registerPage.curInfo.data.files': filesUrl
                });
            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.registerPage.privateInfo.data.files // 需要预览的图片http链接列表
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
        var curUserInfo = this.data.userInfo
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
        var seekerInfo = {
            open_id: curUserInfo.openId,
            wechat: opt.identityInfo.data.wechat.value,
            phone_num: opt.identityInfo.data.phoneNum.value,
            life_photo: '',
            age: opt.publicInfo.data.age.value,
            height: opt.publicInfo.data.height.value,
            requirement: 'heheda',
            portrait: '',
            self_introduction: 'yaoz is a good man',
            reward: 500,
            constellation: opt.publicInfo.data.constellation.value,
            blood_type: opt.publicInfo.data.bloodType.value,
            education: opt.publicInfo.data.education.value
        }
        return {userInfo:userInfo,seekerInfo:seekerInfo}
    },
    submitRegister: function(opt) {
        var that = this
        var data = that.generateRegisterInfo(that.data.registerPage)
        wx.request({
            url: config.service.registerSeekerUrl,
            data: that.generateRegisterInfo(that.data.registerPage),
            success: function(res) {
                that.setData({
                    registered: true
                })
            }
        })
    }
}));






