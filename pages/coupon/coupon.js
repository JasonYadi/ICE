// pages/coupon/coupon.js
import bmap from '../../utils/bmap-wx.min.js';
const app = getApp();
const req = app.request;
const BMap = new bmap.BMapWX({
  ak: app.baiduKey
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reslut:[],
    citys:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that =this;
    that.initCity();   
  },
  onReady: function () {
    app.setNavigationBarColor()
  },
  onShow:function(){
    /**
     * Todo:获取选中城市的优惠券
     */
    if (app.cityCoupon != ''){
      this.judgeCity(app.cityCoupon);
      this.initCouponList(app.cityCoupon);
    }
  },
  initCouponList:function(city){//获取优惠券集合
    const that = this;
    req('ice/city_card',{
      city_name: city,
    },function(res){
      that.setData({
        reslut:res.data
      })
    });
  },
  initCity:function(){//获取当前地址
    const that = this;
    BMap.regeocoding({
      fail: function () { },
      success: function (e) {
        let city = e.originalData.result.addressComponent.city.replace('市', '')
        that.judgeCity(city);
        that.initCouponList(city);
      }
    })
  },
  changeCity:function(e){//切换城市
    const {cityName} = e.currentTarget.dataset;
    const that = this;
    if(that.data.citys[0] === cityName)return;//判断是否重复点击当前选中城市，不进行任何操作
    that.judgeCity(cityName);
    that.initCouponList(cityName);
  },
  /**
   * 判断城市是否是北上广，进行城市切换
   */
  judgeCity:function(city){
    let arr = [];
    if (city === '北京') {
      arr = arr.concat(['北京', '上海', '广州'])
    } else if (city === '上海') {
      arr = arr.concat(['上海', '北京', '广州'])
    } else if (city === '广州') {
      arr = arr.concat(['广州', '上海', '北京'])
    } else {
      arr = arr.concat([city, '北京', '上海'])
    }
    app.cityCoupon = city;
    this.setData({
      citys: arr
    })
  }
})