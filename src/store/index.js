import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isShowMenu: false, // 是否显示侧边栏
    isShowLogin: false, // 是否显示登录框
    isShowNav: false, // 是否显示分类导航栏
    isShowLoading: false, // 是否显示加载动画
    isShowPostTopic: false, // 是否显示新建主题
    isShowCollect: false, // 是否显示用户收藏
    isShowMessage: false, // 是否显示用户消息
    isShowAuthor: false, // 是否显示关于作者
    Auth: localStorage.getItem('access_token') || false, // accessToken
    avatarURL: localStorage.getItem('avatar_url') || 'http://www.qq22.com.cn/uploads/allimg/c170120/14TW10061440-22J4.jpg', // 头像地址
    loginName: localStorage.getItem('loginname') || '游客，点击头像登录', // 用户名
    userID: localStorage.getItem('id') || '', // 用户ID
    unreadMsg: 0 // 用户未读消息数
  },
  mutations: {
    closeAll (state) {
      state.isShowMenu = false
      state.isShowLogin = false
    },
    switchMenu (state) {
      state.isShowMenu = !state.isShowMenu
    },
    switchLogin (state) {
      state.isShowLogin = !state.isShowLogin
    },
    switchNav (state) {
      state.isShowNav = !state.isShowNav
    },
    setLoading (state, payload) {
      state.isShowLoading = payload.switch
    },
    switchPostTopic (state) {
      state.isShowPostTopic = !state.isShowPostTopic
    },
    switchCollect (state) {
      state.isShowCollect = !state.isShowCollect
    },
    switchMessage (state) {
      state.isShowMessage = !state.isShowMessage
    },
    switchAuthor (state) {
      state.isShowAuthor = !state.isShowAuthor
    },
    setUnreadMsg (state, payload) {
      state.unreadMsg = payload.count
    }
  }
})

export default store
