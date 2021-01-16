const {
  User
} = require('../../model/user')

module.exports = async (req, res) => {
  req.app.locals.currentLink = 'user' // 标识 当前是文章的页面
  const {
    message,
    id
  } = req.query
  if (id) { // 修改操作
    let user = await User.findOne({
      _id: req.query.id
    })
    res.render('admin/user-edit', {
      message,
      user,
      button: '修改',
      link: '/admin/user-modify?id=' + id
    })
  } else { // 添加操作
    res.render('admin/user-edit', {
      message,
      button: '添加',
      link: '/admin/user-edit'
    })
  }


}