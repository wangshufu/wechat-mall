// pages/my/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userIcon: "/images/my/icon_default_user.png",
    userName: "登录/注册",
    token: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("my onLoad")
    this.setData({
      token: wx.getStorageSync(app.globalData.token)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("my onReady")
  },


  /**
   * 登录或者查看详情
   */
  onLogin: function () {
    // var token = wx.getStorageSync(app.globalData.token)
    if (this.data.token.length > 0) {
      wx.navigateTo({
        url: '/pages/user/index',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }

  },

  /**
   * 收货管理
   */
  onAddress: function () {
    

    if (this.data.token.length > 0) {
      wx.navigateTo({
        url: '/pages/address/address-list/index',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: "none"
      })
    }
  },

  /**
   * 分享
   */
  onShare: function () {
    wx.showToast({
      title: '傻逼功能,不做了',
      icon:"none"
    })
  },

  /**
   * 设置
   */
  onSetting: function () {
    wx.navigateTo({
      url: '/pages/setting/index',
    })
  },

/**
 * 订单
 */
  goOrderTap:function(event){
    console.log(event)
    //  0->我的订单   1->待付款   2->待收货   3->已完成   4->已取消
   

    if (this.data.token.length > 0) {
      wx.navigateTo({
        url: '/pages/order/index?orderStatus=' + event.currentTarget.dataset.orderStatus,
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: "none"
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("my onShow")
    var token = wx.getStorageSync(app.globalData.token)
    if (token.length > 0) {
      var icon = wx.getStorageSync(app.globalData.userIcon)
      console.log("icon=" + icon)
      var userName = wx.getStorageSync(app.globalData.userName)
      console.log("userName=" + userName)
      if (icon.length == 0) {
        icon = "/images/my/icon_default_user.png"
      }
      if (userName.length == 0) {
        userName = "无名"
      }

      var contex = wx.createCanvasContext('firstCanvas') 

      
      this.setData({
        token: token,
        userIcon: icon,
        userName: userName
      })
    }else{
      this.setData({
        token: token,
        userIcon: "/images/my/icon_default_user.png",
        userName: "登录/注册"
      })
    }
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