<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" ref="tab">
    <div class="tab">
      <router-link :to="{path: 'index', query: {tab: 'all'}}" :class="{active: tabNow === 'all'}">全部</router-link>
      <router-link :to="{path: 'index', query: {tab: 'good'}}" :class="{active: tabNow === 'good'}">精华</router-link>
      <router-link :to="{path: 'index', query: {tab: 'share'}}" :class="{active: tabNow === 'share'}">分享</router-link>
      <router-link :to="{path: 'index', query: {tab: 'ask'}}" :class="{active: tabNow === 'ask'}">问答</router-link>
      <router-link :to="{path: 'index', query: {tab: 'job'}}" :class="{active: tabNow === 'job'}">招聘</router-link>
      <router-link :to="{path: 'index', query: {tab: 'dev'}}" :class="{active: tabNow === 'dev'}">客户端测试</router-link>
    </div>
    <topic v-for="(item, index) in topics" :key="index" :topic="topics[index]"></topic>
    <scroll-to-top></scroll-to-top>
  </div>
</template>

<script>
import Topic from '@/components/Topic'
import ScrollToTop from '@/components/ScrollToTop'
import { getTopics } from '@/request/api'

export default {
  components: {
    Topic,
    ScrollToTop
  },
  data () {
    return {
      topics: [],
      busy: true,
      page: 1
    }
  },
  computed: {
    tabNow () {
      return this.$route.query.tab || 'all'
    }
  },
  methods: {
    scrollToTop () {
      this.$refs.tab.parentNode.scrollTop = 0
    },
    async loadMore () {
      console.log('loaddddddddddddddddd moreeeeeeeeeee')
      this.busy = true
      const res = await getTopics({
        tab: this.$route.query.tab || 'all',
        page: this.page
      })
      this.topics.push(...res.data)
      this.page++
      this.busy = false
    }
  },
  watch: {
    // 监听路由变化，获取不同类型文章列表
    async '$route' () {
      if (this.$route.path === '/index') {
        this.page = 1
        const res = await getTopics({
          tab: this.$route.query.tab || 'all',
          page: this.page
        })
        this.topics = res.data
        this.page++
        this.scrollToTop()
      }
    }
  },
  activated () {
    this.busy = false
  },
  deactivated () {
    this.busy = true
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
