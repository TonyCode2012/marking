var util = require('../../utils/util.js')
var config = require('../../config')
const { Tab, extend } = require('../../3rd_party/zanui-style/index');

Page({
    data: {
        info: {
            fromSeekerInfo: {
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
                portrait:""
            },
            toSeekerInfo: {
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
                portrait:""
            },
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
            }
        },
        userData: {},
        pDelegator_openid: '',
        type: '',
        btn: {
            str: '推送',
            disable: false
        }
    },

    onLoad: function(opt) {
        var that = this
        opt = JSON.parse(opt.data)
        var index = opt.index 
        var type = opt.type     // type的值receviedPush或者sendedPush 
        var pages = getCurrentPages()
        var DPage = pages[pages.length-2]
        var curData = DPage.data.homePage.tabContent.list.myPush.data.list[type].data.list[index]
        var matchInfo = curData.matchInfo
        that.setData({
            pDelegator_openid: opt.pDelegator_openid,
            userData: curData,
            type: type
        })
        this.prepareTpl()
        this.setPageData(matchInfo,type)
        // 设置按键状态
        var ids = {}
        if(type == 'receivedPush') {
            ids['pDelegator_openid'] = opt.pDelegator_openid
            ids['pSeeker_openid'] = matchInfo.toSeekerInfo.open_id
            ids['tDelegator_openid'] = matchInfo.receivedDInfo.open_id
            ids['tSeeker_openid'] = matchInfo.receivedSInfo.open_id
        } else {
            ids['pDelegator_openid'] = matchInfo.sendedDInfo.open_id
            ids['pSeeker_openid'] = matchInfo.sendedSInfo.open_id
            ids['tDelegator_openid'] = opt.pDelegator_openid
            ids['tSeeker_openid'] = matchInfo.fromSeekerInfo.open_id
        }
        wx.request({
            url: config.service.getDPushStatusUrl,
            data: ids,
            success: function(res) {
                var state = res.data.data.state
                if(state == -2) util.showModel('后台错误，请求失败！','')
                else that.setBtnState(state)
            }
        })
    },
    prepareTpl: function() {
        var dataList = this.data.info
        var keyArry = Object.keys(dataList)
        for(var i=0;i<keyArry.length;i++) {
            var key = keyArry[i]
            var val = dataList[key]['list']
            var title = 'info.' + key + '.list.'
            var valKeyArry = Object.keys(val)
            for(var j=0;j<valKeyArry.length;j++) {
                var valKey = valKeyArry[j]
                var valTitle = title + valKey
                this.setData({
                    [valTitle + '.data']: this.data.dataTpl[valKey]
                })
            }
        }
    },
    setBtnState(state) {
        var type = this.data.type
        var btnStr = '推送'
        var btnDisable = false
        if(state == -1) {
            if(type == 'sendedPush') {
                btnStr = '等待对方推送'
                btnDisable = true
            }
        } else if(state == 0 || state == 1 || state == 3){
            btnStr = '已推送，匹配中...'
            btnDisable = true
        } else if(state == 2 || state == 4){
            btnStr = '匹配失败'
            btnDisable = true
        } else if(state == 5) {
            // 匹配成功设置恋爱按钮状态
            var contractInfo = this.data.userData.contractInfo
            btnDisable = true
            var mStatus = contractInfo.status
            if(mStatus == 0 || mStatus == 1 || mStatus == 3) {
                btnStr = '匹配成功,恋爱中...'
            } else if(mStatus == 2 || mStatus == 4) {
                btnStr = '恋爱失败'
            } else if(mStatus == 5) {
                btnStr = '恋爱成功'
            }
        }
        this.setData({
            'btn.str': btnStr,
            'btn.disable': btnDisable
        })
    },
    setPageData(data,type) {
        var dataList = this.data.info
        var keyArry = Object.keys(dataList)
        for(var i=0;i<keyArry.length;i++) {
            var key = keyArry[i]
            var curData = {}
            if(type == 'receivedPush') {
                if(key == 'fromSeekerInfo') {
                    curData = data['receivedSInfo']
                } else {
                    curData = data['toSeekerInfo']
                }
            } else {
                if(key == 'fromSeekerInfo') {
                    curData = data['fromSeekerInfo']
                } else {
                    curData = data['sendedSInfo']
                }
            }
            var val = dataList[key]['list']
            var title = 'info.' + key + '.list.'
            this.setData({
                ['info.'+key+'.portrait']: curData['wx_portraitAddr']
            })
            var valKeyArry = Object.keys(val)
            for(var j=0;j<valKeyArry.length;j++){
                var valKey = valKeyArry[j]
                var valval = val[valKey]['data']
                var valTitle = title + valKey + '.data.'
                var valKKArry = Object.keys(valval)
                for(var k=0;k<valKKArry.length;k++) {
                    var valKK = valKKArry[k]
                    var valKeyTitle = valTitle + valKK
                    this.setData({
                        [valKeyTitle + '.value']: curData[valKK]
                    })
                }
            }
        }
    },
    push2Seeker(opt) {
        var that = this
        var userData = this.data.userData.matchInfo
        var insertData = []
        var tmpData = {
            pDelegator_openid: this.data.pDelegator_openid,
            pSeeker_openid: userData.toSeekerInfo.open_id,
            tDelegator_openid: userData.receivedDInfo.open_id,
            tSeeker_openid: userData.receivedSInfo.open_id
        }
        insertData.push(tmpData)
        wx.request({
            url: config.service.insertD2SUrl,
            data: {
                insertArry: insertData
            },
            success: function(res) {
                util.showSuccess('推送给客户成功')
                that.setBtnState(0)
            }
        })
    },
})
