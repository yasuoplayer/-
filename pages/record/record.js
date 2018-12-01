
Page({
  data: {
    record:[],
    showRecord:[],
    key:'',
    msg:"毛也没有~"
  },
  onLoad()
  {
    wx.showLoading({
      title: '加载中',
    })
    this.getRecord();
    this.changeShow();
    wx.hideLoading()
  },
  
  selectOrder(e)
  {
    const number = e.currentTarget.dataset.number;
    const index = e.currentTarget.dataset.index;
    wx.reLaunch({
      url: `../search/search?number=${number}&&index=${index}`
    })
  },

  delete(e)
  {
    const number = e.currentTarget.dataset.number;
    
    let index;
    var list = this.data.record;
    for(var n=0;n<list.length;n++)
    {
      if(list[n].orderNumber==number)
      {
        index = n;
      }
    }
    if(index>-1)
    {
      list.splice(index,1)
    }
    this.setData({
      record:list
    })
    var list = this.data.showRecord;
    for (var n = 0; n < list.length; n++) {
      if (list[n].orderNumber == number) {
        index = n;
      }
    }
    if (index > -1) {
      list.splice(index, 1)
    }
    this.setData({
      showRecord: list
    })


  },

  inputKey(e)
  {
    this.setData({
      key:e.detail.value
    })
    this.changeShow()
  },

  changeShow()
  {
    const key = this.data.key;
    const record = this.data.record;
    let showRecord = [];
    for (var n = record.length-1;n>-1;n--)
    {
      if (record[n].orderNumber.indexOf(key)>-1)
      {
        showRecord.push(record[n])
      }
    }
    if (!showRecord.length)
    {
      this.setData({
        msg:'毛也没有~'
      })
    }
    this.setData({
      showRecord
    })
  },



  saveRecord() {
    if (this.data.record) {
      const recordList = this.data.record
      const record = JSON.stringify(recordList)
      wx.setStorageSync('record', record)
    }
  },

  

  getRecord() {
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
  onReady: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.getRecord();
    this.changeShow();
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.getRecord();
    this.changeShow();
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.saveRecord()
  },
    onUnload: function () {
    this.saveRecord()
  },
})
