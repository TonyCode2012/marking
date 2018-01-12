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
                    list: [{
                        id: 'receivedPush',
                        title: '收到的推送'
                    },{
                        id: 'sendedPush',
                        title: '发出的推送'
                    }],
                    id2Index: {},
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
                    list: [{
                        id: 'identityInfo',
                        title: '身份信息',
                        data: {
                            name: '',
                            gender: '',
                            identityNum: '',
                            wechat: '',
                            phoneNum: '',
                            edit_vis: false
                        }
                    },{
                        id: 'publicInfo',
                        title: '可公布信息',
                        data: {
                            age: '',
                            height: '',
                            education: '',
                            constellation: '',
                            bloodType: '',
                            edit_vis: false
                        }
                    },{
                        id: 'privateInfo',
                        title: '隐私信息'
                    },{
                        id: 'releaseInfo',
                        title: '我的发布',
                        data: {
                        }
                    }],
                    id2Index: {},
                    activeIndex: 0,
                    selectedId: 'identityInfo',
                    sliderOffset: 0,
                    sliderLeft: 0
                }
            }],
            selectedId: 'myPush',
            scroll: true,
            id2Index: {},
            height: 45
        },
        userInfo: {},
        title: '',
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
    tabClick: function (opt) {
        var i = this.findIndex(this.data.tabContent);
        //var j = this.findIndex(this.data.tabContent.list[i].data)
        var selectedId = this.data.tabContent.list[i].data.list[opt.currentTarget.id].id;
        //var curData = "tabContent.list[" + i + "].data.list[" + j + "].data";
        var curData = "tabContent.list[" + i + "].data";
        this.setData({
            [curData + '.sliderOffset']: opt.currentTarget.offsetLeft,
            [curData + '.activeIndex']: opt.currentTarget.id,
            [curData + '.selectedId']: selectedId
        });
    },
    findIndex: function(tabContent) {
        var curId = tabContent.selectedId
        var i = 0;
        if(tabContent.id2Index[curId] != undefined) {
            i = tabContent.id2Index[curId];
        } else {
            for(;i<tabContent.list.length;i++){
                if(tabContent.list[i].id == tabContent.selectedId){
                    break;
                }
            }
            tabContent.id2Index[curId] = i
        }
        return i;
    },
    editMyInfoBtn: function(opt) {
        var i = this.findIndex(this.data.tabContent);
        var j = this.findIndex(this.data.tabContent.list[i].data)
        //var curData = "tabContent.list[" + i + "].data.list[" + j + "]." + opt.currentTarget.dataset.infotype;
        var curData = "tabContent.list[" + i + "].data.list[" + j + "].data";
        this.setData({
            [curData + '.edit_vis']: true
        })

    },
    changeInfoTblStatus: function(opt) {
    }
}));
