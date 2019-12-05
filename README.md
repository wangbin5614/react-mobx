 1.匹配不上路由的处理 可设置notfound路由，找不到路由就跳转到此处 
 2.long类型的数据精度丢失的问题
 3.对于state里的值取反  this.setState(preS => ({;className={style.login_option}
 4.create-react-app自配置了css 模块化 ，只需要定义css文件名为*.module.scss即可，已自动引入了scss
【注】：
1>同时引入多个classname =>  className={`clearfix ${'icon-font'} ${styles['icon-wenhao']}`}
2>如果classname为中划线拼接的，例如my-btn my-list这种 就需要写成 className={`${style['my-btn']} ${style['my-list']}`}

5.ref的用法
1> ref={el => this.ptr = el} => this.ptr
2> ref='ptr' => this.refs.ptr
【注】获取组件挂载后真正的dom节点：
import ReactDOM from 'react-dom';
ReactDOM.findDOMNode(this.ptr)

6.解决ajax跨域,proxy问题 
在src的目录下新建一个setupProxy.js，然后写入
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

7.配置打包目录 => 见config-overrides.js的配置，还需要在package.json下配置一个homepage:'.'，这样放服务器环境下才可以根据相对路径来找资源文件

8.react自带了懒加载组件的方法 Suspense设置loading页，React.lazy懒加载
import React, { Suspense } from 'react';
<Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}>
    <Route component={React.lazy(() => import('~pages/notFound/index'))} />
</Suspense>

9.BrowserRouter路由设置basename='/activityWeb/m' 相当于设置了在服务器上的文件夹目录

10.withRouter =>路由组件可以直接从this.props上获取history,location,match ，但是非路由组件无法获取这些属性，所以用withRouter修饰后就可以直接获取到这些属性了，比如组件内的一些公用组件，肯定没有定义到路由中去，但是可能需要在这些组件内操作路由，此时就可以用withrouter修饰后调用；

11.toJS 可以在组件里将mobx里的数据转换成常规对象

12.
375/750 = x/75 可得到在真机375屏幕下根字体的大小x值；然后同理在750设计图上所量尺寸均除以75即可得到真实屏幕上的rem值；这样根字体和所取尺寸的rem值即行成对应关系；
75为一个自己定义换算的值 定义为75，则750设计图上所得的所有尺寸转换成rem时均除以75即可得到在375真实屏幕上的真实尺寸rem值；也可定为100，那750设计图上所得的所有尺寸转换成rem时均除以100即可得到在375真实屏幕上的真实尺寸rem值

