//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    imgs: [//新闻列表集合
        "../images/swiper.jpg",
        "../images/swiper.jpg",
        "../images/swiper.jpg"
    ],
    swiperCurrent:0,//轮播图指点
    isBind:0,//是否绑定了个人信息
    isGet:0
  },
  onLoad: function () {
    app.setNavigationBarColor()
  },
  changeDots:function(e){//切换轮播图指点
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  toNewsDetail:function(e){//进入新闻详情页面
    wx.navigateTo({
      url: '../newsDetail/newsDetail?newsId='+e.currentTarget.dataset.newsId,
    })
  },
  getCoupon:function(e){//获取优惠券
  console.log(app.isBind)
    if (app.isBind===0){
      return this.setData({
        isBind:1
      })
    }
  }, 
  topCouponDetail: function (e) {
    let { couponId } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../couponDetail/couponDetail?couponId=' + couponId
    })
  },
  toCustomDetail:function(e){//进入栏目详情
    wx.navigateTo({
      url: '../customDetail/customDetail?customId=' + e.currentTarget.dataset.customId,
    })
  }
})
