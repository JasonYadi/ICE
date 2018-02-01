// pages/myCouponList/myCouponList.js
const app = getApp();
const req = app.request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons: [],//优惠券集合
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    //获取我的优惠券集合
    req('ice/my_cards',{},function(res){
      console.log(res.data)
      that.setData({
        coupons:res.data
      })
    });
  },
})