const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 8081,
        proxy: {
            'api': {
                target: 'http://localhost:80',
                pathRewrite: {'^/api': ''},
                changeOrigin: true
            },
            'socket': {
                target: 'ws://localhost:80',
                pathRewrite: {'^/socket': ''},
                ws: true,
                changeOrigin: true
            }
        }
    }
})
