// pages/logs/logs.js
Page({
    data:{
      list:[]
    },
    get_man:function(){
      const ui = wx.getStorageSync('userInfo')
      const that = this
     
      if(!ui.openid){
        wx.switchTab({
          url: '/pages/me/me',
        })
      }
      else{
         wx.cloud.callFunction({
            name:"get_man",
            data:{
              openid:ui.openid
            },
            success:res=>{
              that.setData({
                lists:res.result.data
              })
              console.log(that.data.lists)
            },
            fail:res=>{
              console.log("res",res);
            }
         })
      }
    },
    onShow:function(){
      
      this.get_man()
    }
})