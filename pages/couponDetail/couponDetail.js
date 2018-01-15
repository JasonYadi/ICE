// pages/myCoupon/myCoupon.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponData: { id: 0, name: "手续费减半", is_get: 0 },
    status:'other',
    is_used:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavigationBarColor()
    console.log(options)
    this.setData({
      status: options.hasOwnProperty('status')?options.status:'other'
    })
  }
})