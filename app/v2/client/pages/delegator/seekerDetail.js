var util = require('../../utils/util.js')
var config = require('../../config')
const { Tab, extend } = require('../../3rd_party/zanui-style/index');

Page({
    data: {
        seekerInfo: {
            list: {
                basicInfo: {
                    title: "基本信息",
                    data: {}
                },
                reqInfo:{
                    title: "征婚信息",
                    data: {}
                }
            },
            type:'seekerInfo',
            pushBtn: {
                str: '推送',
                hidden: false,
                disable: false
            },
            portrait:"",
            seeker_openid:"",
            delegator_openid:"",
            prePageIndex: 0,
            released: false
        },
        messageList: {
            list: {
                basicInfo: {
                    title: "基本信息",
                    data: {}
                },
                reqInfo:{
                    title: "征婚信息",
                    data: {}
                }
            },
            type:'messageList',
            pushBtn: {
                str: '推送',
                hidden: false,
                disable: false
            },
            portrait:"",
            pushedSeekerInfo: {},
            seeker_openid:"",
            delegator_openid:"",
            MS_openid:"",           // 发布信息的seeker openid
            MD_openid:"",           // 发布信息的delegator openid
            prePageIndex: 0,
            released: false
        },
        dataTpl: {
            basicInfo: {
                name:{ title:"姓名", value:"" },
                //age:{ title:"年龄", value:"" },
                birthday:{ title:"生日", value:"" },
                gender:{ title:"性别", value:"" },
                height:{ title:"身高", value:"" },
                weight:{ title:"体重", value:"" },
                education:{ title:"文凭", value:"" },
                constellation:{ title:"星座", value:"" },
                blood_type:{ title:"血型", value:"" },
            },
            reqInfo: {
                requirement:{ title:"征婚要求", type:"textarea", value:"" },
                self_introduction:{ title:"自我介绍", type:"textarea", value:"" },
                reward:{ title:"报酬", show:true, value:"" },
                advance:{ title:"预付", show:true, value:"" }
            }
        },
        type: '',
        prePage: {},
        prePageIndex: 0
    },
    handleZanSelectChange({ componentId, value }) {
        this.setData({
            [`checked.${componentId}`]: value
        });
    },

    onLoad: function(opt) {
        opt = JSON.parse(opt.data)
        var index = opt.index
        var type = opt.type
        var isOwn = opt.isOwn
        this.setData({
            type: type
        })
        // 设置页面模板
        this.prepareTpl(type) 
        // 设置按键状态
        this.setBtnStatus(type,isOwn)
        // 获取当前使用的数据
        var pages = getCurrentPages()       // 获取上一个页面的数据引用
        var prePage = pages[pages.length-2]
        var tn = opt.tArry
        var data = prePage.data.homePage.tabContent
        for(var i=0;i<tn.length;i++) {
            data = data.list[tn[i]].data
        }
        data = data.list[index]
        // 赋值当前页面数据
        var curPageData = data
        // 设置公用全局变量
        this.setData({
            prePage: prePage,
            prePageIndex: index
        })

        if(type == 'seekerInfo') {
            wx.setNavigationBarTitle({
              title: '我的任务'
            })
            this.setData({
                'seekerInfo.portrait': data.wx_portraitAddr,
                'seekerInfo.seeker_openid': opt.seeker_openid,
                'seekerInfo.delegator_openid': opt.delegator_openid,
                'seekerInfo.released': data.is_release==0?false:true,
                'seekerInfo.prePageIndex': index,
            })
        } else if(type == 'messageList') {
            wx.setNavigationBarTitle({
              title: '信息发布榜'
            })
            this.setData({
                'messageList.portrait': data.wx_portraitAddr,
                'messageList.seeker_openid': opt.seeker_openid,
                'messageList.delegator_openid': opt.delegator_openid,
                'messageList.MS_openid': opt.MS_openid,
                'messageList.MD_openid': opt.MD_openid,
                'messageList.prePageIndex': index,
            })
        } else {
            util.showModel('请给出正确的跳转参数!','error')
        }
        data['type'] = type
        this.setPageData(data)
    },
    prepareTpl: function(type) {
        // type的值:seekerInfo或者messageList
        var dataList = this.data[type].list
        var keyArry = Object.keys(dataList)
        for(var i=0;i<keyArry.length;i++) {
            var key = keyArry[i]
            var title = type + '.list.' + key
            this.setData({
                [title + '.data']: this.data.dataTpl[key]
            })
        }
    },
    setPageData: function(data) {
        var type = data.type    // type的值:seekerInfo或者messageList
        var dataList = this.data[type].list
        var keyArry = Object.keys(dataList)
        for(var i=0;i<keyArry.length;i++) {
            var key = keyArry[i]
            var val = dataList[key].data
            var title = type + '.list.' + key + '.data.'
            var valKeyArry = Object.keys(val)
            for(var j=0;j<valKeyArry.length;j++){
                var valKey = valKeyArry[j]
                var valTitle = title + valKey
                this.setData({
                    [valTitle + '.value']: data[valKey]
                })
            }
        }
        // 如果是信息榜信息则将“报酬”和“预付”隐藏掉
        if(type=='messageList') {
            this.setData({
                'messageList.list.reqInfo.data.reward.show': false,
                'messageList.list.reqInfo.data.advance.show': false
            })
        }
    },
    setBtnStatus(type,isOwn) {
        if(type == 'messageList') {
            this.setData({
                'messageList.pushBtn.hidden': isOwn
            })
        }
    },
    //--------------- seekerInfo Page functions -----------------//
    // 发布与取消发布
    release: function(opt) {
        var that = this
        wx.request({
            url: config.service.pushSeekerUrl,
            data: {
                delegator_openid: that.data.seekerInfo.delegator_openid,
                seeker_openid: that.data.seekerInfo.seeker_openid
            },
            success: function(res) {
                var result = res.data.data.result
                if(result.status == 200) {
                    util.showSuccess('发布成功')
                    var index = that.data.prePageIndex
                    var type = that.data.type
                    that.data.prePage.setData({
                        ['homePage.tabContent.list.myTask.data.list['+index+'].is_release']: 1,
                        ['homePage.tabContent.list.messageList.data.list['+index+'].is_release']: 1
                    })
                    that.setData({
                        [type+'.released']: true
                    })
                }
            }
        })
    },
    cancelRelease: function(opt) {
        var that = this
        wx.request({
            url: config.service.cancelPushSeekerUrl,
            data: {
                delegator_openid: that.data.seekerInfo.delegator_openid,
                seeker_openid: that.data.seekerInfo.seeker_openid
            },
            success: function(res) {
                util.showSuccess('取消发布成功')
                var index = that.data.prePageIndex
                var type = that.data.type
                that.data.prePage.setData({
                    ['homePage.tabContent.list.myTask.data.list['+index+'].is_release']: 0,
                    ['homePage.tabContent.list.messageList.data.list['+index+'].is_release']: 0
                })
                that.setData({
                    [type+'.released']: false
                })
            }
        })
    },
    // 推送其他红娘的客户给自己客户
    go2SelectPage: function(opt) {
        var that = this
        var type = that.data.type
        var eData = {
            delegator_openid: that.data[type].delegator_openid,
            MS_openid: that.data[type].MS_openid,
            MD_openid: that.data[type].MD_openid,
        }
        wx.navigateTo({
            url: './send2Seeker?data='+JSON.stringify(eData),
            success: function(res) {
            }
        })
    }
})
