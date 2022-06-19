const router = require('../node_modules/koa-router')()
const getDB = require('../mongoDB')
const {
    ObjectId
} = require('mongodb')

router.get('/configsGet', async (ctx, next) => {
    let configs = await getDB.find('configs', {});
    console.log(ctx.request);
    console.log(configs);
    if (configs) {
        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: { configs }
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