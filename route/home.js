// 引入express框架
const express = require('express')
// 调用Router方法
const home = express.Router()

home.get('/', (req, res) => {
  res.send('哈哈，我是首页')
})
module.exports = home