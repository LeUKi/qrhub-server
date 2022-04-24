const router = require('../node_modules/koa-router')()
const getDB = require('../mongoDB')
const {
    ObjectId
} = require('mongodb')

router.post('/qrPost', async (ctx, next) => {
    let data = {
        code: ctx.request.body.code,
        configid: ctx.request.body.configid,
    }

    console.log("/qrPost",ctx.request.body);

    //判断配置是否启用
    let config = await getDB.find('configs', {
        _id: new ObjectId(ctx.request.body.configid)
    });
    // console.log(config);
    if (config && config[0].state) {
        //查询码是否存在
        const qr = await getDB.find('codes', {
            configid: data.configid,
            code: data.code
        });
        // console.log("req",{
        //     configid: data.configid,
        //     code: data.code
        // });
        // console.log("rep",qr[0]);
        if (qr[0]) {
            //判断是否已经完成
            if (qr[0].finish) {
                ctx.body = {
                    code: 1,
                    msg: '可能的重复扫描',
                    data: qr
                }
            } else {
                //更新码的状态
                await getDB.updateOne('codes', data, {
                    $set: {
                        finish: true,
                        time: ctx.request.body.time,
                        operator: ctx.request.body.operator
                    }
                })
                //配置中数量自增
                await getDB.updateOne('configs', {
                    _id: data.configid
                }, {
                    $inc: {
                        finish: 1
                    }

                })

                ctx.body = {
                    code: 0,
                    msg: '扫描成功',
                    data: {
                        no: qr[0].no + 1,
                        finish: config[0].finish
                    }
                }
            }
        } else {
            ctx.body = {
                code: -2,
                msg: 'error',
                data: {
                    requst: {
                        code: data.code,
                        configid: data.configid,
                    },
                    qr: qr
                }
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '配置不存在或未启用',
            data: null
        }
    }
})

module.exports = router.routes();