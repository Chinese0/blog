const {
  User
} = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async (req, res, next) => {
  const {
    username,
    email,
    role,
    state,
    password
  } = req.body
  const id = req.query.id
  const user = await User.findOne({
    _id: id
  })
  let isValid = await bcrypt.compare(password, user.password) // 新旧密码进行比对
  if (isValid) {
    await User.updateOne({
      _id: id
    }, {
      username,
      email,
      role,
      state
    })
    res.redirect('/admin/user')
  } else {
    let param = {
      path: '/admin/user-edit',
      message: '密码比对失败,请输入正确密码！',
      id: id
    }
    next(JSON.stringify(param))

  }
  // res.send(req.body)
}