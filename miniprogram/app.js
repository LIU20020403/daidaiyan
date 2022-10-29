// app.js
App({
  onLaunch : function () {
     wx.cloud.init({
      env:"cloud1-9goigp37ed469d6c",
       traceUser:true
     })
  },
  // onPullDownRefresh:function(){
  //   this.onRefresh();
  // },
  // onRefresh:function(){
  //   //导航条加载动画
  //   wx.showNavigationBarLoading();
  //   setTimeout(function () {
  //     wx.hideNavigationBarLoading();
  //     //停止下拉刷新
  //     wx.stopPullDownRefresh();
  //   })
  // },
});
