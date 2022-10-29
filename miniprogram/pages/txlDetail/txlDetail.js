const db=wx.cloud.database() 
Page({ 
  data: { 
    allDetail:[], 
    id:[], 
    phonenumber:[], 
    name:"" 
  }, 
  call(event){ 
    const pnumber=event.currentTarget.dataset.pnumber 
    wx.makePhoneCall({ 
      phoneNumber: pnumber //仅为示例，并非真实的电话号码 
    }) 
  }, 
  onLoad:function(e){ 
    // console.log(e) 
    let that=this 
    let pname=e.name 
    // console.log(pname) 
    db.collection('person').where({ 
      name:pname 
    }).get({ 
      success(res){ 
        // console.log(res) 
        that.setData({ //给数据写入数据 
          allDetail:res.data, 
          id:res.data[0]._id, 
          phonenumber:res.data[0].phonenumber, 
          name:res.data[0].name 
        }) 
      } 
    })    
    // console.log('AAA') 
  }, 
  //失败的删除功能 
  pdelete:function(e){ 
    // console.log(e) 
    const Deid=e.currentTarget.dataset.deleteid 
    console.log(Deid) 
    // db.collection('person').where({ 
    //   _id:Deid 
    // }).remove({ 
    //     success(res){ 
    //       console.log('删除成功') 
    //     }, 
    //     fail(res){ 
    //       console.log("删除失败") 
    //     } 
    //   }) 
    wx.cloud.callFunction({ 
      name:'delete_all',//需要调用的云函数的名称 
      data:{ 
      item:Deid//将查找出来的记录的_id传给云函数，删除这个_id的记录 
      }, 
      success:res_del=>{//删除成功后提示已删除 
      wx.showToast({ 
            title: '已删除', 
            icon:'none', 
            duration: 300 
        }) 
        setTimeout(()=>{wx.reLaunch({ 
          url: '../logs/logs' 
          }) 
        },600 ) 
      } 
    }) 
  }, 
})