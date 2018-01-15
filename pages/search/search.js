// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  toNetworkDetail:function(e){
    wx.navigateTo({
      url: '../networkDetail/networkDetail?networkId='+e.currentTarget.dataset.networkId,
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
  }
})