Page({
  data:{
    photopath:"https://i.imgtg.com/2022/10/09/pf7wp.jpg"
  },
  uploadPhoto: function() {
    wx.chooseImage({
      count:1,
      sizeType:'compressed',
      sourceType:['album', 'camera'],
      success:res=>{
        // console.log(res.tempFilePaths[0])
        var photoTempPath = res.tempFilePaths[0]
        this.uploadPhotoToDatabase(photoTempPath)
      }
    })
  },
  uploadPhotoToDatabase: function(photoTempPath) {
    wx.showLoading({
      title:"正在上传......"
    })
    wx.cloud.uploadFile({
      cloudPath:"photo/"+Date.now()+".jpg",
      filePath:photoTempPath,
      success:(res) =>{
        this.setData({
          photopath:res.fileID
        })
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title:"上传成功！",
          duration:2000
        })
      },
      fail(res) {
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title:"上传失败，请检查网络！",
          icon:"none",
          duration:2000
        })
      }
    })    
  },
  onLoad: function (options) {

  },
  PersonForm: function(event){
    //console.log("aaaaaaaaa");
    // console.log(event.detail.value.phonenumber);
    var name = event.detail.value.name;
    var phonenumber= event.detail.value.phonenumber;
    var biography=event.detail.value.biography;
    var photopath=this.data.photopath;
    const ui = wx.getStorageSync("userInfo");
    console.log(name,phonenumber,biography,
      photopath);
    if (!phonenumber || !name) {
      wx.showToast({
        title: '不能为空！',
        icon: 'error',
        duration: 500
      })
    }
    else{
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 500//持续的时间
        })
        if(!ui.openid)
        {
          wx.switchTab({
            url: '/pages/me/me',
          })
        }
        else{
          //console.log("enter");
          wx.cloud.callFunction({
            name:"create_man",
            data:{
              name:name,
              phonenumber:phonenumber,
              biography:biography,
              photopath:photopath,
              openid:ui.openid
            }
        })
        // console.log("out");
      }
      setTimeout(()=>{wx.reLaunch({
        url: 'index?id=1'
        })
      },600 )
    }
  },
})
// Page({
//   wifiForm: function(data) {
//   console.log("wifi的名称为：",data.detail.value.wifiname)
//   console.log("wifi的密码为：",data.detail.value.password)
// }
// })


