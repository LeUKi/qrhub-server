const router = require('../node_modules/koa-router')()
const getDB = require('../mongoDB')
const {
    ObjectId
} = require('mongodb')

router.get('/configGet', async (ctx, next) => {
    //判断配置是否存在
    let config = await getDB.find('configs', {});
    console.log(ctx.request);
    console.log(config);
    if (config) {
        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: {configs:config}
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