const router = require('../node_modules/koa-router')()
const getDB = require('../mongoDB')
const {codeGen,code2tips}=require("../codeGen")
const {
    ObjectId
} = require('mongodb')
let key = {
    rule: [{
        type: "static",
        string: "TEST"
    }, {
        type: "forNum",
        step: 1,
        start: 1,
        end: 1500,
        stringlen: 4,
        strinfill: "A"
    }]
}


router.post('/codeGen', async (ctx, next) => {
    let data={
        configid:ctx.request.body.configid,
    }
    //判断配置是否存在
    let config = await getDB.find('configs', {
        _id: ObjectId(data.configid)
    });
    if (config[0]) {
        let codes = codeGen(config[0].rules)
        

    }else{
        
    }

    // const d = DATA.map((e, i) => {
    //     return {
    //         "code": e,
    //         "no": i + 1,
    //         "finish": false,
    //         configid,
    //         "time": null,
    //         "operator": null
    //     }
    // })
    // let s = await getDB.insertMany('codes', d)


})
module.exports = router.routes();