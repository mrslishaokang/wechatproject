//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    navbar: ['IT技术', '金融', '设计'],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})