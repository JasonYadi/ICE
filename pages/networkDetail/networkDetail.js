// pages/networkDetail/networkDetail.js
const app = getApp();
const req = app.request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGet:0,
    isBind:0,
    data:{},
    distance:0,
    couponId:'',
    id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.initNewworkList(options.networkId);
    that.setData({
      distance: options.distance,
      id: options.networkId
    })
  },
  onReady: function () {
    app.setNavigationBarColor();
  },
  onShow:function(){
    const that = this;
    if(that.data.id){
      that.initNewworkList(that.data.id)
    }
  },
  toImages:function(e){
    wx.navigateTo({
      url: '../networkImageList/networkImageList?list=' + JSON.stringify(this.data.data.img),
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
    let { couponId } = e.currentTarget.dataset;
    if (app.isBind == '0') {
      this.setData({
        couponId: couponId,
        isBind: 1
      })
      return;
    };
    req('ice/get_card', {
      card_id: couponId,
    }, function (res) {
      if (res.info === '领取成功') {
        wx.showModal({
          title: '温馨提示',
          content: '恭喜您，领取成功！',
          showCancel: false,
          success: function (e) {
            if (e.confirm) {
              wx.navigateTo({
                url: '../couponDetail/couponDetail?couponId=' + couponId + '&status=my',
              })
            }
          }
        })
      }
    })
  },
  topCouponDetail:function(e){
    let {couponId} = e.currentTarget.dataset
    wx.navigateTo({
      url: '../couponDetail/couponDetail?couponId=' + couponId
    })
  },
  initNewworkList:function(id){//获取详情信息
    const that = this;
    req('ice/chose_store',{
      store_id:id
    },function(res){
      console.log(res)
      that.setData({
        data:res.data
      })
    })
  }
})