<template>
    <div class="background">
      <!-- 文章标题和内容 -->
      <div class="topic">
        <div class="topic_title">
          <loading v-show="isShowLoading"></loading>
          {{topic.title}}
        </div>
        <div class="topic_content" v-html="topic.content"></div>
      </div>
      <div class="division">{{topic.reply_count}} 回复</div>
      <!-- 文章回复 -->
      <div class="reply" v-for="(item, index) in topic.replies" :key="index" ref="replys">
        <div class="reply_title">
          <div class="avatar">
            <router-link :to="{path: `/user/${item.author.loginname}`}">
              <img :src="item.author.avatar_url" alt="" width="30px" height="30px">
            </router-link>
          </div>
          <div class="username">{{item.author.loginname}}</div>
          <div class="reply_time">{{index + 1}}楼·{{item.create_at | getTime}}</div>
          <div class="author" v-if="item.author.loginname == topic.author.loginname">作者</div>
          <div class="blank"></div>
          <div class="likes">
            <span class="iconfont icon-zan"></span>
            {{item.ups.length}}
          </div>
        </div>
        <div class="reply_content" v-html="item.content"></div>
      </div>
      <scroll-to-top></scroll-to-top>
    </div>
</template>

<script>
import timeago from '@/utils/timeago'
import Loading from '@/components/Loading'
import ScrollToTop from '@/components/ScrollToTop'
import { getTopicContent } from '@/request/api'

export default {
  components: {
    Loading,
    ScrollToTop
  },
  data () {
    return {
      topic: {}
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
    }
  },
  async mounted () {
    this.$store.commit('setLoading', {
      switch: true
    })
    const res = await getTopicContent(this.$route.params.id)
    this.topic = res.data
    this.$store.commit('setLoading', {
      switch: false
    })
  },
  filters: {
    getTime (time) {
      return timeago(time)
    }
  },
  watch: {
    // 监听路由变化
    async '$route' () {
      this.topics = {}
      this.$store.commit('setLoading', {
        switch: true
      })
      const res = await getTopicContent(this.$route.params.id)
      this.topic = res.data
      this.$store.commit('setLoading', {
        switch: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.normalize {
  margin: 0;
}

.background {
  background: #e1e1e1;
  padding-top: 15px;
}

.topic {
  margin: 0 5px;

  .topic_title {
    background: #fff;
    font-size: 20px;
    padding: 10px;
    border-radius: 3px 3px 0 0;
  }

  .topic_content {
    background: #fff;
    padding: 10px;
    border-top: 1px solid #e5e5e5;
    border-radius: 3px 3px 0 0;

    & /deep/ img {
      max-width: 100%;
    }

    & /deep/ a {
      color: #08c;
      text-decoration: none;
      word-break:break-all;
    }
  }
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

  .reply_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;

    .reply_time {
      font-size: 11px;
      color: #08c;
    }

    .author {
      color: #fff;
      background: #6ba44e;
      padding: 2px;
      font-size: 12px;
    }

    .blank {
      flex: 1;
    }

    .avatar img {
      border-radius: 10%;
    }
  }

  .reply_title > * {
    margin: 0 8px;
  }

  .reply_content {
    padding: 10px;

    & /deep/ img {
      max-width: 100%;
    }

    & /deep/ a {
      color: #08c;
      text-decoration: none;
      word-break:break-all;
    }

    & /deep/ code {
      word-break:break-all;
    }
  }

  & /deep/ * {
    margin: 0;
  }
}
</style>
