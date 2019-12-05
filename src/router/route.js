import React from 'react';
export default [
    { path: '/login', component: React.lazy(() => import('~pages/login/index')), title: '登录', requireLogin: false },
    { path: '/loginSuccess', component: React.lazy(() => import('~pages/login/loginSuccess')), title: '注册成功' },
    { path: '/registerProtocol', component: React.lazy(() => import('~pages/login/registerProtocol')), title: '注册协议', requireLogin: false },
    { path: '/modifyWx', component: React.lazy(() => import('~pages/login/modifyWx')), title: '更换登录微信账号', requireLogin: false },
    { path: '/loan', component: React.lazy(() => import('~pages/loan/loan')), title: '优质贷款', },
    { path: '/detail', component: React.lazy(() => import('~pages/loan/detail')), requireLogin: false },
    { path: '/uploadTool', component: React.lazy(() => import('~pages/other/uploadTool')), requireAuth: true }
]