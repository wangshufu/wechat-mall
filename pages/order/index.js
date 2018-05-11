// pages/order/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCategoryId: 1,
    categories: [
      {
        id: 0,
        categoryName: "全部"
      },
      {
        id: 1,
        categoryName: "待付款"
      },
      {
        id: 2,
        categoryName: "待收货"
      },
      {
        id: 3,
        categoryName: "已完成"
      },
      {
        id: 4,
        categoryName: "已取消"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      activeCategoryId: parseInt(options.orderStatus)
    })
  },

  /**
   * 类型
   */
  tabClick: function (event) {
    this.setData({
      activeCategoryId: event.currentTarget.id
    })

    this.loadOrderData(parseInt(event.currentTarget.id))
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
    this.loadOrderData(parseInt(this.data.activeCategoryId))
  },

/**
 * 获取订单数据
 */
  loadOrderData:function(orderStatus){
    wx.showLoading({
      title: '加载中',
    })
    var that = this

    wx.request({
      url: app.globalData.BaseUrl + 'order/getOrderList',
      data: {
        orderStatus: orderStatus
      },
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync(app.globalData.token)
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status == -1) {
          wx.showToast({
            title: res.data.message,
            icon: "none"
          })
        } else {
          if (res.data.data == null){
            that.setData({
              data: []
            })
            return
          }
          that.setData({
            data: res.data.data
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '网络不稳定',
          icon: "none"
        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
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