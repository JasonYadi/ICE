// pages/my/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userHead:"",
    userName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavigationBarColor();//修改导航栏背景以及字体颜色
    let that = this;
    wx.login({
      success:function(loginResult){
        if(loginResult.code){
          wx.getUserInfo({
            success:function(userInfoResult){
              var {userInfo} = userInfoResult
              that.setData({
                userHead: userInfo.avatarUrl,
                userName: userInfo.nickName
              })
            }
          })
        }
      }
    })
  },
  phoneCall:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  }
})