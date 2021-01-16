// 导入用户集合构造函数
const {
  User
} = require('../../model/user')
// 引入bcrypt加密
const bcrypt = require('bcrypt')
module.exports = async (req, res) => {
  const {
    email,
    password
  } = req.body
  if (email.trim().length <= 0 || password.trim().length <= 0) {
    res.status(400).render('admin/error', {
      msg: '邮箱地址或者密码不能为空！！！'
    })
  }
  let user = await User.findOne({
    'email': email
  })
  if (user) {
    let ifValid = await bcrypt.compare(password, user.password) // 密码判定
    if (ifValid) {
      req.session.username = user.username
      req.app.locals.userInfo = user // 在userInfo中保存用户信息 暴露给全局
      res.redirect('/admin/user')
    } else {
      res.status(400).render('admin/error', {
        msg: '邮箱地址或者密码错误！'
      })
    }
  } else {
    res.status(400).render('admin/error', {
      msg: '邮箱地址或者密码错误！'
    })
  }

}