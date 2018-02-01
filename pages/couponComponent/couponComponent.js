const app = getApp();
const req = app.request;
Component({
  properties:{
    couponData:{
      type:Object
    },
    target:{
      type:String
    },
    isDetail:{
      type:String
    }
  },
  data:{
    isBind:0
  },
  methods:{
    couponDetail:function(e){//跳转详情
      if(this.data.isDetail === '1') return;
      wx.navigateTo({
        url: '../couponDetail/couponDetail?couponId=' + e.currentTarget.dataset.couponId + "&status=" + e.currentTarget.dataset.target
      })
    },
    getCoupon:function(e){//完善个人资料
      if (app.isBind === 0){
        this.setData({
          isBind:1
        })
        return;
      }
      const { couponId } = e.currentTarget.dataset;
      req('ice/get_card', {
        card_id: couponId,
      }, function (res) {
        if (res.info === '领取成功') {
          wx.showModal({
            title: '温馨提示',
            content: '恭喜您，领取成功！',
            showCancel: false,
            success: function (e) {
              if (e.confirm) {
                wx.navigateTo({
                  url: '../couponDetail/couponDetail?couponId=' + couponId + '&status=my',
                })
              }
            }
          })
        }
      })
    }
  }
})