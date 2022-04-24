const router = require('./node_modules/koa-router')()

const QRPost = require('./routers/QRPost')
router.use(QRPost)

const ConfigGet = require('./routers/configGet')
router.use(ConfigGet)

// const test=require('./routers/a')
// router.use(test)

module.exports = router.routes()