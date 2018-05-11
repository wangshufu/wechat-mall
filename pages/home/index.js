// pages/home/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502876108368&di=cd9725c81901f6d7499edd76cf2e68e5&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F37%2F20%2F80Q58PICe3W_1024.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502882008108&di=d0cf4a8536aefa5df791716c1053ca66&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e9495812c7f9a84a0d304fbc135b.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502876281925&di=f33e7ef8be268e90ffbffd315f5fb0a3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F013e1b57d2731c0000018c1beeca11.jpg%40900w_1l_2o_100sh.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503471047&di=679d7a6c499f59d1b0dcd56b62a9aa6c&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.90sheji.com%2Fdianpu_cover%2F11%2F14%2F64%2F55%2F94ibannercsn_1200.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    categories: [
      
    ],
    goodList:[

    ],
    goodListIsEmpty:true,
    activeCategoryId: "1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory()
  },

/**
 * 加载商品类型
 */
  getCategory:function(){
    var that = this
    //加载商品类型
    wx.request({
      url: app.globalData.BaseUrl + 'category/getCategory',
      data: {
        parentId: 0
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
          that.setData({
            categories: res.data.data,
            activeCategoryId:res.data.data[0].id
          })

          //加载商品列表
          that.getGoodList(that.data.activeCategoryId)

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
 * 获取商品列表
 */
  getGoodList:function(id){
    console.log(id)

    var that = this
    //加载商品类型
    wx.request({
      url: app.globalData.BaseUrl + 'category/getCategory',
      data: {
        parentId: id
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

          if (res.data.data == null){
            that.setData({
              goodListIsEmpty: false
            })
          }else{
            that.setData({
              goodListIsEmpty: true,
              goodList: res.data.data
            })
          }
          

          // //加载商品列表
          // that.getGoodList(that.data.activeCategoryId)
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

  toDetailsTap:function(event){
    console.log(event)
    wx.navigateTo({
      url: '/pages/good-list/index?categoryId=' + event.currentTarget.dataset.id,
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
    if (cartSize > 0){
      wx.setTabBarBadge({
        index: 1,
        text: '' + cartSize,
      })
    }
    
  },

/**
 * 点击商品类型
 */
  tabClick: function (event) {
    this.setData({
      activeCategoryId: event.currentTarget.id
    })

    //加载商品列表
    this.getGoodList(this.data.activeCategoryId)
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