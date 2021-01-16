const {
  User
} = require('../../model/user')
module.exports = async (req, res) => {
  req.app.locals.currentLink = 'user' // 标识 当前是文章的页面
  let page = req.query.page || 1 // 当前页数
  let pageSize = 10; // 每10条数据一页
  let sum = await User.countDocuments({}) // 数据总数
  let total = Math.ceil(sum / pageSize) // 总页数
  // res.send(sumPage.toString())
  // return;
  // let sum = Math.ceil(sum / pageSize)
  let start = (page - 1) * pageSize
  const users = await User.find().limit(pageSize).skip(start) // 查询数据
  res.render('admin/user', { // 渲染用户列表
    users: users,
    page: page,
    total: total,
    sum: sum,
  }, )
}