<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" ref="tab">
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
    this.$store.commit('switchNav')
    this.busy = false
  },
  deactivated () {
    this.$store.commit('switchNav')
    this.busy = true
  }
}
</script>
