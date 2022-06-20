const router = require('./node_modules/koa-router')()

const QRPost = require('./routers/QRPost')
router.use(QRPost)

const ConfigGet = require('./routers/configGet')
router.use(ConfigGet)

const ConfigsGet = require('./routers/configsGet')
router.use(ConfigsGet)

const configUpdate = require('./routers/configUpdate')
router.use(configUpdate)

const configDel = require('./routers/configDel')
router.use(configDel)

const configNew = require('./routers/configNew')
router.use(configNew)

const codeGen = require('./routers/codeGen')
router.use(codeGen)

const peopStateGet = require('./routers/peopStateGet')
router.use(peopStateGet)

const codesGet = require('./routers/codesGet')
router.use(codesGet)
// const test=require('./routers/a')
// router.use(test)

module.exports = router.routes()