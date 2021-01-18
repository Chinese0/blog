// 引入express框架
const express = require('express')
// 调用Router方法
const home = express.Router()

home.get('/', require('./home/index'))
home.get('/default', require('./home/index'))
// 博客前台文章详情展示页面
home.get('/article', require('./home/article'));

// 创建评论功能路由
home.post('/comment', require('./home/comment'));
module.exports = home