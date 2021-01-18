const {
  Article
} = require('../../model/article')
const pagination = require('mongoose-sex-page')
module.exports = async (req, res) => {
  // 接受客户端传来的页码
  const page = req.query.page;
  // 标识 标识当前访问的是文章页面
  req.app.locals.currentLink = 'article'
  // 查询所有
  let articles = await pagination(Article).find().page(page).size(10).display(3).populate('author').exec() // 查询作者
  articles = JSON.parse(JSON.stringify(articles));
  // res.send(articles)
  res.render('admin/article.art', {
    articles: articles
  })
}