// pages/setting/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync(app.globalData.token)
    if (token.length == 0){
      this.setData({
        disabled : true
      })
    }
  },

  /**
   * 退出
   */
  exitTap: function (event) {
    // 清楚token
    wx.removeStorageSync(app.globalData.token)
    //清楚头像
    wx.removeStorageSync(app.globalData.token)
    //清楚用户名
    wx.removeStorageSync(app.globalData.userName)
    //清楚手机号码
    wx.removeStorageSync(app.globalData.userMobile)
    //清楚签名
    wx.removeStorageSync(app.globalData.userSign)
    //清楚性别
    wx.removeStorageSync(app.globalData.userGender)
    //清楚购物车
    wx.removeStorageSync(app.globalData.cartSize)

    wx.setTabBarBadge({
      index: 1,
      text: '0',
    })

    wx.navigateBack()
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