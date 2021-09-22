const path = require('path')
const px2rem = require('postcss-px2rem') // postcss的一个插件

module.exports = {
    // 只能写vue封装的配置

    // runtimeCompiler: true,
    // 关闭EsLint的规则
    lintOnSave: false,

    css: {
        // 添加postcss配置
        loaderOptions: {
            postcss: {
                plugins: [
                    px2rem({
                        remUnit: 37.5, // 设计稿等分后的rem值   375/10
                    }),
                ],
            },
        },
    },
    chainWebpack: (config) => {
        // 修复HMR
        config.resolve.symlinks(true)
    },

    configureWebpack: {
        // 内部写webpack原生配置
        resolve: {
            extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
            alias: {
                // 路径别名(简写方式)
                // 'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配   带vue编译器
                '@': path.resolve(__dirname, 'src'),
                '@components': path.resolve(__dirname, 'src/components'),
            },
        },
        devtool: '#eval-source-map ',
    },

    devServer: {
        proxy: {
            // 处理以/api开头路径的请求
            '/api': {
                target: 'https://10.1.80.80:13560', // 转发的目标地址
                pathRewrite: { '/api': '' },
                secure: false,
                changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
            },
        },
    },

    pluginOptions: {
        i18n: {
            locale: 'zh_CN',
            fallbackLocale: 'locale',
            localeDir: 'locales',
            enableInSFC: false,
        },
    },
}