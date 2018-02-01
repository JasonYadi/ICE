// pages/newsList/newsList.js
const app = getApp();
const req = app.request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    req('ice/news',{},function(res){
      console.log(res)
      that.setData({
        list:res.data
      })
    })
  },
  toNewsDetail:function(e){
    wx.navigateTo({
      url: '../newsDetail/newsDetail?newsId='+e.currentTarget.dataset.newsId
    })
  }
})