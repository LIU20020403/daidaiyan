// pages/logs/logs.js
Page({
    data:{
      list:[]
    },
    onPullDownRefresh:function(){
      this.onRefresh();
    },
    onRefresh:function(){
      //导航条加载动画
      wx.showNavigationBarLoading()
      //loading 提示框
      wx.showLoading({
        title: '刷新中',
      })
      console.log("下拉刷新啦");
      setTimeout(function () {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        //停止下拉刷新
        wx.stopPullDownRefresh();
      }, 500)
    },
    showdetail(event){
      const name=event.currentTarget.dataset.name
      // console.log(name)
      wx.navigateTo({
        url: "../txlDetail/txlDetail?name="+name,
      })
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
              // console.log(that.data)
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