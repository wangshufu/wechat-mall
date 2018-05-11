// pages/cart/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.loadCartData()
  },

  /**
   * 加载购物车数据
   */
  loadCartData: function () {
    wx.showNavigationBarLoading()

    var that = this

    wx.request({
      url: app.globalData.BaseUrl + 'cart/getList',
      data: {

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
          //保存购物车的数量
          if (res.data.data != null) {
            wx.setStorageSync(app.globalData.cartSize, res.data.data.length)

            wx.setTabBarBadge({
              index: 1,
              text: '' + res.data.data.length,
            })
            var data = res.data.data
            for (var index in data) {
              data[index].isSelected = false
            }
            var cartData = {
              cartListData: res.data.data,
              showFinishView: false,
              isAllSelected: false
            }

            that.cal(cartData)

          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })

            that.setData({
              cartListData: []
            })
            
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
        wx.hideNavigationBarLoading()
      }
    })
  },


  /**
   * 计算购物车的总价
   */
  cal: function (cartData) {
    console.log(cartData)
    var cartListData = cartData.cartListData
    var totalPrice = 0
    for (var index in cartListData) {
      if (cartListData[index].isSelected) {
        totalPrice = totalPrice + parseInt(cartListData[index].goodsPrice) * cartListData[index].goodsCount
      }
    }
    cartData.totalPrice = totalPrice
    this.setData({
      cartData: cartData
    })
  },

  /**
   * 单选checkbox
   */
  itemCheckboxTap: function (event) {
    console.log(event)
    var cartData = this.data.cartData
    var position = event.currentTarget.dataset.position
    cartData.cartListData[position].isSelected = !cartData.cartListData[position].isSelected

    //判断单选后,全选的状态
    var isAllSelector = true
    for (var index in cartData.cartListData) {
      if (!cartData.cartListData[index].isSelected) {
        isAllSelector = false
      }
    }
    if (!isAllSelector) {
      //说明没有全部选中
      cartData.isAllSelected = false
    } else {
      //说明全部都是选中的状态
      cartData.isAllSelected = true
    }
    this.cal(cartData)
  },

  /**
   * 是否全选
   */
  allSelectTap: function () {
    var cartData = this.data.cartData
    cartData.isAllSelected = !cartData.isAllSelected
    var cartListData = cartData.cartListData
    for (var index in cartListData) {
      cartListData[index].isSelected = cartData.isAllSelected
    }

    this.cal(cartData)
  },

  /**
   * 切换编辑页面和完成页面
   */
  onShowEditViewTap: function (event) {

    var showEdit = this.data.cartData
    showEdit.showFinishView = !showEdit.showFinishView
    console.log(showEdit.showFinishView)
    this.setData({
      cartData: showEdit
    })
  },


  /**
   * 删除或者结算
   */
  goSettleOrDeleteTap: function () {
    var showFinishView = this.data.cartData.showFinishView
    if (showFinishView) {
      //删除
      this.deleteCart()
    } else {
      //去结算
      this.settleCart()
    }
  },

  /**
   * 删除
   */
  deleteCart: function () {
    var cartListData = this.data.cartData.cartListData
    var cartIdList = []
    for (var index in cartListData) {
      var item = cartListData[index]
      if (item.isSelected) {
        cartIdList.push(item.id)
      }
    }
    console.log(cartIdList)
    if (cartIdList.length == 0) {
      wx.showToast({
        title: '请选择需要删除的数据',
        icon: "none"
      })
      return
    }

    wx.showLoading({
      title: '加载中',
    })


    var that = this
    wx.request({
      url: app.globalData.BaseUrl + 'cart/delete',
      data: {
        cartIdList: cartIdList
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
          //删除成功  重新获取购物车数据
          that.loadCartData()

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
 * 结算
 */
  settleCart: function () {
    var cartListData = this.data.cartData.cartListData
    var goodsList = []
    for (var index in cartListData) {
      var item = cartListData[index]
      if (item.isSelected) {
        goodsList.push(item)
      }
    }

    if (goodsList.length == 0) {
      wx.showToast({
        title: '请选择需要结算的数据',
        icon: "none"
      })
      return
    }

    console.log(goodsList)

    wx.showLoading({
      title: '加载中',
    })
    var that = this

    wx.request({
      url: app.globalData.BaseUrl + 'cart/submit',
      data: {
        goodsList: goodsList,
        totalPrice: that.data.cartData.totalPrice
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
          //删除成功  重新获取购物车数据
          that.loadCartData()

          //去下单
          wx.navigateTo({
            url: '/pages/order/order-confirm/index?orderId=' + res.data.data,
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
    this.loadCartData()
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