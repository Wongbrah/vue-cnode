<template>
  <div ref="tab">
    <div class="tab">
      <router-link :to="{path: 'index', query: {tab: 'all'}}" :class="{active: tabNow === 'all'}">全部</router-link>
      <router-link :to="{path: 'index', query: {tab: 'good'}}" :class="{active: tabNow === 'good'}">精华</router-link>
      <router-link :to="{path: 'index', query: {tab: 'share'}}" :class="{active: tabNow === 'share'}">分享</router-link>
      <router-link :to="{path: 'index', query: {tab: 'ask'}}" :class="{active: tabNow === 'ask'}">问答</router-link>
      <router-link :to="{path: 'index', query: {tab: 'job'}}" :class="{active: tabNow === 'job'}">招聘</router-link>
      <a href="">客户端测试</a>
    </div>
    <topic v-for="(item, index) in topics" :key="index" :topic="topics[index]"></topic>
    <scroll-to-top></scroll-to-top>
  </div>
</template>

<script>
import Topic from '@/components/Topic'
import ScrollToTop from '@/components/ScrollToTop'
import { getTopics } from '@/request/api'

// const urlPrefix = 'https://cnodejs.org/api/v1'

export default {
  components: {
    Topic,
    ScrollToTop
  },
  data () {
    return {
      topics: []
    }
  },
  async mounted () {
    // 获取url参数
    // this.getTopics(this.$route.query.tab)
    const res = await getTopics(this.$route.query.tab || 'all')
    this.topics = res.data
  },
  methods: {
    // 获取文章列表
    // getTopics (tab = 'all') {
    //   this.$http.get(urlPrefix + `/topics?tab=${tab}`)
    //     .then((res) => {
    //       // console.log(res.data)
    //       if (res.data.success) {
    //         this.topics = res.data.data
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    scrollToTop () {
      this.$refs.tab.parentNode.scrollTop = 0
    }
  },
  watch: {
    // 监听路由变化，获取不同类型文章列表
    async '$route' () {
      if (this.$route.path === '/index') {
        // this.getTopics(this.$route.query.tab)
        const res = await getTopics(this.$route.query.tab || 'all')
        this.topics = res.data
        this.scrollToTop()
      }
    }
  },
  computed: {
    tabNow () {
      return this.$route.query.tab || 'all'
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  background: #f6f6f6;
  text-align: center;
  padding: 5px;

  a {
    margin: 0 5px;
    text-decoration: none;
    color: #80bd01;
  }

  .active {
    background: #80bd01;
    color: #fff;
    border-radius: 10%;
    padding: 0 3px;
  }
}
</style>
