// pages/order/order-confirm/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData(options)

  },

  /**
   * 获取订单数据
   */
  loadOrderData: function (orderId) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this

    wx.request({
      url: app.globalData.BaseUrl + 'order/getOrderById',
      data: {
        orderId: orderId
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
          that.setData({
            id: res.data.data.id,
            orderGoodsList: res.data.data.orderGoodsList,
            orderStatus: res.data.data.orderStatus,
            payType: res.data.data.payType,
            totalPrice: res.data.data.totalPrice
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
   * 选择联系人
   */
  contactTap: function (event) {
    wx.navigateTo({
      url: '/pages/address/address-list/index',
    })
  },

  /**
   * 获取地址列表
   */
  loadAddressData: function () {
    var that = this
    wx.request({
      url: app.globalData.BaseUrl + 'shipAddress/getList',
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

          if (res.data.data == null) {
            that.setData({
              address: null
            })
            return
          }
          for (var index in res.data.data) {
            var item = res.data.data[index]
            if (item.shipIsDefault == 0) {
              that.setData({
                address: item
              })
            }
          }

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
   * 提交订单
   */
  submitOrderTap: function () {
    if (this.data.address == null){
      wx.showToast({
        title: "请选择您的地址",
        icon: "none"
      })
      return
    }


    wx.showLoading({
      title: '加载中',
    })
    var that = this

    var order = {
      id: parseInt(this.data.orderId),
      orderGoodsList: this.data.orderGoodsList,
      orderStatus: this.data.orderStatus,
      payType: this.data.payType,
      totalPrice: parseInt(this.data.totalPrice),
      shipAddress: this.data.address
    }

    console.log(order)

    wx.request({
      url: app.globalData.BaseUrl + 'order/submitOrder',
      data: {
        order: order
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
          wx.redirectTo({
            url: '/pages/order/index',
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadOrderData(this.data.orderId)
    this.loadAddressData()
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