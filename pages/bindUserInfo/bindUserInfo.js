const userCodeReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证正则
const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;  //手机号码正则
Component({
  properties: {
    show:{
      type:Number,
      value:0
    }
  },
  data: {
    getCodeStr:"免费获取",
    getCodeTime:0,
    phone:'',
    isPass:true,
    verifyCode:1234
  },
  methods: {
    getCoupon:function(e){//提交用户信息，获取优惠券
      console.log(e.detail.value)
      let { phone, userCode, userName, verifyCode } = e.detail.value
      let msg = "", flag = false
      if (userName === "") {
        msg = "真实姓名不能为空！"
        flag = true
      } else if (!userCodeReg.test(userCode)) {
        msg = "身份证格式错误！"
        flag = true
      } else if (!phoneReg.test(phone)) {
        msg = "手机号码格式错误！"
        flag = true
      } else if (verifyCode === ''){
        msg = "验证码不能为空！"
        flag = true
      }
      if (flag) {
        wx.showModal({
          title: '提示',
          content: msg,
        })
      }
    },
    getPhone:function(e){//赋值手机号码
      this.setData({
        phone:e.detail.value
      })
    },
    getCode:function(e){//获取验证码
      if(!phoneReg.test(this.data.phone)){
        return wx.showModal({
          title: '提示',
          content: '手机号码错误！',
        })
      }
      if(this.data.getCodeTime <= 0){
        let num = 60, that = this
        this.setData({
          getCodeStr: "重新获取(" + num + ")",
          getCodeTime: num
        })
        let timer = setInterval(function () {
          that.setData({
            getCodeTime: num--,
            getCodeStr: "重新获取(" + num + ")"
          })
          if (num <= 0) {
            that.setData({
              getCodeTime: 0,
              getCodeStr: "免费获取"
            })
            clearInterval(timer)
          }
        }, 1000)
        wx.showToast({
          title: '验证码已发送',
        })
      }
    },
    judgePass:function(e){//判断验证码是否正确
      let that = this
      if (this.data.verifyCode != '' && e.detail.value != this.data.verifyCode) {
        return wx.showModal({
          title: '提示',
          content: '验证输入错误',
          success: function (e) {
            if (e.confirm) {
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
    },
    closeModel:function(){//关闭弹窗
      this.setData({
        show:0
      })
    }
  }
})