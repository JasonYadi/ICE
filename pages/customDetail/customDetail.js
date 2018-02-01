// pages/customDetail/customDetail.js
const app =getApp();
const req = app.request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const that =this;
    req('ice/campany',{
      id: options.customId
    },function(res){
      that.setData({
        src:res.data
      })
    })
  },
})