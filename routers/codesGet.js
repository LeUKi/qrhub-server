const router = require('../node_modules/koa-router')()
const getDB = require('../mongoDB')
const {
    ObjectId
} = require('mongodb')

router.get('/codesAllGet', async (ctx, next) => {
    const agg = [
        { '$match': { 'configid': ctx.request.query.configid } },
        { '$sort': { 'no': 1 } },
        { '$project': { '_id': 0, 'configid': 0 } },
    ]
    let codes = await getDB.aggregate('codes', agg);
    if (codes) {
        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: { codes }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '配置不存在',
            data: null
        }
    }
})
router.get('/codesPageAllGet', async (ctx, next) => {
    const agg = [
        { '$match': { 'configid': ctx.request.query.configid } },
        { '$sort': { 'no': 1 } },
        { '$skip': ctx.request.query.skip },
        { '$limit': ctx.request.query.limit },
        { '$project': { '_id': 0, 'configid': 0 } },
    ]
    let codes = await getDB.aggregate('codes', agg);
    if (codes) {
        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: { codes }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '配置不存在',
            data: null
        }
    }
})
router.get('/codesFinishGet', async (ctx, next) => {
    const agg = [
        { '$match': { 'configid': ctx.request.query.configid, finish: true } },
        { '$sort': { 'time': -1 } },
        { '$project': { '_id': 0, 'configid': 0 } },
    ]
    let codes = await getDB.aggregate('codes', agg);
    if (codes) {
        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: { codes }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '配置不存在',
            data: null
        }
    }
})
router.get('/codesUnFinishGet', async (ctx, next) => {
    const agg = [
        { '$match': { 'configid': ctx.request.query.configid, finish: false } },
        { '$sort': { 'time': -1 } },
        { '$project': { '_id': 0, 'configid': 0 } },
    ]
    let codes = await getDB.aggregate('codes', agg);
    if (codes) {
        ctx.body = {
            code: 0,
            msg: '获取成功',
            data: { codes }
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