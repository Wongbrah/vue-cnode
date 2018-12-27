<template>
  <div ref='page' class="background">
    <!-- 个人信息 -->
    <div class="panel">
      <div class="header">
        <router-link :to="{path: '/index'}">主页</router-link><span> /</span>
      </div>
      <div class="info">
        <img :src="user.avatar_url" alt="" width="45" height="45">
        <a>{{user.loginname}}</a>
        <p>{{user.score}} 积分</p>
        <a :href="github">@{{user.githubUsername}}</a>
        <p>注册时间为 {{user.create_at | getTime}}</p>
      </div>
    </div>
    <!-- 最近创建的话题 -->
    <div class="panel">
      <div class="header">最近创建的话题</div>
      <div class="list">
        <topic v-for="(item, index) in user.recent_topics" :key="index" :topic="user.recent_topics[index]"></topic>
      </div>
      <div class="info" v-show="!user.recent_topics.length">无</div>
    </div>
    <!-- 最近参与的话题 -->
    <div class="panel">
      <div class="header">最近参与的话题</div>
      <div class="list">
        <topic v-for="(item, index) in user.recent_replies" :key="index" :topic="user.recent_replies[index]"></topic>
      </div>
      <div class="info" v-show="!user.recent_replies.length">无</div>
    </div>
    <scroll-to-top></scroll-to-top>
  </div>
</template>

<script>
import timeago from '@/utils/timeago'
import Topic from '@/components/Topic'
import ScrollToTop from '@/components/ScrollToTop'
import { getUserInfo } from '@/request/api'

export default {
  components: {
    Topic,
    ScrollToTop
  },
  data () {
    return {
      user: {
        recent_topics: [],
        recent_replies: []
      }
    }
  },
  methods: {
    scrollToTop () {
      this.$refs.page.parentNode.scrollTop = 0
    }
  },
  async mounted () {
    const res = await getUserInfo(this.$route.params.loginname)
    this.user = res.data
  },
  computed: {
    github () {
      return 'https://github.com/' + this.user.githubUsername
    }
  },
  watch: {
    async '$route' () {
      const res = await getUserInfo(this.$route.params.loginname)
      this.user = res.data
      this.scrollToTop()
    }
  },
  filters: {
    getTime (time) {
      return timeago(time)
    }
  }
}
</script>

<style lang="scss" scoped>
p, span {
  color: #778087;
}

.background {
  background: #e1e1e1;
  padding-top: 15px;
}

.panel {
  margin: 0 5px;

  .header {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;

    a {
      color: #80bd01;
      text-decoration: none;
    }
  }

  .header {
    a {
      color: #80bd01;
      text-decoration: none;
    }
  }

  .info {
    padding: 10px;
    border-top: 1px solid #e5e5e5;
    background: #fff;

    img {
      border-radius: 10%;
      margin-right: 10px;
    }
  }

  .list {
    background: #fff;
  }
}
</style>
