const router = require('../node_modules/koa-router')()
const getDB = require('../mongoDB')
const {
    ObjectId
} = require('mongodb')

router.get('/configGet', async (ctx, next) => {
    let q = {
        _id: ObjectId(ctx.request.query.configid)
    }
    let config = await getDB.find('configs', q);
    if (config) {
        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: { config }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '配置不存在',
            data: null
        }
    }
})

module.exports = router.routes();