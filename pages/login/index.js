// pages/login/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    account: "",
    password: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 输入账号监听
   */
  bindAccountInput: function (event) {
    var disabled = false
    if (event.detail.value.length > 0 && this.data.password.length > 0) {
      disabled = false
    } else {
      disabled = true
    }
    this.setData({
      account: event.detail.value,
      disabled: disabled
    })
  },

  /**
 * 输入账号监听
 */
  bindPasswordInput: function (event) {
    var disabled = false
    if (event.detail.value.length > 0 && this.data.account.length > 0) {
      disabled = false
    } else {
      disabled = true
    }
    this.setData({
      password: event.detail.value,
      disabled: disabled
    })
  },

  onLogin: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: 'http://wangshufu.cn/userCenter/login',
      data: {
        mobile: that.data.account,
        pwd: that.data.password,
        pushId: ""
      },
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
        'token': ''
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status == -1) {
          wx.showToast({
            title: res.data.message,
            icon: "none"
          })
        } else {
          // 保存token
          wx.setStorageSync(app.globalData.token, res.data.data.id + "")
          //保存头像
          wx.setStorageSync(app.globalData.userIcon, res.data.data.userIcon)
          //保存用户名
          wx.setStorageSync(app.globalData.userName, res.data.data.userName)
          //保存手机号码
          wx.setStorageSync(app.globalData.userMobile, res.data.data.userMobile)
          //保存签名
          wx.setStorageSync(app.globalData.userSign, res.data.data.userSign)
          //保存性别
          wx.setStorageSync(app.globalData.userGender, res.data.data.userGender)
          wx.switchTab({
            url: '/pages/my/index',
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