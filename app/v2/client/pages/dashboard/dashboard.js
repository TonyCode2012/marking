var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: {},
        tabs: ["我的代理人", "我的发布", "我的邮箱"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '自定义转发标题',
          path: '/page/user?id=123',
          success: function(res) {
            util.showSuccess('转发成功')
            // 转发成功
          },
          fail: function(res) {
            // 转发失败
          }
        }
    },
    onLoad: function () {
        var that = this;
        wx.showShareMenu({
            withShareTicket: true
        })
        wx.getUserInfo({
          success: function(res) {
            that.setData({
                userInfo: res.userInfo
            })
          }
        })
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});
