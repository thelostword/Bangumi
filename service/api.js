import request from './request.js'
const get = 'GET'
const post = 'POST'

/* 项目API目录 */
export const timeline = (hasToken, data) => request(get, 'timeline', data, hasToken)             // 时间胶囊
export const rakuen = data => request(get, 'rakuen/topiclist', data, true)                       // 超展开
export const login = data => request(post, 'login', data)                                        // 登录
export const captcha = () => request(get, 'captcha')                                             // 图片验证码
export const user = () => request(get, 'user', null, true)                                                   // 用户信息
export const collection = data => request(get, 'collection', data, true)                         // 收藏
export const update = data => request(get, 'update', data)                                       // 版本更新
