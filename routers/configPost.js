const router = require('../node_modules/koa-router')()
const getDB = require('../mongoDB')
const {
    codeGen,
    code2tips
} = require("../codeGen")
const {
    ObjectId
} = require('mongodb')

router.post('/configPost', async (ctx, next) => {
    let data = {
        configid: ctx.request.body.configid,
        new: ctx.request.body.new,
    }
    //判断配置是否存在
    let config = await getDB.find('configs', {
        _id: ObjectId(data.configid)
    });
    if (config[0]) {//存在：
        if (config[0].codeGen) {
            let codes = codeGen(config[0].rules)
            await getDB.insertMany('codes', d)

        } else {

        }

    } else {//不存在：新建

    }

    // const d = DATA.map((e, i) => {
    //     return {
    //         "code": e,
    //         "no": i + 1,
    //         "finish": false,
    //         configid,
    //         "time": null,
    //         "operator": null,
    //         "codeGen": null
    //     }
    // })
    // let s = await getDB.insertMany('codes', d)


})
module.exports = router.routes();