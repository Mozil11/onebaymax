// templates/components/commonlist/common-list.js
const db = wx.cloud.database();
const _ = db.command;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    }
  },
  attached () {
    this.getlike()
    this.getcommentcount()
   },
  /**
   * 组件的初始数据
   */
  data: {
    count:0,
    commentcout:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //获取评论数
  getcommentcount(){
    
    var data ={
      action:'getcommentcount',
      postid:this.properties.item.id,
    }
    wx.cloud.callFunction({
      name:'commentList',
      data:data
    }).then(res=>{
      console.log(res)
      this.setData({
        commentcout:res.result
      })
    })
  },
    getlike(){
      wx.cloud.callFunction({
        name:'likeList',
        data:{
          action:'getLikeList',
          postid:this.properties.item.id
        }
      }).then(res=>{
        this.setData({
          count:res.result.data.length
        })
      })
    },
    // 跳转至查看文章详情
  redictDetail: function (e) {
    // console.log('查看文章');
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },
  }
})
