// pages/userMessage/userMessage.js
const app = getApp();
const userCodeReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证正则
const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;  //手机号码正则
const req = app.request;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    userCode:"",
    phone:"",
    isBind:false,//是否绑定
    isAlter:true,//切换修改或保存
    getCodeTime:0,
    codeStr:"免费获取",
    verifyCode:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    app.setNavigationBarColor();
    req('ice/personal',{},function(res){
      const {id_card,mobile,user_login} = res.data;
      if(app.isBind === 1){
        that.setData({
          userName: user_login,
          userCode: id_card,
          phone: mobile,
          isBind:true,
        })
      }
    })
  },
  submit:function(e){//提交或保存个人资料
    const { phone, userCode, userName, verifyCode} = e.detail.value;
    const that = this;
    let msg = "" , flag = false;
    if(userName === ""){
      msg = "真实姓名不能为空！"
      flag = true
    }else if(!userCodeReg.test(userCode)){
      msg = "身份证格式错误！"
      flag = true
    }else if(!phoneReg.test(phone)){
      msg = "手机号码格式错误！"
      flag = true
    } else if (verifyCode === '' || verifyCode != this.data.verifyCode) {
      msg = "验证码错误！"
      flag = true
    }
    if(flag){
      wx.showModal({
        title: '提示',
        content: msg,
      })
    }else{
      req('ice/up_personal',{
        user_name: userName,
        id_card: userCode,
        mobile: phone,
        mobile_code: verifyCode,
      },function(res){
        that.setData({
          isBind: true,
          isAlter: true
        });
        app.isBind = res.data.bangding
      })
    }
  },
  getPhone:function(e){//设置手机号码
    this.setData({
      phone:e.detail.value
    })
  },
  getCode:function(e){//获取验证码
    const that = this;
    if (!phoneReg.test(this.data.phone)){
      return wx.showModal({
        title: '提示',
        content: '手机号码错误！',
        showCancel:false
      })
    }
    if(this.data.getCodeTime <= 0){
      let that = this
      let num = 60
      this.setData({
        getCodeTime:num,
        codeStr: "重新获取(" + num + ")"
      })
      let timer = setInterval(function () {
        that.setData({
          getCodeTime: num--,
          codeStr: "重新获取(" + num + ")"
        })
        if (num <= 0) {
          clearInterval(timer)
          that.setData({
            getCodeTime:0,
            codeStr:"免费获取"
          })
        }
      }, 1000)
      req('ice/send_msg',{
        mobile: that.data.phone
      },function(res){
        that.setData({
          verifyCode:res.data
        })
      })
    }
  },
  changeAlter:function(){//切换修改
    this.setData({
      isAlter:false,
    })
  },
  cancel:function(){//取消修改
    this.setData({
      isAlter:true
    })
  }
})