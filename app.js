//app.js

App({
  httpUrl: 'https://api.icechina.net.cn/ICE/public/Portal/',
  onLaunch: function () {
    let that = this
    this.request("Color/set_color", {}, function (e) {
      that.color.font_color = e.data.font_color
      that.color.bk_color = e.data.bk_color
    })
  },
  isBind: 0,//用户是否绑定了个人信息
  color: {//存储顶部导航背景字体颜色
    font_color: "",
    bk_color: "",
  },
  cityCoupon: '',//默认优惠券选中城市
  cityNetwork:'',//默认网点选中城市
  baiduKey:"LWwo85Al3y0mL3IWvWWHXrzSOPotzeeZ",//百度密钥
  setNavigationBarColor: function () {//动态修改导航栏背景以及字体颜色  
    wx.setNavigationBarColor({
      frontColor: this.color.font_color,
      backgroundColor: this.color.bk_color,
    })
  },
  request: function (url, data, funcBack, errFuncBack) {//重写request请求
    const that = this;
    data['user_id'] = wx.getStorageSync('userId');
    data['token'] = wx.getStorageSync('token');
    wx.request({
      url: this.httpUrl + url,
      data: data,
      method: "POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (e) {
        return typeof funcBack === 'function' ? funcBack(e.data) : funcBack
      },
      fail: function () {
        return typeof errFuncBack === 'function' ? errFuncBack() : errFuncBack
      }
    })
  },
  login: function (func) {//登陆
    let that = this
    wx.login({
      success: function (e) {
        if (e.code) {
          that.getUserInfo(e.code,func)
        } else {
          wx.showModal({
            title: '提示',
            content: '微信登陆失败，请删除小程序重新打开！',
          })
        }
      }
    })
  },
  getUserInfo: function (code,func) {//获取/保存用户信息
    let that = this
    wx.getUserInfo({
      success: function (res) {
        const { avatarUrl, nickName} = res.userInfo;
        that.request('Wxlogin/login', { code: code, user_info: JSON.stringify(res.userInfo) }, function (result) {
          let { user_id, token, color, bangding } = result.data
          wx.setStorageSync("userId", user_id)
          wx.setStorageSync("token", token)
          wx.setStorageSync("userName", nickName)
          wx.setStorageSync("avatarUrl", avatarUrl)
          that.isBind = bangding
          typeof func === 'function' ? setTimeout(func,0) : func
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '为了您的体验，请授权后再使用。',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.accredit(code,func)
            }
          }
        })
      }
    })
  },
  accredit: function (code, func) {//重新授权
    let that = this
    wx.openSetting({
      success: function (e) {
        if (e.authSetting['scope.userInfo']) {
          that.getUserInfo(code, func)
        } else {
          that.accredit(code,)
        }
      }
    })
  }
})