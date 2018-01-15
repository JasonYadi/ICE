// pages/citys/citys.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'北京6',
    selectCity:'北京'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavigationBarColor()
    this.setData({
      selectCity:app.city
    })
  },  
  selectCity:function(e){
    app.city = e.currentTarget.dataset.name
    wx.navigateBack()
  }
})