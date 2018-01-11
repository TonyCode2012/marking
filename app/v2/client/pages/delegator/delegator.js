var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js')
const { Tab, extend } = require('../../zanui-style/index');

Page(extend({}, Tab, {
    data: {
        tabContent: {
            list: [{
                id: 'infoReleaseTable',
                title: '信息发布榜'
            },{
                id: 'myPush',
                title: '我的推送'
            },{
                id: 'myTask',
                title: '我的任务'
            }], 
            selectedId: 'infoReleaseTable',
            scroll: false,
            height: 45
        },
        userInfo: {},
        title: '',
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
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
          title: '我是红娘'
        })
        var that = this;
        //util.showSuccess(opt.title)
        that.setData({
            title: opt.title
        })
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
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
}));

