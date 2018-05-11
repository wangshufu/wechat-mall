// pages/good-list/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage:1,
    goodListIsEmpty: true,
    maxPage:1,
    goodList:[

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getGoodsList(options.categoryId,this.data.currentPage)
  },

/**
 * 
 */
  getGoodsList:function(categoryId,currentPage){
    var that = this
    //加载商品类型
    wx.request({
      url: app.globalData.BaseUrl + 'goods/getGoodsList',
      data: {
        categoryId: categoryId,
        pageNo:currentPage
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status == -1) {
          wx.showToast({
            title: res.data.message,
            icon: "none"
          })
        } else {
          if (res.data.data == null) {
            that.setData({
              goodListIsEmpty: false
            })
          } else {
            that.setData({
              goodListIsEmpty: true,
              goodList: res.data.data,
              maxPage: res.data.data[0].maxPage
            })
          }
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '网络不稳定',
          icon: "none"
        })
      }
    })
  },

  toDetailsTap: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '/pages/good-detail/index?goodsId=' + event.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh")
  },

  onScrollLower: function (event) {
    console.log("onScrollLower")
    // var nextUrl = this.data.requestUrl +
    //   "?start=" + this.data.totalCount + "&count=20";
    // util.http(nextUrl, this.processDoubanData)
    // wx.showNavigationBarLoading()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})