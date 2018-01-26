var util = require('../../utils/util.js')
var config = require('../../config')
const { Tab, extend } = require('../../zanui-style/index');

Page({
    data: {
        recvdPushInfo: {
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
            type:'recvdPushInfo',
            portrait:"",
            seekerOpenId:"",
            delegatorOpenId:"",
            prePage: {},
            prePageIndex: 0,
            released: false
        },
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
            portrait:"",
            seekerOpenId:"",
            delegatorOpenId:"",
            prePage: {},
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
            portrait:"",
            pushedSeekerInfo: {},
            seekerOpenId:"",
            delegatorOpenId:"",
            prePage: {},
            prePageIndex: 0,
            released: false
        },
        dataTpl: {
            basicInfo: {
                name:{ title:"姓名", value:"" },
                age:{ title:"年龄", value:"" },
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
        type: ''
    },
    handleZanSelectChange({ componentId, value }) {
        this.setData({
            [`checked.${componentId}`]: value
        });
    },

    onLoad: function(opt) {
        var data = JSON.parse(opt.data)
        var index = opt.index
        var type = opt.type
        this.setData({
            [type+'.pushedSeekerInfo']: data,
            type: type
        })
        this.prepareTpl(type)
        // 获取上一个页面的数据引用
        var pages = getCurrentPages()
        var prePage = pages[pages.length-2]

        if(type == 'seekerInfo') {
            wx.setNavigationBarTitle({
              title: '我的任务'
            })
            this.setData({
                'seekerInfo.portrait': data.wx_portraitAddr,
                'seekerInfo.seekerOpenId': data.seeker_openId,
                'seekerInfo.delegatorOpenId': data.delegator_openId,
                'seekerInfo.released': data.is_release==0?false:true,
                'seekerInfo.prePageIndex': index,
                'seekerInfo.prePage': prePage
            })
        } else if(type == 'messageList') {
            wx.setNavigationBarTitle({
              title: '信息发布榜'
            })
            this.setData({
                'messageList.portrait': data.wx_portraitAddr,
                'messageList.seekerOpenId': data.seeker_openId,
                'messageList.SDOpenId': data.SD_openId,
                'messageList.delegatorOpenId': data.delegator_openId,
                'messageList.prePageIndex': index,
                'messageList.prePage': prePage
            })
        } else if(type == 'recvdPushInfo') {
            wx.setNavigationBarTitle({
              title: '收到的推送'
            })
            data = data.receivedSInfo
            this.setData({
                'recvdPushInfo.portrait': data.wx_portraitAddr,
                'recvdPushInfo.seekerOpenId': data.seeker_openId,
                'recvdPushInfo.SDOpenId': data.SD_openId,
                'recvdPushInfo.delegatorOpenId': data.delegator_openId,
                'recvdPushInfo.prePageIndex': index,
                'recvdPushInfo.prePage': prePage
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
        if(type=='messageList' || type == 'recvdPushInfo') {
            this.setData({
                [type + '.list.reqInfo.data.reward.show']: false,
                [type + '.list.reqInfo.data.advance.show']: false
            })
        }
    },



    // 发送匹配请求
    sendMatchReq(opt) {
    },
    // 发布与取消发布
    release: function(opt) {
        var that = this
        wx.request({
            url: config.service.pushSeekerUrl,
            data: {
                id: '12345' +  that.data.seekerInfo.seekerOpenId
            },
            success: function(res) {
                util.showSuccess('发布成功')
                var index = that.data.seekerInfo.prePageIndex
                var type = that.data.type
                that.data[type].prePage.setData({
                    ['homePage.tabContent.list.myTask.data.list['+index+'].is_release']: 1
                })
                that.setData({
                    [type+'.released']: true
                })
            }
        })
    },
    cancelRelease: function(opt) {
        var that = this
        wx.request({
            url: config.service.cancelPushSeekerUrl,
            data: {
                id: '12345' +  that.data.seekerInfo.seekerOpenId
            },
            success: function(res) {
                util.showSuccess('取消发布成功')
                var index = that.data.seekerInfo.prePageIndex
                var type = that.data.type
                that.data[type].prePage.setData({
                    ['homePage.tabContent.list.myTask.data.list['+index+'].is_release']: 0
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
        wx.navigateTo({
            url: './send2Seeker?data='+JSON.stringify(that.data[type].pushedSeekerInfo),
            success: function(res) {
            }
        })
    }
})
