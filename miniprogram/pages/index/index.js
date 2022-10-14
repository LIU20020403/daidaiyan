Page({
  addLog(event){
    console.log(event.currentTarget.dataset.add);
    const add = event.currentTarget.dataset.add;
    const ui = wx.getStorageSync("userInfo");
    console.log("add",add);
    if(!ui.openid)
    {
      wx.switchTab({
        url: '/pages/me/me',
      })
    }else{
      wx.cloud.callFunction({
        name:"create_man",
        data:{
          add:add,
          time:Date.now(),
          openid:ui.openid
        }
      })
    }

  }
})