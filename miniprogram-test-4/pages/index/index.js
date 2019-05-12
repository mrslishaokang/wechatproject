//index.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    confirm:'',
    Code: '',
    success: false,
    state: ''
  },
  /**
    * 获取验证码
    */

  handleInputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  handleVerificationCode: function (e) {
    this.setData({
      Code: e.detail.value
    })
  },
  doGetCode: function () {
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })
    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    // var phone = that.data.phone;
    // var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    // var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
        if (phone == '') {
          wx.showToast({
            title: '手机号不能为空',
            icon: 'none',
            duration: 1000
          })
          var interval = setInterval(function () {
            currentTime--; //每执行一次让倒计时秒数减一
            that.setData({
              text: currentTime + 's',
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                text: '重新发送',
                currentTime: 61,
                disabled: false,
                color: '#FFFFFF'
              })
            }
          }, 100);
          return false;
        } 
        
        else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
          wx.showToast({
            title: '请输入正确的手机号',
            icon: 'none',
            duration: 1000
          })
          var interval = setInterval(function () {
            currentTime--; //每执行一次让倒计时秒数减一
            that.setData({
              text: currentTime + 's',
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                text: '重新发送',
                currentTime: 61,
                disabled: false,
                color: '#FFFFFF'
              })
            }
          }, 100);
          return false;
        } 
        else {
          wx.request({
            url: 'http://172.20.10.4:8080/start/sendcode', //填写发送验证码接口
            method: "POST",
            data: {
              phonenumber: that.data.phone,
              location:1
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
              
              //当手机号正确的时候提示用户短信验证码已经发送
              wx.showToast({
                title: '短信验证码已发送',
                icon: 'none',
                duration: 2000
              });
              //设置一分钟的倒计时
              var interval = setInterval(function () {
                currentTime--; //每执行一次让倒计时秒数减一
                that.setData({
                  text: currentTime + 's',
                })
                if (currentTime <= 0) {
                  clearInterval(interval)
                  that.setData({
                    text: '重新发送',
                    currentTime: 61,
                    disabled: false,
                    color: '#FFFFFF'
                  })
                }
              }, 100);
            }
          })
        };
       
  },

  submit: function (e) {
    var that = this
    if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        image: '/3.png',
        duration: 2000
      })
      return
    } 
    else if (this.data.Code == '') {
      wx.showToast({
        title: '请输入验证码',
        image: '/3.png',
        duration: 2000
      })
      return
    } 
 
    else {
      var that = this
      var phone = that.data.phone;
      wx.request({
        url: 'http://172.20.10.4:8080/start/checkcode',
        method: "POST",
        data: {
          phonenumber: phone,
          code: this.data.Code,
          location:1
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },

        success: function (res) {
         
       if (res.data==1)
       {
       wx.showToast({
        title: '登录成功~',
        icon: 'loading',
        duration: 2000
         })  
         wx.switchTab({
           url: '../new/new',
         })     
       }
       else{  
     wx.showToast({
       title: '验证码错误',
       image: '/3.png',
       duration: 2000
     })
     return
       }
          console.log(res)
          that.setData({
            success: true
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})
