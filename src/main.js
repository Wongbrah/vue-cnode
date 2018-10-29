// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import axios from 'axios'

Vue.prototype.$http = axios

Vue.config.productionTip = false

router.afterEach((to, from, next) => {
  document.documentElement.scrollTop = document.body.scrollTop = 0
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
