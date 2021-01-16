const {
  Article
} = require('../../model/article')
module.exports = async (req, res) => {
  // 标识 标识当前访问的是文章页面
  req.app.locals.currentLink = 'article'
  // 查询所有
  let articles = await Article.find().populate('author').lean() // 查询作者
  // res.send(articles)
  res.render('admin/article.art', {
    articles: articles
  })
}