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
                    for (let i = e.start; i <= e.end; i += e.step) T.push(pad(i, e.stringlen) + "")
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
    return cartesian(make(rules))
}

function code2tips(e) {
    let fn0 = {
        static: (e) => [e.string],
        forNum: (e) => {
            let pad = function (tbl) {
                return function (num, n) {
                    return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join(e.strinfill))) + num;
                }
            }([]);
            return ["【" + pad(e.start, e.stringlen) + "~" + pad(e.end, e.stringlen) + "】"]
        },
        forABC: (e) => ["【" + e.start + "~" + e.end + "】"],
        YYYY: () => [String(nowDate.getFullYear())],
        YY: () => [String(nowDate.getFullYear()).slice(2)],
        MM: () => [nowDate.getMonth() > 9 ? String(nowDate.getMonth() + 1) : "0" + String(nowDate.getMonth() + 1)],
        DD: () => [nowDate.getDate() > 9 ? String(nowDate.getDate()) : "0" + String(nowDate.getDate())],
        HH: () => [nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
        hh: () => [nowDate.getHours() > 11 ? nowDate.getHours() - 12 > 9 ? String(nowDate.getHours() - 12) : "0" + String(nowDate.getHours() - 12) : nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
        mm: () => [nowDate.getMinutes() > 9 ? String(nowDate.getMinutes()) : "0" + String(nowDate.getMinutes())],
        ss: () => [nowDate.getSeconds() > 9 ? String(nowDate.getSeconds()) : "0" + String(nowDate.getSeconds())],
    }
    let fn1 = {
        static: (e) => [e.string],
        forNum: (e) => {
            let pad = function (tbl) {
                return function (num, n) {
                    return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join(e.strinfill))) + num;
                }
            }([]);
            return [pad(e.start, e.stringlen) + ""]
        },
        forABC: (e) => [e.start],
        YYYY: () => [String(nowDate.getFullYear())],
        YY: () => [String(nowDate.getFullYear()).slice(2)],
        MM: () => [nowDate.getMonth() > 9 ? String(nowDate.getMonth() + 1) : "0" + String(nowDate.getMonth() + 1)],
        DD: () => [nowDate.getDate() > 9 ? String(nowDate.getDate()) : "0" + String(nowDate.getDate())],
        HH: () => [nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
        hh: () => [nowDate.getHours() > 11 ? nowDate.getHours() - 12 > 9 ? String(nowDate.getHours() - 12) : "0" + String(nowDate.getHours() - 12) : nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
        mm: () => [nowDate.getMinutes() > 9 ? String(nowDate.getMinutes()) : "0" + String(nowDate.getMinutes())],
        ss: () => [nowDate.getSeconds() > 9 ? String(nowDate.getSeconds()) : "0" + String(nowDate.getSeconds())],
    }
    let fn2 = {
        static: (e) => [e.string],
        forNum: (e) => {
            let pad = function (tbl) {
                return function (num, n) {
                    return (0 >= (n = n - num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n + 1).join(e.strinfill))) + num;
                }
            }([]);
            return [pad(e.end, e.stringlen) + ""]
        },
        forABC: (e) => [e.end],
        YYYY: () => [String(nowDate.getFullYear())],
        YY: () => [String(nowDate.getFullYear()).slice(2)],
        MM: () => [nowDate.getMonth() > 9 ? String(nowDate.getMonth() + 1) : "0" + String(nowDate.getMonth() + 1)],
        DD: () => [nowDate.getDate() > 9 ? String(nowDate.getDate()) : "0" + String(nowDate.getDate())],
        HH: () => [nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
        hh: () => [nowDate.getHours() > 11 ? nowDate.getHours() - 12 > 9 ? String(nowDate.getHours() - 12) : "0" + String(nowDate.getHours() - 12) : nowDate.getHours() > 9 ? String(nowDate.getHours()) : "0" + String(nowDate.getHours())],
        mm: () => [nowDate.getMinutes() > 9 ? String(nowDate.getMinutes()) : "0" + String(nowDate.getMinutes())],
        ss: () => [nowDate.getSeconds() > 9 ? String(nowDate.getSeconds()) : "0" + String(nowDate.getSeconds())],
    }
    return [
        e.map(o => fn0[o.type](o)[0]),
        e.map(o => fn1[o.type](o)[0]),
        e.map(o => fn2[o.type](o)[0]),
    ]
}

module.exports = {
    codeGen,
    code2tips
}