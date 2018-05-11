// pages/good-detail/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [

    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    goodsId: 1,
    goodsDefaultIcon: "",
    goodsDesc: "",
    goodsDefaultPrice: "",
    popImgUrl: "",
    popTitle: "",
    shopNum: "0",
    hideShopPopup: true,
    buyNumber: 1,
    buyNumMin: 1,
    buyNumMax: 0,
    goodsSku: [],
    propertyActive: [],
    goodsDefaultSku: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    this.getGoodsDetail(options.goodsId)
  },

  /**
 * 
 */
  getGoodsDetail: function (goodsId) {
    var that = this
    //加载商品类型
    wx.request({
      url: app.globalData.BaseUrl + 'goods/getGoodsDetail',
      data: {
        goodsId: goodsId
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

          } else {

            var propertyActive = []
            var activeArray = res.data.data.goodsDefaultSku.split(",")
            for (var index in res.data.data.goodsSku) {
              var skuContent = res.data.data.goodsSku[index].skuContent
              var isSelected = false
              for (var childIndes in skuContent) {
                if (activeArray[index] == skuContent[childIndes]) {
                  isSelected = true
                  propertyActive.push({
                    id: index,
                    activeId: childIndes
                  })
                }
              }

              if (!isSelected) {
                propertyActive.push({
                  id: index,
                  activeId: 0
                })
              }
            }
            console.log(propertyActive)

            that.setData({
              goodsId: res.data.data.id,
              imgUrls: res.data.data.goodsBanner.split(","),
              goodsDefaultIcon: res.data.data.goodsDefaultIcon,
              goodsDesc: res.data.data.goodsDesc,
              goodsDefaultPrice: res.data.data.goodsDefaultPrice,
              goodsDefaultSku: res.data.data.goodsDefaultSku,
              popTitle: res.data.data.goodsDesc.length > 20 ? res.data.data.goodsDesc.substr(0, 20) : res.data.data.goodsDesc,
              popImgUrl: res.data.data.goodsBanner.split(",")[0],
              buyNumMax: res.data.data.goodsSalesCount,
              goodsSku: res.data.data.goodsSku,
              propertyActive: propertyActive
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

  /**
   * 规格选择弹出框隐藏
   */
  closePopupTap: function () {

    var goodsDefaultSku = ""
    var propertyActive = this.data.propertyActive
    var goodsSku = this.data.goodsSku
    for (var index in propertyActive) {
      goodsDefaultSku = goodsDefaultSku + goodsSku[index].skuContent[propertyActive[index].activeId < 0 ? 0 : propertyActive[index].activeId] + ","
    }
    goodsDefaultSku = goodsDefaultSku + this.data.buyNumber + "件"
    console.log(goodsDefaultSku)
    this.setData({
      hideShopPopup: true,
      goodsDefaultSku: goodsDefaultSku
    })
  },

  /**
   * 规格选择弹出框隐藏
   */
  showPopupTap: function () {
    this.setData({
      hideShopPopup: false
    })
  },

  numJianTap: function () {
    if (this.data.buyNumber > this.data.buyNumMin) {
      var currentNum = this.data.buyNumber;
      currentNum--;
      this.setData({
        buyNumber: currentNum
      })
    }
  },
  numJiaTap: function () {
    if (this.data.buyNumber < this.data.buyNumMax) {
      var currentNum = this.data.buyNumber;
      currentNum++;
      this.setData({
        buyNumber: currentNum
      })
    }
  },

  labelItemTap: function (event) {
    console.log(event)
    var propertyActive = this.data.propertyActive
    propertyActive[event.currentTarget.dataset.propertyindex].activeId = event.currentTarget.dataset.propertychildindex


    var goodsDefaultSku = ""
    var goodsSku = this.data.goodsSku
    for (var index in propertyActive) {
      goodsDefaultSku = goodsDefaultSku + goodsSku[index].skuContent[propertyActive[index].activeId < 0 ? 0 : propertyActive[index].activeId] + ","
    }
    goodsDefaultSku = goodsDefaultSku + this.data.buyNumber + "件"
    console.log(goodsDefaultSku)
    this.setData({
      goodsDefaultSku: goodsDefaultSku,
      propertyActive: propertyActive
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
    var cartSize = wx.getStorageSync(app.globalData.cartSize)
    console.log(cartSize)
    this.setData({
      shopNum: cartSize.length == 0 ? "0" : cartSize
    })
  },

  /**
   * 加入购物车
   */
  addShopCar: function (event) {

    //判断是否登录
    var token = wx.getStorageSync(app.globalData.token)
    if (token.length > 0) {
      this.addCart()
    } else {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
  },

  addCart: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })

    var goodsDefaultSku = ""
    var propertyActive = this.data.propertyActive
    var goodsSku = this.data.goodsSku
    for (var index in propertyActive) {
      goodsDefaultSku = goodsDefaultSku + goodsSku[index].skuContent[propertyActive[index].activeId < 0 ? 0 : propertyActive[index].activeId]
      if (index < propertyActive.length - 1) {
        goodsDefaultSku = goodsDefaultSku + ","
      }
    }

    wx.request({
      url: app.globalData.BaseUrl + 'cart/add',
      data: {
        goodsCount: that.data.buyNumber,
        goodsIcon: that.data.goodsDefaultIcon,
        goodsDesc: that.data.goodsDesc,
        goodsId: that.data.goodsId,
        goodsPrice: that.data.goodsDefaultPrice,
        goodsSku: goodsDefaultSku
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
          wx.setStorageSync(app.globalData.cartSize, res.data.data)

          that.setData({
            shopNum: res.data.data,
            hideShopPopup: true
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
 * 跳转到购物车页面
 */
  goShopCar:function(){
    wx.switchTab({
      url: '/pages/cart/index',
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