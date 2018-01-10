Page({
    data: {
        title: '身份识别信息',
        myRequest: '我的要求'
    },
    onLoad: function(opt) {
        wx.setNavigationBarTitle({
          title: '我要找对象'
        })
    },
    go2PersonalInfo: function() {
        wx.navigateTo({
        //wx.redirectTo({
            url: './regPersonalInfo'
        })
    }
})

