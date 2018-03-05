var util = require('../../utils/util.js')
var config = require('../../config')
var Zan = require('../../3rd_party/zanui-style/index');

Page(Object.assign({}, Zan.CheckLabel, {

    data: {
        //items: [
        //    {
        //        padding: 0,
        //        value: 1,
        //        name: '选项一',
        //    },
        //    {
        //        padding: 0,
        //        value: 2,
        //        name: '选项二',
        //    },
        //],    
        items: {},
        checked: {
            base: -1,
            color: {'-1':1},
            choosedSet: {'-1':0}
          //color: -1
        },    
        activeColor: '#4b0',
        checkAll: false,
        delegator_openid: "",
        MS_openid: "",
        MD_openid: ""
    },

    onLoad: function(opt) {
        var that = this
        // 设置当前红娘id
        var data = JSON.parse(opt.data)
        var delegator_openid = data.delegator_openid
        this.setData({
            delegator_openid: data.delegator_openid,
            MS_openid: data.MS_openid,
            MD_openid: data.MD_openid
        })
        // 获取当前红娘的客户
        wx.request({
            url: config.service.getMySeekerUrl,
            data: {
                delegator_openid: delegator_openid
            },
            success: function(res) {
                var data = res.data.data.result
                var items = {}
                for(var i=0;i<data.length;i++) {
                    data[i]['padding'] = 0
                    data[i]['value'] = i+1
                    items[i+1] = data[i]
                }
                that.setData({
                    items: items
                })
            }
        })
    },
    handleZanSelectChange({ componentId, value }) {
        var checkedValue = {}
        var valArry = Object.values(value)
        for(var i=0;i<valArry.length;i++) {
            var val = valArry[i]
            checkedValue[val] = 1
        }
        this.setData({
            [`checked.${componentId}`]: checkedValue
        });
        if(valArry.length == (Object.keys(this.data.items)).length) {
            this.setData({
                checkAll: true
            });
        } else {
            this.setData({
                checkAll: false
            });
        }
    },
    checkAll(e) {
        if(e.detail.value.length == 1) {
            // 注：checkedValue的值对应items中的value
            var checkedValue = {}
            var dataItem = Object.keys(this.data.items)
            for(var i=0;i<dataItem.length;i++) {
                checkedValue[i+1] = 1
            }
            this.setData({
                ['checked.color']: checkedValue
            });
        } else {
            this.setData({
                ['checked.color']: {}
            });
        }
    },
    // 将信息发布榜的信息推送给自己的客户
    //pushS2S: function(opt) {
    // 查看信息发布榜后将自己客户的信息推介给对方红娘
    pushS2D: function(opt) {
        var checkedSeekerId = this.data.checked['color']
        checkedSeekerId = Object.keys(checkedSeekerId)
        var insertData = []
        var items = this.data.items
        for(var i=0;i<checkedSeekerId.length;i++){
            var id = checkedSeekerId[i]
            var seeker_openId = items[id]['open_id']
            var tmpData = {
                pDelegator_openid: this.data.delegator_openid,
                pSeeker_openid: seeker_openId,
                tDelegator_openid: this.data.MD_openid,
                tSeeker_openid: this.data.MS_openid
            }
            insertData.push(tmpData)
        }
        wx.request({
            url: config.service.insertD2DUrl,
            data: {
                insertArry: insertData
            },
            success: function(res) {
                util.showSuccess(JSON.stringify(res))
            }
        })
    }
}));
