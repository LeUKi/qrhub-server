const router = require('../node_modules/koa-router')()
const getDB = require('../mongoDB')
const {
    ObjectId
} = require('mongodb')

router.get('/peopStateGet', async (ctx, next) => {
    const agg = [
        { '$match': { 'configid': ctx.request.query.configid, 'finish': true } },
        { '$group': { '_id': '$operator', 'count': { '$sum': 1 }, 'last': { '$max': '$time' } } },
        { '$sort': { 'count': -1 } }
    ]
    let state = await getDB.aggregate('codes', agg);
    if (state) {
        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: { state }
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