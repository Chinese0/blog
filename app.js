// 引入express框架
const express = require('express')
// 引入express-session 实现session功能
const session = require('express-session')
// 引入path
const path = require('path')
// 引入body-parser模块 用来处理post请求参数
const bodyParser = require('body-parser')
// 导入art-tempate模板引擎
const template = require('art-template');
// 导入dateformat第三方模块
const dateFormat = require('dateformat');
template.defaults.imports.dateFormat = dateFormat
// 导入config模块
const config = require('config');
// 创建App服务器
const app = express()
// 导入morgan这个第三方模块
const morgan = require('morgan')
// 数据库连接
require('./model/connect');
// 用app拦截所有请求 secret配置项 值是自定义
app.use(session({
  secret: 'secret key',
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}))
// post解析
app.use(bodyParser.urlencoded({
  extended: false
}))
// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))
if (process.env.NODE_ENV == 'development') {
  console.log('当前是开发');
  // 在开发环境中，将客户端发送的请求信息打印到控制台中
  // 端口监听
  app.listen(80)
  app.use(morgan('dev'))
} else {
  console.log('当前是生产');
  // 端口监听
  app.listen(7878)
}

// 告诉express框架模板所在位置
app.set('views', path.join(__dirname, 'views'))
// 告诉express框架模板默认后缀
app.set('view engine', 'art')
// 当渲染art模板，所用的引擎是什么
app.engine('art', require('express-art-template'))

const home = require('./route/home')
const admin = require('./route/admin')

app.use('/admin', require('./middleware/loginGuard')) // 判断登录状态
app.use('/home', home) // 以home开口
app.use('/admin', admin) // 以admin开头
app.use('/', (req, res) => {
  res.redirect('/home')
})
app.use((err, req, res, next) => { // 用next拦截错误重定向
  const result = JSON.parse(err)
  let paramArr = []
  for (let key in result) {
    if (key !== 'path') {
      paramArr.push(key + '=' + result[key])
    }
  }
  res.redirect(`${result.path}?${paramArr.join('&')}`)
})