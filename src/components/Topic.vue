<template>
  <div class="topic">
    <!-- 头像 -->
    <div class="avatar">
      <router-link :to="{path: `/user/${topic.author.loginname}`}">
        <img :src="topic.author.avatar_url" alt="" width="40px" height="40px">
      </router-link>
    </div>
    <!-- 标签 -->
    <div class="tag" v-if="topic.tab">
      <div v-if="topic.top">置顶</div>
      <div v-else>{{topic.tab | getTabName}}</div>
    </div>
    <div class="main">
      <!-- 标题 -->
      <router-link :to="{path: `/topic/${topic.id}`}">
        <div class="title">{{topic.title}}</div>
      </router-link>
      <!-- 回复数/访问量 -->
      <div class="info" v-if="topic.reply_count">{{topic.reply_count}} / {{topic.visit_count}}</div>
    </div>
    <!-- 最后回复时间 -->
    <div class="time">{{topic.last_reply_at | getTime}}</div>
  </div>
</template>

<script>
import timeago from '@/utils/timeago'
export default {
  props: {
    topic: Object
  },
  filters: {
    getTime (time) {
      return timeago(time)
    },
    getTabName (tab) {
      let result = ''
      switch (tab) {
        case 'good':
          result = '精华'
          break
        case 'share':
          result = '分享'
          break
        case 'ask':
          result = '问答'
          break
        case 'job':
          result = '招聘'
          break
        case 'dev':
          result = '测试'
          break
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: #000;
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.topic {
  display: flex;
  border-bottom: 1px solid grey;
  align-items: center;
  justify-content: space-between;
  padding: 5px;

  .avatar {
    margin: 0 2px;

    img {
      border-radius: 10%;
    }
  }

  .tag {
    background: #80bd01;
    color: #fff;
    border-radius: 8%;
    margin: 0 2px;
    font-size: 12px;
    padding: 2px;
    width: 30px;
    text-align: center;
  }

  .main {
    font-size: 15px;
    width: 59%;
    margin: 0 2px;
    padding: 0 2px;

    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
    }

    .info {
      font-size: 10px;
    }
  }

  .time {
    font-size: 8px;
    color: #778087;
    margin: 0 2px;
    flex: 1;
    text-align: right;
  }
}
</style>
