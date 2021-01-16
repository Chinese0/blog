// 引入express框架
const express = require('express')
// 调用Router方法
const admin = express.Router()

admin.get('/login', require('./admin/loginPage')) // 登录页面
admin.get('/user', require('./admin/userPage')) // 用户页面
admin.get('/post', require('./admin/userPage')) // 
admin.get('/logout', require('./admin/logoutPage')) // 实现退出功能
admin.post('/login', require('./admin/login')) // 实现登录功能
admin.get('/user-edit', require('./admin/user-edit')) // 用户编辑页面
admin.get('/delete', require('./admin/user-delete')) // 用户删除功能
admin.get('/article', require('./admin/article')) // 文章列表
admin.get('/article-edit', require('./admin/article-edit')) // 文章编辑
admin.post('/user-edit', require('./admin/edit-post')) // 用户添加功能
admin.post('/user-modify', require('./admin/user-modify')) // 用户修改功能
admin.post('/article-add', require('./admin/article-add'))
// 将模板成员进行导出
module.exports = admin