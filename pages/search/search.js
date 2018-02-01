// pages/search/search.js
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
    citys:[],
    location:{lng:'',lat:''},
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.initCity();   
  },
  onShow:function(){
    const that = this;
    if (app.cityNetwork != ''){
      that.judgeCity(app.cityNetwork)
      that.initNetwork(app.cityNetwork,that.data.location)
    }
  },
  onReady:function(){
    app.setNavigationBarColor()
  },
  toNetworkDetail:function(e){
    const { networkId, distance } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../networkDetail/networkDetail?networkId='+ networkId + '&distance=' +distance,
    })
  },
  toMap:function(e){
    let {longitude,latitude,networkName,networkAddr} = e.currentTarget.dataset
    wx.openLocation({
      latitude: +latitude,
      longitude: +longitude,
      name: networkName,
      address: networkAddr,
      scale:16
    })
  },
  initNetwork:function(cityName,location){
    const that = this;
    req('ice/neary_stores',{
      lng:location.lng,
      lat:location.lat,
      city_name:cityName,
    },function(res){
      console.log(res)
      that.setData({
        list:res.data
      })
    })
  },
  initCity: function () {//获取当前地址
    const that = this;
    BMap.regeocoding({
      fail: function () { },
      success: function (e) {
        const { location, addressComponent: { city } } = e.originalData.result;
        let cityName = city.replace('市', '')
        that.judgeCity(cityName);
        that.initNetwork(cityName, location);
        that.setData({
          location:location
        })
      }
    })
  },
  /**
   * 判断城市是否是北上广，进行城市切换
   */
  judgeCity: function (city) {
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
    app.cityNetwork = city;
    this.setData({
      citys: arr
    })
  },
  changeCity:function(e){
    const {cityName} = e.currentTarget.dataset;
    const that = this;
    that.judgeCity(cityName);
    that.initNetwork(cityName, that.data.location);
  }
})