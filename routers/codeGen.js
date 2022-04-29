const router = require('../node_modules/koa-router')()
const getDB = require('../mongoDB')
const {
    codeGen
} = require("../util/codeGenerator")
const {
    ObjectId
} = require('mongodb')

router.post('/codeGen', async (ctx, next) => {
    let data = {
        configid: ctx.request.body.configid,
    }
    //判断配置是否存在
    let config = await getDB.find('configs', {
        _id: ObjectId(data.configid)
    });
    if (config[0]) {
        //判断是否已经生成
        if (config[0].codeGen) {
            let codes = codeGen(config[0].rules)
            const d = codes.map((e, i) => {
                return {
                    "code": e,
                    "no": i + 1,
                    "finish": false,
                    "configid": data.configid,
                    "time": null,
                    "operator": null,
                }
            })
            let r = await getDB.insertMany('codes', d)
            ctx.body = {
                code: 0,
                msg: '生成成功',
                data: r
            }
        } else {
            ctx.body = {
                code: 1,
                msg: '重复的生成请求',
                data: null
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: '配置不存在',
            data: null
        }
    }
})

module.exports = router.routes();