//app.js
App({
  httpUrl:'http://192.168.1.134/ICE/public/Portal/',
  onLaunch: function () {
    this.login()
  },
  isBind:0,
  setNavigationBarColor:function(){//动态修改导航栏背景以及字体颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#2ca5e4',
    })
  },
  request:function(url,data,funcBack){
    wx.request({
      url: this.httpUrl+url,
      data:data,
      method:"POST",
      header: { "Content-Type": "application/x-www-form-urlencoded"},
      success:function(e){
        return typeof funcBack === 'function' ? funcBack(e.data) : funcBack
      }
    })
  },
  city:'北京',
  login:function(){//登陆
    let that = this
    wx.login({
      success:function(e){
        if(e.code){
          wx.getUserInfo({
            success:function(e){
              that.request('Wxlogin/login', { code: e.code, user_info: JSON.stringify(e.userInfo)}, function (e) {
                let { user_id, token } = e.data
                wx.setStorageSync("userId", user_id)
                wx.setStorageSync("token", token)
              })
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '微信登陆失败，请删除小程序重新打开！',
          })
        }
      }
    })
  }
})