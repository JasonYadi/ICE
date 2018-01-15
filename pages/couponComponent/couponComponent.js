const app = getApp()
Component({
  properties:{
    couponData:{
      type:Object
    },
    target:{
      type:String
    }
  },
  data:{
    isBind:0
  },
  methods:{
    couponDetail:function(e){
      wx.navigateTo({
        url: '../couponDetail/couponDetail?couponId=' + e.currentTarget.dataset.couponId + "&status=" + e.currentTarget.dataset.target
      })
    },
    getCoupon:function(e){
      if (app.isBind === 0){
        this.setData({
          isBind:1
        })
      }
    }
  }
})