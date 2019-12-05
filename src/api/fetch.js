import Axios from 'axios';
import { toJS } from 'mobx';
import { RootStore } from '~store';
import { Toast } from 'antd-mobile';
Toast.config({ duration: 1.5 })
const normalCode = [200, 30106, 30201, 40003, 20004, 80002];
// 添加请求拦截器
const instance = Axios.create({
    baseURL: '/v1/apis/',
    timeout: 1000 * 20,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
    },
    // transformResponse: [function (data) {
    //     return jsonlint.parse(data);
    // }],
});

// http request 拦截器
instance.interceptors.request.use(
    async config => {
        //这里操作请求的数据
        let userId = toJS(RootStore.userInfo).id
        let obj = userId ? { userId } : {};
        if (config.params || config.method.toLowerCase() === 'get') {
            config.params = Object.assign(obj, config.data || {}, config.params || {});
            delete config['data'];
        }
        if (config.method.toLowerCase() === 'post' && userId) {
            if (!config.data) {
                config.data = userId;
            } else if (typeof config.data == 'object') {
                config.data = Object.assign(obj, config.data || {})
            }
        }
        return config;
    },
    err => {
        alert('请求失败' + err.message);
        return Promise.reject(err);
    }
);

// http response 拦截器
instance.interceptors.response.use(
    response => {
        //这里操作后端返回的数据
        if (normalCode.includes(response.data.code)) {
            return response.data;
        } else {
            Toast.offline(response.data.msg, 1, null, false)
            return 0;
        }
    },
    err => {
        if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
            return { code: -1, message: '响应超时' };
        }
        return Promise.reject(err)
    }
);

// 请求处理
export default instance;
