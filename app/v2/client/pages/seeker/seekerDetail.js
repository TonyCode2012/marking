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
            btn: {
                refuseBtn: {
                    disable: false,
                    hidden: true
                },
                stateBtn: {
                    btnStr: "发送匹配请求",
                    type: "primary",
                    disable: false,
                    hidden: true
                }
            },
            state: 0,
            portrait: "",
            pSOID: "",
            pDOID: "",
            tSOID: "",
            tDOID: "",
            role: ""
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
            dataIndex: 0,
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
            dataIndex: 0,
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
        opt = JSON.parse(opt.data)
        var index = opt.index
        var type = opt.type
        this.setData({
            type: type
        })
        this.prepareTpl(type)   // 设置页面模板
        // 获取上一个页面的数据引用
        var pages = getCurrentPages()
        var prePage = pages[pages.length-2]
        // 获取当前使用的数据
        var tn = opt.tArry
        var data = prePage.data.homePage.tabContent
        for(var i=0;i<tn.length;i++) {
            data = data.list[tn[i]].data
        }
        data = data.list[index]
        // 赋值当前页面数据
        var curPageData = data

        if(type == 'seekerInfo') {
            wx.setNavigationBarTitle({
              title: '我的任务'
            })
            this.setData({
                'seekerInfo.portrait': data.wx_portraitAddr,
                'seekerInfo.seekerOpenId': data.seeker_openId,
                'seekerInfo.delegatorOpenId': data.delegator_openId,
                'seekerInfo.released': data.is_release==0?false:true,
                'seekerInfo.dataIndex': index,
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
                'messageList.dataIndex': index,
            })
        } else if(type == 'recvdPushInfo') {
            wx.setNavigationBarTitle({
              title: '收到的推送'
            })
            var recvdSData = data.receivedSInfo
            var recvdDOpenid = data.receivedDInfo.open_id
            var myDOID = data.delegator_openid
            var mySOID = data.seeker_openid
            var curRole = data.role
            var state = data.state

            // 设置匹配按键状态
            this.setMatchStatus(state,curRole)

            // 设置四方id
            var pSOID = ''
            var pDOID = ''
            var tSOID = ''
            var tDOID = ''
            if(curRole == 'pSeeker') {
                pSOID = mySOID
                pDOID = myDOID
                tSOID = recvdSData.open_id
                tDOID = recvdDOpenid
            } else if(curRole == 'tSeeker') {
                pSOID = recvdSData.open_id
                pDOID = recvdDOpenid
                tSOID = mySOID
                tDOID = myDOID
            }
            this.setData({
                'recvdPushInfo.portrait': recvdSData.wx_portraitAddr,
                'recvdPushInfo.pSOID': pSOID,
                'recvdPushInfo.pDOID': pDOID,
                'recvdPushInfo.tSOID': tSOID,
                'recvdPushInfo.tDOID': tDOID,
                'recvdPushInfo.role': curRole,
                'recvdPushInfo.state': state,
                'recvdPushInfo.dataIndex': index,
            })
            // 给当前页面数据赋值
            curPageData = recvdSData
        } else {
            util.showModel('请给出正确的跳转参数!','error')
        }
        curPageData['type'] = type
        this.setPageData(curPageData)
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



    //--------------- RecvdPushInfo Page functions -----------------//
    // 设置匹配按键状态
    setMatchStatus(state,role) {
        var stateBtnStr = '发送匹配请求'
        var stateBtnType = 'primary'
        var stateBtnHidden = false
        var stateBtnDisable = false
        if(state == 0) {
            stateBtnStr = '发送匹配请求'
        } else if(state == 1) {
            if(role == 'pSeeker') {
                stateBtnStr = '请求已发送'
                stateBtnType = 'default'
                stateBtnDisable = true
            } else {
                stateBtnStr = '是否同意匹配'
            }
        } else if(state == 2) {
            if(role == 'pSeeker') {
                stateBtnStr = '是否同意匹配'
            } else {
                stateBtnStr = '请求已发送'
                stateBtnType = 'default'
                stateBtnDisable = true
            }
        } else if(state == 3) {
            stateBtnStr = '对方已拒绝'
            stateBtnType = 'default'
            stateBtnDisable = true
        }
        this.setData({
            'recvdPushInfo.btn.stateBtn.btnStr': stateBtnStr,
            'recvdPushInfo.btn.stateBtn.type': stateBtnType,
            'recvdPushInfo.btn.stateBtn.hidden': stateBtnHidden,
            'recvdPushInfo.btn.stateBtn.disable': stateBtnDisable,
        })
    },
    // 发送匹配请求
    sendMatchReq(opt) {
        var that = this
        var data = this.data.recvdPushInfo
        wx.request({
            url: config.service.sendMatchAcceptUrl,
            data: {
                queryData: {
                    pSeeker_openid: data.pSOID,
                    pDelegator_openid: data.pDOID,
                    tSeeker_openid: data.tSOID,
                    tDelegator_openid: data.tDOID,
                },
                role: data.role
            },
            success: function(res) {
                var role = data.role
                var state = (role == 'pSeeker' ? 1 : 2)
                that.setMatchStatus(state,role)
            }
        })
    },
})
