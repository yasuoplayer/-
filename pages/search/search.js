// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    companys:[],
    company:'点击此处选择快递公司',
    companyVlue:'',
    orderNumber:'',
    list:[],
    record:[],
    index:'',
    bt:'查询',
    msg:'',
    error:false,
    isSearch:false,
  },

  inputNumber(e)
  {
    const value = e.detail.value
    this.setData({
      orderNumber:value
    })
  },

  click()
  {
    if(this.data.bt=='查询')
    {
      if (!this.data.orderNumber)
      {
        this.setData({
          error:true,
          msg:'请正确填写信息'
        })
        return
      }
      if (this.data.companyVlue && this.data.orderNumber)
      {
        this.search();
        this.setData({
          bt:'继续查询',
          error: false,
          msg: ''
        })
      }
    }
    else
    {
      this.setData({
        bt: '查询'
      })
    }
  },
  search()
  {
    const company = this.data.companyVlue;
    const orderNumber = this.data.orderNumber;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `https://v.juhe.cn/exp/index?com=${company}&&no=${orderNumber}&key=8a791f8a660db1ec2491edc2ff23ab56`,
      success:res=>{
        if (res.data.resultcode==200)
        {
          const y = new Date().getFullYear()+'-'
          const m =new Date().getMonth() + 1+'-'
          const d =''+new Date().getDate()
          const date = y+m+d
          let obj = {
            company: company,
            orderNumber: orderNumber,
            index: this.data.index,
            date,
          }
          const list = res.data.result.list.reverse()
          this.setData({
            list,
            record: this.check(obj, this.data.record),
            error:false
          }) 
        }
        else if (res.data.resultcode)
        {
          this.setData({
            msg: res.data.reason,
            error:true,
            list:[]
          })
        }
        wx.hideLoading()
      }
    })
  },
 
  check(obj,arr)
  {
    let index;
    for(var n=0;n<arr.length;n++)
    { 
      if (arr[n].orderNumber == obj.orderNumber)
      {
        index = n
      }
    }
    if(index>-1){
      arr.splice(index, 1)
    } 
    arr.push(obj)
    return arr
  },

  selectCompany(e) 
  {
    const index = e.detail.value
    this.setData({
      company: this.data.companys[index].com,
      companyVlue: this.data.companys[index].no,
      index
    })
    if (!this.data.isSearch) {
      this.setData({
        isSearch: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const list = wx.getStorageSync('companys');
    if (list) {
      const companys = JSON.parse(list)
      this.setData({
        companys
      })
      if (options.index) {
        this.setData({     
          index: options.index,
          company: companys[options.index].com,
          orderNumber: options.number,
          bt:"查询",
          companyVlue: companys[options.index].no
      })
      }
      
    }
    else {
      this.getCompanys()
    }
    this.getRecord()
    wx.hideLoading()
  },
  getCompanys()
  {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://v.juhe.cn/exp/com?key=8a791f8a660db1ec2491edc2ff23ab56',
      success: res => {
        if (res.data.resultcode == 200) {
          const list = res.data.result
          this.setData({
            companys: list
          })
          wx.setStorageSync('companys', JSON.stringify(list))
          wx.hideLoading() 
        }
      }
    })
  },

  saveRecord()
  {
    if(this.data.record)
    {
      const recordList = this.data.record
      const record = JSON.stringify(recordList)
      wx.setStorageSync('record', record)
    }
  },

  getRecord()
  {
    const record = wx.getStorageSync('record')
    if (record) {
      const recordList = JSON.parse(record)
      this.setData({
        record: recordList
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const list = wx.getStorageSync('companys');
    if (list) {
      const companys = JSON.parse(list)
      this.setData({
        companys
      })
      if (options&&options.index) {
        this.setData({
          index: options.index,
          company: companys[options.index].com,
          orderNumber: options.number,
          bt: "查询",
          companyVlue: companys[options.index].no
        })
      }

    }
    else {
      this.getCompanys()
    }
    this.getRecord()
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const list = wx.getStorageSync('companys');
    if (list) {
      const companys = JSON.parse(list)
      this.setData({
        companys
      })
      if (options&&options.index) {
        this.setData({
          index: options.index,
          company: companys[options.index].com,
          orderNumber: options.number,
          bt: "查询",
          companyVlue: companys[options.index].no
        })
      }

    }
    else {
      this.getCompanys()
    }
    this.getRecord()
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.saveRecord()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.saveRecord()
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