const router = require('koa-router')()
const getDB = require('../mongoDB')

const {
    ObjectId
} = require('mongodb')

router.post('/configNew', async (ctx, next) => {
    let d = {
        ...ctx.request.body,
        finish: 0,
        isGen: false
    }
    console.log(ctx.request.body);

    let r = await getDB.insertOne('configs', d)
    ctx.body = {
        code: 1,
        msg: '123',
        data: r
    }
})
module.exports = router.routes();