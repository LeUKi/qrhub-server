const router = require('../node_modules/koa-router')()
const getDB = require('../mongoDB')
const {
    ObjectId
} = require('mongodb')
let key = {

}

const d=DATA.map((e,i) => {
    return {
        "code": e,
        "no": i+1,
        "finish": false,
        "configid": {
          "$oid": ObjectId("6264254cfea4f03677fdc01d")
        },
        "time": "",
        "operator": ""
    }
})

router.get('/codeGen', async (ctx, next) => {


    console.log(1);
    let s=await getDB.insertMany('codes', d)
    console.log(1);
    console.log(s);

})
module.exports = router.routes();