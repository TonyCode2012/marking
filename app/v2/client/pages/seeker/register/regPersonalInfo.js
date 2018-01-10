Page({
    data: {
        title: '基本信息',
        myRequest: '我的要求'
    },
    onLoad: function(opt) {
        wx.setNavigationBarTitle({
          title: '我要找对象'
        })
    },
    prePage: function(opt) {
        wx.navigateBack({})
    },
    go2PictureUploader: function(opt) {
        wx.navigateTo({
            url: './pictureUploader'
        })
    },
    doUpload: function () {
        var that = this

        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
                util.showBusy('正在上传')
                var filePath = res.tempFilePaths[0]

                // 上传图片
                wx.uploadFile({
                    url: config.service.uploadUrl,
                    filePath: filePath,
                    name: 'file',

                    success: function(res){
                        util.showSuccess('上传图片成功')
                        console.log(res)
                        res = JSON.parse(res.data)
                        console.log(res)
                        that.setData({
                            imgUrl: res.data.imgUrl
                        })
                    },

                    fail: function(e) {
                        util.showModel('上传图片失败')
                    }
                })

            },
            fail: function(e) {
                console.error(e)
            }
        })
    }
})

