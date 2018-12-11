import { get } from './http'

// 获取所有文章/指定类型文章
export const getTopics = tab => get(`/topics?tab=${tab}`)

// 获取文章内容
export const getTopicContent = id => get(`/topic/${id}`)

// 获取用户信息
export const getUserInfo = loginname => get(`/user/${loginname}`)