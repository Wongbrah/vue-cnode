<template>
  <div class="background">
    <div class="topic">
      <div class="topic_title">{{topic.title}}</div>
      <div class="topic_content" v-html="topic.content"></div>
    </div>
    <div class="division">{{topic.reply_count}} 回复</div>
    <div class="reply" v-for="(item, index) in topic.replies" :key="index" ref="replys">
      <div class="reply_title">
        <div class="avatar">
          <router-link to="#">
            <img :src="item.author.avatar_url" alt="" width="30px" height="30px">
          </router-link>
        </div>
        <div class="username">{{item.author.loginname}}</div>
        <div class="reply_time">{{index + 1}}楼·{{item.create_at | getTime}}</div>
        <div class="author" v-if="item.author.loginname == topic.author.loginname">作者</div>
        <div class="blank"></div>
        <div class="likes">{{item.ups.length}}</div>
      </div>
      <div class="reply_content" v-html="item.content"></div>
    </div>
  </div>
</template>

<script>
import timeago from '@/utils/timeago'

const urlPrefix = 'https://cnodejs.org/api/v1'

export default {
  data () {
    return {
      topic: {}
    }
  },
  methods: {
    getTopicContent (id) {
      this.$http.get(urlPrefix + `/topic/${id}`)
        .then((res) => {
          if (res.data.success) {
            this.topic = res.data.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getTopicContent(this.$route.params.id)
  },
  filters: {
    getTime (time) {
      return timeago(time)
    }
  }
}
</script>

<style scoped>
.normalize {
  margin: 0;
}

.background {
  background: #e1e1e1;
  padding-top: 15px;
}

.topic {
  margin: 0 5px;
}

.topic .topic_title {
  background: #fff;
  font-size: 20px;
  padding: 10px;
  border-radius: 3px 3px 0 0;
}

.topic .topic_content {
  background: #fff;
  padding: 10px;
  border-top: 1px solid #e5e5e5;
  border-radius: 3px 3px 0 0;
}

.division {
  margin: 0 5px;
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}

.reply {
  margin: 0 5px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  padding: 10px 0;
}

.reply >>> * {
  margin: 0;
}

.reply >>> a {
  color: #08c;
  text-decoration: none;
}

.reply .reply_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.reply .reply_title > * {
  margin: 0 8px;
}

.reply .reply_title .reply_time {
  font-size: 11px;
  color: #08c;
}

.reply .reply_title .author {
  color: #fff;
  background: #6ba44e;
  padding: 2px;
  font-size: 12px;
}

.reply .reply_title .blank {
  flex: 1;
}

.reply .reply_title .avatar img {
  border-radius: 10%;
}

.reply .reply_content {
  padding: 10px;
}
</style>
