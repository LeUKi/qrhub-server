const Config = {
    dbUrl: `${process.env.DBURL||"mongodb://root:asdfgh@114.132.221.156:27017"}`,
    dbName: `${process.env.DBNAME||"qrhub"}`,
    serviceURL: `${process.env.SERVICEURL||"http://localhost"}`,
    servicePort: `${process.env.PORT||8888}`,
    truePort: '',
}
module.exports = Config;