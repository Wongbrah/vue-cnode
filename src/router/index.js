import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/share'
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
