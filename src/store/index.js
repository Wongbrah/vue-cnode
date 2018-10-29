import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const urlPrefix = `https://cnodejs.org/api/v1`

const store = new Vuex.Store({
  state: {
    tabNow: ''
  },
  mutations: {
    changeTab (state, tab = 'all') {
      state.tabNow = tab
    }
  },
  actions: {
    getTopics (context, tab) {
      this.$http.get(urlPrefix + `topics?tab=${tab}`)
    }
  }
})

export default store
