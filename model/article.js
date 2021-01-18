// 创建用户集合
const mongoose = require('mongoose')
// 创建集合规则
const articleSchema = new mongoose.Schema({ // schema 是构造函数
  title: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: [true, '请填写文章标题'], // 这是插入之前数据库的一个判断
    unique: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // 和用户数据做关联
    ref: 'User',
    required: [true, '请填写作者']
  },
  publishDate: {
    type: String,
    default: '呵呵',
  },
  cover: {
    type: String,
    default: null,
  },
  // 0 启用状态  1 禁止状态
  content: {
    type: String,
  }

})
// 创建集合
const Article = mongoose.model('article', articleSchema)
// 将用户集合作为模块成员进行导出
module.exports = {
  Article
}