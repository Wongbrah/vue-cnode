import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  //
  // 基础路径，打包时取消注释
  // base: '/vue-cnode/',
  routes: [
    {
      path: '/index',
      component: (resolve) => require(['@/views/Tab'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/topic/:id',
      component: (resolve) => require(['@/views/Topic'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/user/:loginname',
      component: (resolve) => require(['@/views/User'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/ask'
    },
    {
      path: '/job'
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
