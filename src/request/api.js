import { get, post } from './http'

// ============ GET 请求 =================
// 获取所有文章/指定类型文章/页数
export const getTopics = payload => get(`/topics?tab=${payload.tab}&page=${payload.page}`)

// 获取文章内容
export const getTopicContent = id => get(`/topic/${id}`)

// 获取用户信息
export const getUserInfo = loginname => get(`/user/${loginname}`)

// 用户所收藏的主题
export const getCollection = loginname => get(`/topic_collect/${loginname}`)

// 获取用户消息
export const getMessages = token => get(`/messages?accesstoken=${token}`)

// 获取用户未读消息数
export const getUnreadMessagesCount = token => get(`/message/count?accesstoken=${token}`)

// ============ POST 请求 ================
// 登录
export const login = payload => post('/accesstoken', payload)

// 新建主题
export const postTopic = payload => post('/topics', payload)
