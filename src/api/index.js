import fetch from './fetch.js';

// 获取openId第一步
export const getOpenIdStep1 = data => {
    return fetch({
        method: 'post',
        url: '/account/wechart/getWechartAuthorizationUrl',
        data
    })
}

// 获取openId第二步
export const getOpenIdStep2 = data => {
    return fetch({
        method: 'post',
        url: '/account/wechart/getWechartInfo',
        data
    })
}

// 获取用户基本信息
export const getUserInfo = data => {
    return fetch({
        method: 'post',
        url: '/account/user/getUserBaseInfo',
        data
    })
}

// 获取验证码
export const getValidCode = data => {
    return fetch({
        method: 'post',
        url: '/account/index/getPhoneValidCode',
        data
    })
}

// 获取职业列表
export const getJobList = () => {
    return fetch({
        url: '/account/user/getProfessionList',
        method: 'post'
    })
}

// 注册
export const register = data => {
    return fetch({
        method: 'post',
        url: '/account/user/wechartRegister',
        data
    })
}

// 修改登录微信账号
export const modifyWx = data => {
    return fetch({
        method: 'post',
        url: '/account/user/changeWechatInfo',
        data
    })
}

// 获取首页banner列表
export const getBannerList = data => {
    return fetch({
        url: '/content/banner/querybannerapp',
        method: 'post',
        data
    })
}

