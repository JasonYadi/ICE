// pages/networkDetail/networkDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGet:0,
    isBind:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavigationBarColor();
    console.log(options)
  },
  toImages:function(e){
    wx.navigateTo({
      url: '../networkImageList/networkImageList',
    })
  },
  openMap:function(e){//打开地图
    let { longitude, latitude, networkName, networkAddr } = e.currentTarget.dataset
    wx.openLocation({
      latitude: +latitude,
      longitude: +longitude,
      name: networkName,
      address: networkAddr,
      scale: 16
    })
  },
  getCoupon:function(e){//获取优惠券
    if(app.isBind === 0){
      return this.setData({
        isBind:1
      })
    }
  },
  topCouponDetail:function(e){
    let {couponId} = e.currentTarget.dataset
    wx.navigateTo({
      url: '../couponDetail/couponDetail?couponId=' + couponId
    })
  }
})