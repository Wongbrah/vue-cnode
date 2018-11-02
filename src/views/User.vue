<template>
  <div class="background">
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
    <div class="panel">
      <div class="header">最近创建的话题</div>
      <div class="list">
        <topic v-for="(item, index) in user.recent_topics" :key="index" :topic="user.recent_topics[index]"></topic>
      </div>
      <div class="info" v-show="!user.recent_topics.length">无</div>
    </div>
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

const urlPrefix = 'https://cnodejs.org/api/v1'

export default {
  components: {
    Topic,
    ScrollToTop
  },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    getUserInfo (loginname) {
      this.$http.get(urlPrefix + `/user/${loginname}`)
        .then((res) => {
          if (res.data.success) {
            this.user = res.data.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getUserInfo(this.$route.params.loginname)
  },
  computed: {
    github () {
      return 'github.com/' + this.user.githubUsername
    }
  },
  filters: {
    getTime (time) {
      return timeago(time)
    }
  }
}
</script>

<style scoped>
p, span {
  color: #778087;
}

.background {
  background: #e1e1e1;
  padding-top: 15px;
}

.panel {
  margin: 0 5px;
}

.panel .header {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}

.panel .header a {
  color: #80bd01;
  text-decoration: none;
}

.panel .info {
  padding: 10px;
  border-top: 1px solid #e5e5e5;
  background: #fff;
}

.panel .info img {
  border-radius: 10%;
  margin-right: 10px;
}

.panel .list {
  background: #fff;
}
</style>
