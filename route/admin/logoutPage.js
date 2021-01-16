module.exports = (req, res) => {
  // 删除session
  req.session.destroy(function () {
    // 删除cookie
    res.clearCookie('connect.sid')
    console.log('我删除了！！！');
    // 重定向
    res.redirect('/admin/login')
    // return false
  })
}