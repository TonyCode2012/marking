var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js')
const { Tab, extend } = require('../../zanui-style/index');

Page(extend({}, Tab, {
    data: {
        tab1: {
            list: [{
                id: 'myPush',
                title: '我的推送'
            },{
                id: 'myMatch',
                title: '我的匹配'
            },{
                id: 'messageList',
                title: '信息发布榜'
            },{
                id: 'myRelease',
                title: '我的发布'
            },{
                id: 'myMatchMaker',
                title: '我的红娘'
            },{
                id: 'myInfo',
                title: '我的信息'
            }],
            selectedId: 'myPush',
            scroll: true,
            height: 45
        },
        userInfo: {},
        title: '',
        //tabs: ["我的推送","我的匹配","信息发布榜","我的发布", "我的红娘", "我的信息"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        toView: 'red' ,
        scrollTop: 100
    },
    handleZanTabChange(e) {
      var componentId = e.componentId;
      var selectedId = e.selectedId;
    
      this.setData({
        [`${componentId}.selectedId`]: selectedId
      });
    },
    onLoad: function (opt) {
        wx.setNavigationBarTitle({
          title: '我要找对象'
        })
        var that = this;
        that.setData({
            title: opt.title
        })
        // show share menu
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
        //wx.getSystemInfo({
        //    success: function(res) {
        //        that.setData({
        //            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
        //            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        //        });
        //    }
        //});
    },
    newReward: function(opt) {
        wx.navigateTo({
            url: 'newReward'
        })
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
}));
