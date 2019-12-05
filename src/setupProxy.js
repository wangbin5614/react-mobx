const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/v1/apis', {
            target: 'http://api.coloan.cn/v1/apis',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/v1/apis': ''
            }
        })
    )
}