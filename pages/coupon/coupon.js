// pages/coupon/coupon.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reslut:[
      { id: '0', name: "手续费减半", is_get: 0 },
      { id: '1', name: "手续费减半", is_get: 1 },
      { id: '2', name: "手续费减半", is_get: 1 },
      { id: '3', name: "手续费减半", is_get: 0 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavigationBarColor()
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        console.log(res)
      }
    })
  },
  onShow:function(){
    /**
     * Todo:获取选中城市的优惠券
     */
    console.log(app.city)
  }
})