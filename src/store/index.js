import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const urlPrefix = `https://cnodejs.org/api/v1`

const store = new Vuex.Store({
  state: {
    isShowMenu: false
  },
  mutations: {
    closeAll (state) {
      state.isShowMenu = false
    },
    switchMenu (state) {
      console.log('switchMenu')
      state.isShowMenu = !state.isShowMenu
    }
  },
  actions: {

  }
})

export default store
