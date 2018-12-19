import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isShowMenu: false, // 是否显示侧边栏
    isShowLogin: false, // 是否显示登录框
    isShowNav: false // 是否显示分类导航栏
  },
  mutations: {
    closeAll (state) {
      state.isShowMenu = false
      state.isShowLogin = false
    },
    switchMenu (state) {
      console.log('switchMenu')
      state.isShowMenu = !state.isShowMenu
    },
    switchLogin (state) {
      console.log('switchLogin')
      state.isShowLogin = !state.isShowLogin
    },
    switchNav (state) {
      console.log('switchNav')
      state.isShowNav = !state.isShowNav
    }
  }
})

export default store
