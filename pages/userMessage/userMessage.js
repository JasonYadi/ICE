// pages/userMessage/userMessage.js
const app = getApp();
const userCodeReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证正则
const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;  //手机号码正则
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    userCode:"",
    phone:"",
    isBind:false,
    isAlter:true,
    isPass:true,
    getCodeTime:0,
    codeStr:"免费获取",
    verifyCode:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavigationBarColor()
  },
  submit:function(e){//提交或保存个人资料
    let { phone, userCode, userName, verifyCode} = e.detail.value
    let msg = "" , flag = false
    if(userName === ""){
      msg = "真实姓名不能为空！"
      flag = true
    }else if(!userCodeReg.test(userCode)){
      msg = "身份证格式错误！"
      flag = true
    }else if(!phoneReg.test(phone)){
      msg = "手机号码格式错误！"
      flag = true
    }
    if(flag){
      wx.showModal({
        title: '提示',
        content: msg,
      })      
    }else{
      this.setData({
        isBind: true,
        isAlter: true
      })
    }
  },
  getPhone:function(e){//设置手机号码
    this.setData({
      phone:e.detail.value
    })
  },
  getCode:function(e){//获取验证码
    if (!phoneReg.test(this.data.phone)){
      return wx.showModal({
        title: '提示',
        content: '手机号码错误！',
        success:function(e){
          if(e.confirm){

          }
        }
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
    }
  },
  changeAlter:function(){//切换修改
    this.setData({
      isAlter:false,
      isBind:false
    })
  },
  judgePass:function(e){//验证码是否输入正确
    let that = this 
    if (this.data.verifyCode != '' && e.detail.value != this.data.verifyCode){
      return wx.showModal({
        title: '提示',
        content: '验证输入错误',
        success:function(e){
          if(e.confirm){
            that.setData({
              isPass: false,
            })
          }
        }
      })
    }
    this.setData({
      isPass: true,
    })
  }
})