const router = require('koa-router')()
const getDB = require('../mongoDB')

const {
    ObjectId
} = require('mongodb')

router.post('/configDel', async (ctx, next) => {
    let q1 = {
        _id: ObjectId(ctx.request.body.configid)
    }
    let q2 = {
        configid: ctx.request.body.configid
    }
    let r1 = await getDB.deleteOne('configs', q1)
    let r2 = await getDB.deleteMany('codes', q2)
    ctx.body = {
        code: 1,
        msg: '123',
        data: { r1, r2 }
    }
})
module.exports = router.routes();