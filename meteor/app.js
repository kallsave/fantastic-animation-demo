const path = require('path')
const Koa = require('koa2')
const static = require('koa-static')
const nunjucks = require('koa-nunjucks-2')

const indexRouter = require('./router/index')

const app = new Koa()

app.use(static(path.resolve(__dirname, 'public'), {
  maxage: 0,
}))

app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    // 从块/标签自动删除尾随换行符
    trimBlocks: true
  }
}))

app.use(indexRouter.routes(), indexRouter.allowedMethods())

module.exports = app
