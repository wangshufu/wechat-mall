// pages/address/address-list/index.js
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
    // this.loadAddressData()
  },

  /**
   * 获取地址列表
   */
  loadAddressData: function () {
    wx.showLoading({
      title: '加载中',
    })

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
          if (res.data.data == null){
            that.setData({
              addressData: null
            })
            return
          }
          that.setData({
            addressData: res.data.data
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
   * 点击item的checkbox
   */
  toItemCheckedTap: function (event) {
    console.log(event)
    var position = event.currentTarget.dataset.position
    var addressData = this.data.addressData
    for (var index in addressData) {
      var item = addressData[index]
      if (index == position) {
        item.shipIsDefault = 0;
      } else {
        item.shipIsDefault = 1;
      }
    }
    this.setData({
      addressData: addressData
    })

    this.settingDefault(addressData, position)
  },

  /**
   * 设置默认
   */
  settingDefault: function (addressData, position) {
    wx.showLoading({
      title: '加载中',
    })

    var that = this

    wx.request({
      url: app.globalData.BaseUrl + 'shipAddress/modify',
      method: "POST",
      data: addressData[position],
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync(app.globalData.token)
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status == -1) {

          wx.hideLoading()

          wx.showToast({
            title: res.data.message,
            icon: "none"
          })

        } else {
          that.loadAddressData()
        }
      },
      fail: function (res) {

        wx.hideLoading()

        wx.showToast({
          title: '网络不稳定',
          icon: "none"
        })
      },
      complete: function () {

      }
    })
  },

  /**
   * 编辑事件
   */
  editTap: function (event) {
    var data = this.data.addressData[event.currentTarget.dataset.position]
    wx.navigateTo({
      url: '/pages/address/address/index?id=' + data.id + "&shipAddress=" + data.shipAddress + "&shipIsDefault=" + data.shipIsDefault + "&shipUserMobile=" + data.shipUserMobile + "&shipUserName=" + data.shipUserName +"&type="+1,
    })
  },

  /**
   * 删除事件
   */
  deleteTap: function (event) {
    var id = this.data.addressData[event.currentTarget.dataset.position].id
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除改地址?',
      showCancel: true,
      cancelText: "取消",
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.delete(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 删除地址
   */
  delete: function (id) {
    wx.showLoading({
      title: '加载中',
    })

    var that = this

    wx.request({
      url: app.globalData.BaseUrl + 'shipAddress/delete',
      method: "POST",
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json', // 默认值
        'token': wx.getStorageSync(app.globalData.token)
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.status == -1) {

          wx.hideLoading()

          wx.showToast({
            title: res.data.message,
            icon: "none"
          })

        } else {
          that.loadAddressData()
        }
      },
      fail: function (res) {

        wx.hideLoading()

        wx.showToast({
          title: '网络不稳定',
          icon: "none"
        })
      },
      complete: function () {

      }
    })
  },

/**
 * 新建地址
 */
  createTap:function(event){
    wx.navigateTo({
      url: '/pages/address/address/index?type=' + 0,
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