const Config = {
    dbUrl: `${process.env.DBURL||"mongodb://localhost:27017/test"}`,
    dbName: `${process.env.DBNAME||"qrhub"}`,
    serviceURL: `${process.env.SERVICEURL||"http://localhost"}`,
    servicePort: `${process.env.PORT||80}`,
    truePort: '',
}
module.exports = Config;