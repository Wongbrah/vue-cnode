import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const urlPrefix = `https://cnodejs.org/api/v1`

const store = new Vuex.Store({
  state: {
    isShowMenu: false,
    isShowLogin: false
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
    }
  },
  actions: {

  }
})

export default store
