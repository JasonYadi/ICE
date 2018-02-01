// pages/newsDetail/newsDetail.js
const app = getApp();
const req = app.request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    req("ice/news", { new_id: options.newsId},function(res){
      console.log(res)
      that.setData({
        src: res.data
      })
    })
  },
})