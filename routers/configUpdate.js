const router = require('koa-router')()
const getDB = require('../mongoDB')

const {
    ObjectId
} = require('mongodb')

router.post('/configUpdate', async (ctx, next) => {
    let q = {
        _id: ObjectId(ctx.request.body.configid)
    }
    let update = ctx.request.body.update
    //判断配置是否存在
    let r = await getDB.updateOne('configs', q, { $set: update })
    ctx.body = {
        code: 1,
        msg: '123',
        data: r
    }
})
module.exports = router.routes();