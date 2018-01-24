var util = require('../../utils/util.js')
var config = require('../../config')
const { Tab, extend } = require('../../zanui-style/index');

Page({
    data: {
        info: {
            receivedSInfo: {
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
        userData: {}
    },

    onLoad: function(opt) {
        var that = this
        var index = opt.index
        var pages = getCurrentPages()
        var DPage = pages[pages.length-2]
        var curData = DPage.data.homePage.tabContent.list.myPush.data.list.receivedPush.data.list[index]
        that.setData({
            userData: curData
        })
        this.prepareTpl()
        this.setPageData(curData)
        util.showSuccess('成功')
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
    setPageData: function(data) {
        var dataList = this.data.info
        var keyArry = Object.keys(dataList) // receivedSInfo或者toSeekerInfo
        for(var i=0;i<keyArry.length;i++) {
            var key = keyArry[i]
            var curData = data[key]
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
    confirmPush(opt) {
    },
})
