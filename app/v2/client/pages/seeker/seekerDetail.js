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
            btnStateStr: {
                request: "发送匹配请求",
                sended: "请求已发送",
                agree: "是否同意匹配",
                irefuse: "已拒绝",
                orefuse: "对方已拒绝",
            },
            type:'recvdPushInfo',
            state: 0,
            portrait: "",
            pSOID: "",
            pDOID: "",
            tSOID: "",
            tDOID: "",
            role: "",
            prePageTitle: "",
            prePageIndex: "",
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
        matchList: {
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
            btn: {
                refuseBtn: {
                    disable: false,
                    hidden: true
                },
                stateBtn: {
                    str: "接受恋爱",
                    type: "primary",
                    disable: false,
                    hidden: false
                }
            },
            btnStateStr: {
                request: "接受恋爱",
                sended: "已确认恋爱",
                agree: "是否确认恋爱",
                irefuse: "已拒绝",
                orefuse: "对方已拒绝",
                complete: "恋爱成功"
            },
            type:'matchList',
            state: 5,
            portrait: "",
            pSOID: "",
            pDOID: "",
            tSOID: "",
            tDOID: "",
            role: "",
            prePageTitle: "",
            prePageIndex: "",
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
        type: '',
        prePage: {},
        open_id: ''
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
        var title = opt.title
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
        var dataList = data.list
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
                'seekerInfo.prePageIndex': index,
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
            })
        } else if(type == 'matchList') {
            // 设置合同相关数据
            wx.setNavigationBarTitle({
              title: '匹配项目'
            })
            var matchInfo = data.matchInfo
            var contractInfo = data.contractInfo
            var recvdSData = matchInfo.receivedSInfo
            var curRole = matchInfo.role
            // 获取合同状态
            var state = contractInfo.status
            var ids = this.setFourIDs(matchInfo)
            // 设置恋爱按钮状态
            this.setMarryStatus(state,curRole)
            this.setData({
                'matchList.portrait': recvdSData.wx_portraitAddr,
                'matchList.pSOID': ids.pSOID,
                'matchList.pDOID': ids.pDOID,
                'matchList.tSOID': ids.tSOID,
                'matchList.tDOID': ids.tDOID,
                'matchList.role': curRole,
                'matchList.state': state,
                'matchList.prePageIndex': index,
                'matchList.prePageTitle': title,
                'matchList.prePageDataList': dataList,
                prePage: prePage
            })
            // 给当前页面数据赋值
            curPageData = recvdSData
        } else if(type == 'recvdPushInfo') {
            wx.setNavigationBarTitle({
              title: '收到的推送'
            })
            var recvdSData = data.receivedSInfo
            var curRole = data.role
            var state = data.status
            // 设置匹配按键状态
            this.setMatchStatus(state,curRole)
            var ids = this.setFourIDs(data)
            this.setData({
                'recvdPushInfo.portrait': recvdSData.wx_portraitAddr,
                'recvdPushInfo.pSOID': ids.pSOID,
                'recvdPushInfo.pDOID': ids.pDOID,
                'recvdPushInfo.tSOID': ids.tSOID,
                'recvdPushInfo.tDOID': ids.tDOID,
                'recvdPushInfo.role': curRole,
                'recvdPushInfo.state': state,
                'recvdPushInfo.prePageIndex': index,
                'recvdPushInfo.prePageTitle': title,
                'recvdPushInfo.prePageDataList': dataList,
                prePage: prePage,
                open_id: data.seeker_openid
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
        // type的值:seekerInfo,messageList,matchList或者recvdPushInfo
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
        if(type=='messageList' || type == 'recvdPushInfo' || type == 'matchList') {
            this.setData({
                [type + '.list.reqInfo.data.reward.show']: false,
                [type + '.list.reqInfo.data.advance.show']: false
            })
        }
    },
    // 设置四方id
    setFourIDs(data) {
        var recvdSData = data.receivedSInfo
        var recvdDOpenid = data.receivedDInfo.open_id
        var myDOID = data.delegator_openid
        var mySOID = data.seeker_openid
        var curRole = data.role
        var state = data.status
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
        return {
            pSOID: pSOID,
            pDOID: pDOID,
            tSOID: tSOID,
            tDOID: tDOID
        }
    },



    //--------------- RecvdPushInfo Page functions -----------------//
    /*
     * 匹配状态说明：
     * “0”: 双方未发送请求
     * “1”: “推送给我”方申请匹配
     * “2”: “推送给我”方拒绝匹配
     * “3”: “我被推送”方申请匹配
     * “4”: “我被推送”方拒绝匹配
     * “5”: 双方均接受
     * */
    // 设置匹配按键状态
    setMatchStatus(state,role) {
        var btnStr = this.data.recvdPushInfo.btnStateStr
        var stateBtnStr = btnStr.request
        var stateBtnType = 'primary'
        var stateBtnHidden = false
        var stateBtnDisable = false
        var refuseBtnHidden = false
        var refuseBtnDisable = false
        if(state == 0) {
            stateBtnStr = btnStr.request
        } else if(state == 1) {
            if(role == 'pSeeker') {
                stateBtnStr = btnStr.sended
                stateBtnDisable = true
                refuseBtnHidden = true
            } else {
                stateBtnStr = btnStr.agree
            }
        } else if(state == 2) {
            if(role == 'pSeeker') {
                stateBtnStr = btnStr.irefuse
                stateBtnDisable = true
                refuseBtnHidden = true
            } else {
                stateBtnStr = btnStr.orefuse
                stateBtnDisable = true
                refuseBtnHidden = true
            }
        } else if(state == 3) {
            if(role == 'pSeeker') {
                stateBtnStr = btnStr.agree
            } else {
                stateBtnStr = btnStr.sended
                stateBtnDisable = true
                refuseBtnHidden = true
            }
        } else if(state == 4) {
            if(role == 'pSeeker') {
                stateBtnStr = btnStr.orefuse
                stateBtnDisable = true
                refuseBtnHidden = true
            } else {
                stateBtnStr = btnStr.irefuse
                stateBtnDisable = true
                refuseBtnHidden = true
            }
        } else if(state == 5) {
            // 双方都接受，则匹配成功，删除相关推送条目，增加匹配条目
            //var title = this.data.recvdPushInfo.prePageTitle
            //var index = this.data.recvdPushInfo.prePageIndex
            //var dataList = this.data.recvdPushInfo.prePageDataList
            //var prePage = this.data.prePage
            //dataList[index] = {}
            ////dataList.splice(index,1)
            //prePage.setData({
            //    title: dataList
            //})
            //wx.navigateBack({})
            wx.reLaunch({
                url: './seeker?openId='+this.data.open_id
            })
        }
        this.setData({
            'recvdPushInfo.btn.stateBtn.btnStr': stateBtnStr,
            'recvdPushInfo.btn.stateBtn.type': stateBtnType,
            'recvdPushInfo.btn.stateBtn.hidden': stateBtnHidden,
            'recvdPushInfo.btn.stateBtn.disable': stateBtnDisable,
            'recvdPushInfo.btn.refuseBtn.hidden': refuseBtnHidden,
            'recvdPushInfo.btn.refuseBtn.disable': refuseBtnDisable,
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
                role: data.role,
                state: data.state
            },
            success: function(res) {
                var state = res.data.data.state
                var role = data.role
                if(state == -1) util.showModel('后台错误，请求失败！',res.data.data.result)
                else {
                    that.setMatchStatus(state,role)
                    that.genMatchContract()
                }
            }
        })
    },
    // 拒绝匹配
    sendRefuseReq(opt) {
        var that = this
        var data = this.data.recvdPushInfo
        wx.request({
            url: config.service.sendMatchRefuseUrl,
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
                var result = res.data.data.result
                var role = data.role
                if(result.status == 200) {
                    var state = (role == 'pSeeker' ? 2 : 4)
                    that.setMatchStatus(state,role)
                } else {
                    util.showModel('后台错误，请求失败！',result)
                }
            }
        })
    },

    //--------------- matchList Page functions -----------------//
    genMatchContract(data) {
        var data = this.data.recvdPushInfo
        wx.request({
            url: config.service.insertMatchContractUrl,
            data: {
                pDelegator_openid: data.pDOID,
                pSeeker_openid: data.pSOID,
                tDelegator_openid: data.tDOID,
                tSeeker_openid: data.tSOID
            },
            success: function(res) {
                util.showSuccess('成功')
            }
        })
    },
    // 设置恋爱按钮状态
    /*
     * 匹配状态说明：
     * “0”: 双方未发送请求
     * “1”: “推送给我”方申请匹配
     * “2”: “推送给我”方拒绝匹配
     * “3”: “我被推送”方申请匹配
     * “4”: “我被推送”方拒绝匹配
     * “5”: 双方均接受
     * */
    // 设置匹配按键状态
    setMarryStatus(state,role) {
        var btnStr = this.data.matchList.btnStateStr
        var stateBtnStr = btnStr.request
        var stateBtnType = 'primary'
        var stateBtnHidden = false
        var stateBtnDisable = false
        var refuseBtnHidden = false
        var refuseBtnDisable = false
        if(state == 0) {
            stateBtnStr = btnStr.request
        } else if(state == 1) {
            if(role == 'pSeeker') {
                stateBtnStr = btnStr.sended
                stateBtnDisable = true
                refuseBtnHidden = true
            } else {
                stateBtnStr = btnStr.agree
            }
        } else if(state == 2) {
            if(role == 'pSeeker') {
                stateBtnStr = btnStr.irefuse
                stateBtnDisable = true
                refuseBtnHidden = true
            } else {
                stateBtnStr = btnStr.orefuse
                stateBtnDisable = true
                refuseBtnHidden = true
            }
        } else if(state == 3) {
            if(role == 'pSeeker') {
                stateBtnStr = btnStr.agree
            } else {
                stateBtnStr = btnStr.sended
                stateBtnDisable = true
                refuseBtnHidden = true
            }
        } else if(state == 4) {
            if(role == 'pSeeker') {
                stateBtnStr = btnStr.orefuse
                stateBtnDisable = true
                refuseBtnHidden = true
            } else {
                stateBtnStr = btnStr.irefuse
                stateBtnDisable = true
                refuseBtnHidden = true
            }
        } else if(state == 5) {
            stateBtnStr = btnStr.complete
            stateBtnDisable = true
            refuseBtnHidden = true
        }
        this.setData({
            'matchList.btn.stateBtn.str': stateBtnStr,
            'matchList.btn.stateBtn.type': stateBtnType,
            'matchList.btn.stateBtn.hidden': stateBtnHidden,
            'matchList.btn.stateBtn.disable': stateBtnDisable,
            'matchList.btn.refuseBtn.hidden': refuseBtnHidden,
            'matchList.btn.refuseBtn.disable': refuseBtnDisable,
        })
    },
    // 拒绝恋爱
    sendMarryFReq(opt) {
        var that = this
        var data = this.data.matchList
        wx.request({
            url: config.service.sendMarryRefuseUrl,
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
                var result = res.data.data.result
                var role = data.role
                if(result.status == 200) {
                    var state = (role == 'pSeeker' ? 2 : 4)
                    that.setMarryStatus(state,role)
                } else {
                    util.showModel('后台错误，请求失败！',result)
                }
            }
        })
    },
    // 接受恋爱
    sendMarrySReq(opt) {
        var that = this
        var data = this.data.matchList
        wx.request({
            url: config.service.sendMarryAcceptUrl,
            data: {
                queryData: {
                    pSeeker_openid: data.pSOID,
                    pDelegator_openid: data.pDOID,
                    tSeeker_openid: data.tSOID,
                    tDelegator_openid: data.tDOID,
                },
                role: data.role,
                state: data.state
            },
            success: function(res) {
                var state = res.data.data.state
                var role = data.role
                if(state == -1) util.showModel('后台错误，请求失败！',res.data.data.result)
                else {
                    that.setMarryStatus(state,role)
                }
            }
        })
    },
})
