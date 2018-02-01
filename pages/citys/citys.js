// pages/citys/citys.js
const app =getApp();
const req = app.request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectCity:'北京',
    openCity:[],
    unopenCity:[],
    t:'',//是从网点选择城市还是优惠券选择城市
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {cityName , type} = options
    const that = this;
    app.setNavigationBarColor()
    that.setData({
      selectCity: cityName ? cityName : '北京',
      t: type
    })
    that.initCity();
  },  
  selectCity:function(e){
    if(this.data.t === 'coupon'){
      app.cityCoupon = e.currentTarget.dataset.name;
    }else{
      app.cityNetwork = e.currentTarget.dataset.name;
    }
    wx.navigateBack()
  },
  initCity:function(){
    const that = this;
    req('ice/city_get',{},function(res){
      console.log(res.data.unopen)
      that.setData({
        openCity:res.data.open,
        unopenCity: res.data.unopen
      })
    })
  }
})