//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    navbar: ['测试', '路径'],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})