<template>
    <div class="background">
      <!-- 文章标题和内容 -->
      <div class="topic">
        <div class="topic_title">
          <loading v-show="isShowLoading"></loading>
          {{topic.title}}
        </div>
        <div v-show="!isShowLoading" class="topic_info">
          <div class="info"> • 发布于{{topic.create_at | getTime}} • 作者 <router-link :to="{path: `/user/${topic.author.loginname}`}">{{topic.author.loginname}}</router-link> • {{topic.visit_count}}次浏览 • 来自{{topic.tab | getTabName}}</div>
          <button v-if="!isCollect" @click="collect">收藏</button>
          <button v-else @click="collect" class="de_collect">取消收藏</button>
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
          <div class="reply_time">{{index + 1}}楼•{{item.create_at | getTime}}</div>
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
import { getTopicContent, getCollection, collectTopic, deCollectTopic } from '@/request/api'

export default {
  components: {
    Loading,
    ScrollToTop
  },
  data () {
    return {
      topic: {
        author: {
          loginname: ''
        }
      },
      isCollect: false
    }
  },
  computed: {
    isShowLoading () {
      return this.$store.state.isShowLoading
    },
    Auth () {
      return this.$store.state.Auth
    },
    loginName () {
      return this.$store.state.loginName
    }
  },
  methods: {
    scrollToTop () {
      this.$refs.tab.parentNode.scrollTop = 0
    },
    async collect () {
      // 判断是否登录
      if (this.Auth) {
        // 判断是否收藏此主题
        if (this.isCollect) {
          // 已收藏，取消收藏主题
          const res = await deCollectTopic({
            accesstoken: this.Auth,
            topic_id: this.$route.params.id
          }).catch(err => {
            console.log(err)
            return false
          })
          if (res.success) {
            this.isCollect = false
          } else {
            this.isCollect = true
          }
        } else {
          // 未收藏，收藏主题
          const res2 = await collectTopic({
            accesstoken: this.Auth,
            topic_id: this.$route.params.id
          }).catch(err => {
            console.log(err)
            return false
          })
          if (res2.success) {
            this.isCollect = true
          } else {
            this.isCollect = false
          }
        }
      } else {
        this.$store.commit('setIsShowLogin', {
          switch: true
        })
      }
    },
    async checkCollect () {
      // 判定是否登录，登录就获取收藏状态，未登录就不获取
      if (this.Auth) {
        // 获取用户所收藏的主题
        const res = await getCollection(this.loginName).catch(err => {
          console.log(err)
          return false
        })
        // 判断本页面主题是否在用户收藏的主题中
        const res2 = res.data.find(i => {
          return i.id === this.$route.params.id
        })
        // console.log(res2)
        // console.log(!((typeof res2) === 'undefined'))
        // 判断结果，得出是否收藏主题
        this.isCollect = !((typeof res2) === 'undefined')
      } else {
        this.isCollect = false
      }
    }
  },
  async mounted () {
    this.$store.commit('setLoading', {
      switch: true
    })
    const res = await getTopicContent(this.$route.params.id)
    this.topic = res.data
    this.checkCollect()
    this.$store.commit('setLoading', {
      switch: false
    })
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
      this.checkCollect()
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

  .topic_info {
    background: #fff;
    font-size: 20px;
    padding: 10px;
    border-radius: 3px 3px 0 0;
    display: flex;
    justify-content: space-between;

    .info {
      font-size: 12px;
      color: #838383;

      a {
        font-size: 12px;
        color: #838383;
      }
    }

    .de_collect {
      background: #e5e5e5;
      color: #333;
      min-width: 6rem;
      &:hover {
        background: #838383;;
        color: #fff;
      }
    }

    button {
      border-radius: 3px;
      background-color: #80bd01;
      color: #fff;
      padding: 3px 10px;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 14px;
      letter-spacing: 2px;
      line-height: 2em;
      min-width: 4rem;
      max-height: 2rem;
      &:hover {
        background-color: #6ba44e;
      }
    }
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

    & /deep/ code {
      white-space: pre-wrap;
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
      white-space: pre-wrap;
    }
  }

  & /deep/ * {
    margin: 0;
  }
}
</style>
