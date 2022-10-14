Page({
  // data:{
  //   name:'',
  //   phonenumber:[]
  // },
  PersonForm: function(event){
    //console.log("aaaaaaaaa");
    // console.log(event.detail.value.phonenumber);
    var name = event.detail.value.name;
    var phonenumber= event.detail.value.phonenumber;
    const ui = wx.getStorageSync("userInfo");
    console.log(name,phonenumber);
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


