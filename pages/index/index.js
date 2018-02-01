//index.js
//获取应用实例
const app = getApp()
const req = app.request
Page({
  data: {
    newsImages: [//新闻列表集合
        "../images/swiper.jpg",
        "../images/swiper.jpg",
        "../images/swiper.jpg"
    ],
    conpons: [],//优惠活动集合
    customs: [],//栏目集合
    swiperCurrent:0,//轮播图指点
    isBind:0,//是否绑定了个人信息
    isGet:0,
    couponId:'',//优惠券id
  },
  onLoad: function () { 
    app.login(() => {
      this.initData()
    })//调用登录
  },
  onReady: function () {
    app.setNavigationBarColor()//动态设置状态栏颜色
  },
  onShow: function () {
    const that = this;
    that.initData();
    that.setData({
      isBind: 0
    })
  },
  initData:function(){//初始化数据
    let that = this
    req("ice/index", {}, function (res) {
      if (res.status === 200) {
        that.setData({
          newsImages: res.data.banner,
          conpons: res.data.card,
          customs: res.data.campany
        })
      }
    })
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
    let {couponId} = e.currentTarget.dataset; 
    if (app.isBind == '0'){
      this.setData({
        couponId: couponId,
        isBind: 1
      })
      return;
    };
    req('ice/get_card',{
      card_id: couponId,
    },function(res){
      if (res.info === '领取成功'){
        wx.showModal({
          title: '温馨提示',
          content: '恭喜您，领取成功！',
          showCancel:false,
          success:function(e){
            if(e.confirm){
              wx.navigateTo({
                url: '../couponDetail/couponDetail?couponId=' + couponId + '&status=my',
              })
            }
          }
        })
      }
    })

  }, 
  topCouponDetail: function (e) {//进入优惠券详情
    let { couponId, target } = e.currentTarget.dataset
    let status = '&status=' + target
    wx.navigateTo({
      url: '../couponDetail/couponDetail?couponId=' + couponId + status
    })
  },
  toCustomDetail:function(e){//进入栏目详情
    wx.navigateTo({
      url: '../customDetail/customDetail?customId=' + e.currentTarget.dataset.customId,
    })
  }
})
