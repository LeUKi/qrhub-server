const router = require('../node_modules/koa-router')()
const getDB = require('../mongoDB')
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

function codeGen(rules) {
    function make(rules) {
        let result = []
        return rules.map(rule => {
            let nowDate = new Date()
            let fn = {
                static: (e) => [e.string],
                forNum: (e) => {
                    let T = []
                    let pad = function (tbl) {
                        return function (num, n) {
                            return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join(e.strinfill))) + num;
                        }
                    }([]);
                    for (let i = e.start; i <= e.end; i += e.step) T.push(pad(i, e.stringlen))
                    return T
                },
                forABC: (e) => {
                    let T = []
                    let pad = function (tbl) {
                        return function (num, n) {
                            return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join(""))) + num;
                        }
                    }([]);
                    for (let i = e.start.charCodeAt(); i <= e.end.charCodeAt(); i += 1) T.push(pad(String.fromCharCode(i), 1))
                    return T
                },
                YYYY: () => [String(nowDate.getFullYear())],
                YY: () => [String(nowDate.getFullYear()).slice(2)],
                MM: () => [nowDate.getMonth() > 9 ? String(nowDate.getMonth() + 1) : "0" + String(nowDate.getMonth() + 1)],
                DD: () => [nowDate.getDate() > 9 ? String(nowDate.getDate()) : "0" + String(nowDate.getDate())],
                HH: () => [nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
                hh: () => [nowDate.getHours() > 11 ? nowDate.getHours() - 12 > 9 ? String(nowDate.getHours() - 12) : "0" + String(nowDate.getHours() - 12) : nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
                mm: () => [nowDate.getMinutes() > 9 ? String(nowDate.getMinutes()) : "0" + String(nowDate.getMinutes())],
                ss: () => [nowDate.getSeconds() > 9 ? String(nowDate.getSeconds()) : "0" + String(nowDate.getSeconds())],

            }
            return fn[rule.type](rule)
        })
    }

    function cartesian(arr) {
        if (arr.length < 2) return arr[0] || [];
        return [].reduce.call(arr, function (col, set) {
            let res = [];
            col.forEach(c => {
                set.forEach(s => {
                    res.push(c + s);
                })
            });
            return res;
        });
    }
    // console.log(make(rules));
    return cartesian(make(rules))
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
        

    }

    const d = DATA.map((e, i) => {
        return {
            "code": e,
            "no": i + 1,
            "finish": false,
            configid,
            "time": null,
            "operator": null
        }
    })
    let s = await getDB.insertMany('codes', d)


})
module.exports = router.routes();