const guard = (req, res, next) => { // 拦截请求，判断用户登录状态
  if (req.url !== '/login' && !req.session.username) {
    res.redirect('/admin/login')
  } else {
    next(); // 放行
  }
}
module.exports = guard // guard 守卫