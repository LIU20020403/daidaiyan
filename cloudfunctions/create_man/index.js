// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:'cloud1-9goigp37ed469d6c'
})
const db = cloud.database() 


// 云函数入口函数
exports.main = async (event, context) => {
      try{
          return await db.collection("person").add({
            data:{
              name: event.name,
              phonenumber: event.phonenumber,
              openid: event.openid 
            }
          })
      }catch(e){
        console.log(e);
      }
  }
