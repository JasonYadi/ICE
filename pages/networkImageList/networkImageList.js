// pages/networkImageList/networkImageList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[
      "../images/network01.jpg",
      "../images/network01.jpg",
      "../images/network01.jpg",
      "../images/network01.jpg"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  selectImage:function(e){
    wx.previewImage({
      current:e.currentTarget.dataset.src,
      urls: this.data.imageList      
    })
  }
})