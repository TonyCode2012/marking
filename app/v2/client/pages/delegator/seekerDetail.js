var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js')
var config = require('../../config')
const { Tab, extend } = require('../../zanui-style/index');

Page({
    data: {
        list: {
            basicInfo: {
                title: "基本信息",
                data: {
                    name:{ title:"姓名", value:"" },
                    age:{ title:"年龄", value:"" },
                    gender:{ title:"性别", value:"" },
                    height:{ title:"身高", value:"" },
                    weight:{ title:"体重", value:"" },
                    education:{ title:"文凭", value:"" },
                    constellation:{ title:"星座", value:"" },
                    blood_type:{ title:"血型", value:"" },
                }
            },
            reqInfo:{
                title: "征婚信息",
                data: {
                    //portait:{ title:"头像", value:"" },
                    //wx_portraitAddr:{ title:"微信头像", value:"" },
                    requirement:{ title:"征婚要求", type:"textarea", value:"" },
                    self_introduction:{ title:"自我介绍", type:"textarea", value:"" },
                    reward:{ title:"报酬", value:"" },
                    advance:{ title:"预付", value:"" }
                }
            }
        },
        portrait:"",
        released: false
    },

    onLoad: function(opt) {
        var data = JSON.parse(opt.data)
        this.setData({
            portrait: data.wx_portraitAddr
        })
        this.setPageData(data)
        //util.showSuccess(JSON.stringify(opt))
    },
    setPageData: function(data) {
        var dataList = this.data.list
        var keyArry = Object.keys(dataList)
        for(var i=0;i<keyArry.length;i++) {
            var key = keyArry[i]
            var val = dataList[key].data
            var title = 'list.' + key + '.data.'
            var valKeyArry = Object.keys(val)
            for(var j=0;j<valKeyArry.length;j++){
                var valKey = valKeyArry[j]
                var valTitle = title + valKey
                this.setData({
                    [valTitle + '.value']: data[valKey]
                })
            }
        }
    },
    release: function(opt) {
        util.showSuccess('发布成功')
        this.setData({
            released: true
        })
    },
    cancelRelease: function(opt) {
        util.showSuccess('取消发布成功')
        this.setData({
            released: false
        })
    }
})
