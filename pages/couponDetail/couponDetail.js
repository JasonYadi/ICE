// pages/myCoupon/myCoupon.js
const app =getApp();
const req = app.request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponData: {},
    status:'other',
    is_used:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const {status,couponId} = options
    app.setNavigationBarColor();
    this.setData({
      status: status ? options.status : 'other'
    })

    if (status === 'my'){
      req('ice/my_cards', {
        card_id: options.couponId,
      }, function (res) {
        that.setData({
          couponData: res.data,
        })
      });
      that.setTimeoutErweima(couponId);
    } else{
      req('ice/coupon', {
        card_id: options.couponId,
      }, function (res) {
        that.setData({
          couponData: res.data,
        })
      });
    }
  },
  onUnload: function () {
    clearTimeout(this.data.timer);
    console.log(11)
  },
  setTimeoutErweima:function(id){
    const that = this;
    req('ice/check_use',{
      card_id:id
    },function(res){
      const {is_use} = res.data;
      if(is_use === '0'){
        const timer = setTimeout(() => that.setTimeoutErweima(id),500);
        that.setData({
          timer:timer
        })
      }else if(is_use === '1'){
        wx.showToast({
          title: '使用成功',
          success:function(){
            wx.navigateBack({})
          }
        })
      }
    })
  }
})