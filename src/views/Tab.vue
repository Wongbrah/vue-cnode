<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" ref="tab">
    <topic v-for="(item, index) in topics" :key="index" :topic="topics[index]"></topic>
    <loading v-show="isShowLoading"></loading>
    <scroll-to-top></scroll-to-top>
  </div>
</template>

<script>
import Topic from '@/components/Topic'
import ScrollToTop from '@/components/ScrollToTop'
import Loading from '@/components/Loading'
import { getTopics } from '@/request/api'

export default {
  components: {
    Topic,
    ScrollToTop,
    Loading
  },
  data () {
    return {
      topics: [],
      busy: true,
      page: 1
    }
  },
  computed: {
    isShowLoading () {
      return this.$store.state.isShowLoading
    }
  },
  methods: {
    scrollToTop () {
      this.$refs.tab.parentNode.scrollTop = 0
    },
    async loadMore () {
      console.log('loaddddddddddddddddd moreeeeeeeeeee')
      this.$store.commit('setLoading', {
        switch: true
      })
      this.busy = true
      const res = await getTopics({
        tab: this.$route.query.tab || 'all',
        page: this.page
      })
      this.topics.push(...res.data)
      this.page++
      this.$store.commit('setLoading', {
        switch: false
      })
      this.busy = false
    }
  },
  watch: {
    // 监听路由变化，获取不同类型文章列表
    async '$route' () {
      if (this.$route.path === '/index') {
        this.topics = []
        this.$store.commit('setLoading', {
          switch: true
        })
        this.page = 1
        const res = await getTopics({
          tab: this.$route.query.tab || 'all',
          page: this.page
        })
        this.topics = res.data
        this.$store.commit('setLoading', {
          switch: false
        })
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
