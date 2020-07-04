const path = require('path')
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.render('index')
})

module.exports = router
