const { override, fixBabelImports, addDecoratorsLegacy, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
// const PrerenderSPAPlugin = require('prerender-spa-plugin');//预渲染插件
const ProgressBarPlugin = require('progress-bar-webpack-plugin');//进度条插件
const chalk = require('chalk');//添加背景颜色的插件
const path = require("path");
module.exports = override(
    fixBabelImports('import', { //按需加载antd
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addDecoratorsLegacy(),  //解决不支持decorators-legacy 不能使用@修饰器的问题
    addWebpackAlias({//配置别名
        ["~pages"]: path.resolve(__dirname, "src/pages"),
        ["~"]: path.resolve(__dirname, __dirname),
        ["~components"]: path.resolve(__dirname, "src/components"),
        ["~common"]: path.resolve(__dirname, "src/common"),
        ["~store"]: path.resolve(__dirname, "src/store"),
        ["~router"]: path.resolve(__dirname, "src/router"),
        ["~utils"]: path.resolve(__dirname, "src/utils"),
        ["~api"]: path.resolve(__dirname, "src/api")
    }),
    addWebpackPlugin(
        new ProgressBarPlugin({    //增加webpack插件：打包、运行显示进度条插件
            complete: "█",
            format: `${chalk.green('Building')} [ ${chalk.green(':bar')} ] ':msg:' ${chalk.bold('(:percent)')}`,
            clear: true
        })
    ),
    config => {
        if (process.env.NODE_ENV === 'production') {    //配置打包出来的目录名为m，还需要在package.json下配置一个homepage:'.'，这样在服务器环境下才可以根据相对路径来找资源文件；
            const paths = require('react-scripts/config/paths');
            paths.appBuild = path.join(path.dirname(paths.appBuild), 'm');
            config.output.path = path.join(path.dirname(config.output.path), 'm');

            // config.plugins = config.plugins.concat([
            //     new PrerenderSPAPlugin({
            //         routes: ['/login'],
            //         staticDir: path.join(__dirname, 'm')
            //     }),
            // ]);
        }
        return config;
    }
)