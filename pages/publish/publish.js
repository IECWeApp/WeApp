Page({

    data: {
        imageData: "/pages/images/ic_add.png"
    },

    onTextChanged: function (event) {
        content = event.detail.value;
    },


    onPublishClick: function (event) {

        if (content == "" || tempImagePaths == "") {
            wx.showToast({
                title: "请输入内容并选择一张图片！",
                duration: 2000
            });

            return;
            /*setTimeout(function () {
             wx.hideToast();
             } , 2000)*/
        }

        that.publish();
    },

    publish: function () {
        var session = wx.getStorageSync('session');
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var formData = {
                    "session": session,
                    "content": content,
                    "filePath": tempImagePaths[0],
                    "latitude": res.latitude + "",
                    "longitude": res.longitude + ""
                };

                console.log(formData);
                wx.uploadFile({
                    url: 'https://ebichu.cn/newPic/', //仅为示例，非真实的接口地址
                    filePath: tempImagePaths[0],
                    name: 'file',
                    // method: "POST",
                    // header: {
                    //     'content-type': 'application/x-www-form-urlencoded'
                    // },
                    formData: {
                        "session": session,
                        "content": content,
                        "filePath": tempImagePaths[0],
                        "latitude": res.latitude + "",
                        "longitude": res.longitude + ""
                    },
                    success: function (res) {
                        console.log("upload file success :");
                        console.log(res);
                        var data = res.data;
                        //do something
                    },
                    fail: function (f) {
                        console.log("upload file fail :");
                        console.log(f);
                    }
                })
            }
        })
    },

    onImageClick: function (event) {
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                tempImagePaths = res.tempFilePaths;
                that.setData({
                    imageData: tempImagePaths
                })
            }
        })
    },

    onLoad: function () {
        that = this;
    }
});

var that;
var tempImagePaths = "";
var content = "";