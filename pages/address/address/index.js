// pages/address/address/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowLoading: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData(options)
  },


  saveTap: function (event) {
    if(this.data.type == 1){
      //编辑
      this.save()
    }else{
      //新建
      this.create()
    }
  },


  /**
   * 保存
   */
  save: function () {

    this.setData({
      isShowLoading: true
    })



    var that = this

    wx.request({
      url: app.globalData.BaseUrl + 'shipAddress/modify',
      method: "POST",
      data: {
        id: that.data.id,
        shipAddress: that.data.shipAddress,
        shipIsDefault: that.data.shipIsDefault,
        shipUserMobile: that.data.shipUserMobile,
        shipUserName: that.data.shipUserName
      },
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
          that.setData({
            isShowLoading: false
          })

          wx.navigateBack()
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
   * 新建
   */
  create: function () {

    this.setData({
      isShowLoading: true
    })



    var that = this

    wx.request({
      url: app.globalData.BaseUrl + 'shipAddress/add',
      method: "POST",
      data: {
        shipAddress: that.data.shipAddress,
        shipUserMobile: that.data.shipUserMobile,
        shipUserName: that.data.shipUserName
      },
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
          that.setData({
            isShowLoading: false
          })

          wx.navigateBack()
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
   * 收货人
   */
  nameInput: function (event) {
    this.setData({
      shipUserName:event.detail.value
    })
  },

  /**
 * 联系方式
 */
  phoneInput: function (event) {
    this.setData({
      shipUserMobile: event.detail.value
    })
  },

  /**
 * 地址
 */
  addressInput: function (event) {
    this.setData({
      shipAddress: event.detail.value
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