var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js')
var config = require('../../config')
const { Tab, extend } = require('../../zanui-style/index');

Page({
    data: {
        list: {
            name:{ title:"姓名", value:"" },
            age:{ title:"年龄", value:"" },
            gender:{ title:"性别", value:"" },
            height:{ title:"身高", value:"" },
            weight:{ title:"体重", value:"" },
            education:{ title:"文凭", value:"" },
            constellation:{ title:"星座", value:"" },
            blood_type:{ title:"血型", value:"" },
            portait:{ title:"头像", value:"" },
            wx_portraitAddr:{ title:"微信头像", value:"" },
            requirement:{ title:"征婚要求", value:"" },
            self_introduction:{ title:"自我介绍", value:"" },
            reward:{ title:"报酬", value:"" },
            advance:{ title:"预付", value:"" }
        },
        portrait:""
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
            var title = 'list.' + key
            this.setData({
                [title + '.value']: data[key]
            })
        }
    }
})
