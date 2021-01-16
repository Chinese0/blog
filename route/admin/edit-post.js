// 导入用户集合构造函数
const {
  User,
  validateUser
} = require('../../model/user')

// 引入bcrypt
const bcrypt = require('bcrypt')
module.exports = async (req, res, next) => {

  // location.href = '/admin/login'
  try {
    await validateUser(req.body)
  } catch (err) {
    return next(JSON.stringify({
      path: '/admin/user-edit',
      message: err.message
    }))
  }
  let user = await User.findOne({ // 根据邮箱地址查询用户是否存在
    'email': req.body.email
  })
  if (user) {
    return next(JSON.stringify({
      path: '/admin/user-edit',
      message: '邮箱已被注册'
    }))
  }
  // 加密密码并替换
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)
  req.body.password = password
  await User.create(req.body)
  res.redirect('/admin/user')
}