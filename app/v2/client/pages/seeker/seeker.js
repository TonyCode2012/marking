var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js')
const { Tab, extend } = require('../../zanui-style/index');

Page(extend({}, Tab, {
    data: {
        tabContent: {
            list: [{
                id: 'myPush',
                title: '我的推送',
                data: {
                    infoType: ["收到的推送","发出的推送"],
                    activeIndex: 0,
                    sliderOffset: 0,
                    sliderLeft: 0,
                    title: '新建发布',
                    myRequest: '我的要求'
                }
            },{
                id: 'myMatch',
                title: '我的匹配'
            },{
                id: 'messageList',
                title: '信息发布榜'
            },{
                id: 'myMatchMaker',
                title: '我的红娘'
            },{
                id: 'myInfo',
                title: '我的信息',
                data: {
                    infoType: ["身份信息","可公布信息","隐私信息", "我的发布"],
                    identityInfo: {
                        edit_vis: false
                    },
                    publicInfo: {
                        edit_vis: false
                    },
                    activeIndex: 0,
                    sliderOffset: 0,
                    sliderLeft: 0
                }
            }],
            selectedId: 'myPush',
            scroll: true,
            height: 45
        },
        myPush: {
            infoType: ["收到的推送","发出的推送"],
            activeIndex: 0,
            sliderOffset: 0,
            sliderLeft: 0,
            title: '新建发布',
            myRequest: '我的要求'
        },
        myInfo: {
            infoType: ["身份信息","可公布信息","隐私信息", "我的发布"],
            identityInfo: {
                edit_vis: false
            },
            publicInfo: {
                edit_vis: false
            },
            activeIndex: 0,
            sliderOffset: 0,
            sliderLeft: 0
        },
        userInfo: {},
        title: '',
        //tabs: ["我的推送","我的匹配","信息发布榜","我的发布", "我的红娘", "我的信息"],
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
        var i = this.findIndex(this.data.tabContent);
        var curData = "tabContent.list[" + i + "].data"
        this.setData({
            [curData + '.sliderOffset']: e.currentTarget.offsetLeft,
            [curData + '.activeIndex']: e.currentTarget.id
        });
    },
    findIndex: function(tabContent) {
        var i = 0;
        for(;i<tabContent.list.length;i++){
            if(tabContent.list[i].id == tabContent.selectedId){
                break;
            }
        }
        return i;
    },
    editIndentityInfo: function(opt) {
        this.setData({
            'myInfo.identityInfo.edit_vis': true
        })
    },
    cancelEditIdentityInfo: function(opt) {
        this.setData({
            'myInfo.identityInfo.edit_vis': false
        })
    },
    saveIdentityInfo: function(opt) {
        this.setData({
            'myInfo.identityInfo.edit_vis': false
        })
    },
    editPublicInfo: function(opt) {
        this.setData({
            'myInfo.publicInfo.edit_vis': true
        })
    },
    cancelEditPublicInfo: function(opt) {
        this.setData({
            'myInfo.publicInfo.edit_vis': false
        })
    },
    savePublicInfo: function(opt) {
        this.setData({
            'myInfo.publicInfo.edit_vis': false
        })
    }
}));
