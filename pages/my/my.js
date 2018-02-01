// pages/my/my.js
const app = getApp();
const req = app.request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userHead:"",
    userName:"",
    phone:'',
    time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavigationBarColor();//修改导航栏背景以及字体颜色
    let that = this;
    that.setData({
      userHead: wx.getStorageSync('avatarUrl'),
      userName: wx.getStorageSync('userName')
    })
    req('ice/s_mobile',{},function(res){
      let { s_mobile, s_time} = res.data;
      that.setData({
        phone:s_mobile,
        time:s_time
      })
    })
  },
  phoneCall:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  }
})