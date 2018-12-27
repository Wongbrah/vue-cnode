<template>
  <transition name="menu">
    <div v-show="isShow" class="menu">
      <div @click="login" class="avatar">
        <img :src='avatarURL' alt="" width="100%" height="100%">
      </div>
      <div class="login-name">{{loginName}}</div>
      <div class="menu-content">
        <div @click="commit('PostTopic')" class="menu-item">
          <span class="iconfont icon-icon_tianjia"></span>
          新建主题
        </div>
        <div @click="commit('Collect')" class="menu-item">
          <span class="iconfont icon-shoucang"></span>
          收藏的主题
        </div>
        <div @click="route('/user')" class="menu-item">
          <span class="iconfont icon-icon_zhanghao"></span>
          用户详情
        </div>
        <div @click="commit('Message')" class="menu-item">
          <span class="iconfont icon-xiaoxi"></span>
          我的消息
          <span v-show="unreadMsg" class="unread-msg">{{unreadMsg}}</span>
        </div>
        <div class="line"></div>
        <div @click="author" class="menu-item">
          <span class="iconfont icon-xiaolian"></span>
          关于
        </div>
        <div v-show="isLogin" @click="logout" class="menu-item">
          <span class="iconfont icon-guanbi"></span>
          退出登录
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { getUnreadMessagesCount } from '@/request/api'

export default {
  computed: {
    isShow () {
      return this.$store.state.isShowMenu
    },
    avatarURL () {
      return this.$store.state.avatarURL
    },
    loginName () {
      return this.$store.state.loginName
    },
    isLogin () {
      return this.$store.state.Auth
    },
    unreadMsg () {
      return this.$store.state.unreadMsg
    },
    Auth () {
      return this.$store.state.Auth
    }
  },
  async mounted () {
    if (this.Auth) {
      const res = await getUnreadMessagesCount(this.Auth)
      this.$store.commit('setUnreadMsg', {
        count: res.data
      })
    }
  },
  methods: {
    closeMenu () {
      this.$store.commit('switchMenu')
    },
    commit (event) {
      if (this.Auth) {
        this.$store.commit('switchMenu')
        this.$store.commit(`switch${event}`)
      } else {
        this.$store.commit('switchMenu')
        this.$store.commit(`switchLogin`)
      }
    },
    route (to) {
      if (this.Auth) {
        this.$store.commit('switchMenu')
        this.$router.push(`${to}/${this.$store.state.loginName}`)
      } else {
        this.$store.commit('switchMenu')
        this.$store.commit(`switchLogin`)
      }
    },
    login () {
      if (this.$store.state.Auth) {
        this.$store.commit('switchMenu')
        this.$router.push(`/user/${this.$store.state.loginName}`)
      } else {
        this.$store.commit('switchMenu')
        this.$store.commit(`switchLogin`)
      }
    },
    logout () {
      localStorage.removeItem('access_token')
      localStorage.removeItem('loginname')
      localStorage.removeItem('avatar_url')
      localStorage.removeItem('id')
      location.reload()
    },
    author () {
      this.$store.commit('switchMenu')
      this.$store.commit(`switchAuthor`)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 256px;
  background: #f6f6f6;
  right: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .avatar {
    border: 3px solid #80bd01;
    height: 130px;
    width: 130px;
    border-radius: 50%;
    background: #333;
    user-select:none;
    cursor: pointer;

    img {
      border-radius: 50%;
    }
  }

  .login-name {
    margin-top: 20px;
    color: #333;
  }

  .menu-content {
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .menu-item {
      display: flex;
      align-items: center;
      padding: 13px 0;
      padding-left: 24px;
      width: 90%;
      user-select:none;
      color: #333;
      &:hover {
        cursor: pointer;
        background: #e1e1e1;
        // color: #80bd01;
      }

      .unread-msg {
        margin-left: 20px;
        color: #333;
        font-size: 10px;
        border: 1px solid #80bd01;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        text-align: center;
      }

      span {
        margin-right: 20px;
      }
    }

    .line {
      border: 1px solid #e1e1e1;
      width: 99%;
    }
  }
}

.menu-enter, .menu-leave-active {
  transform: translateX(-100%);
  opacity: 0;
}

.menu-enter-active, .menu-leave-active {
  transition: all .5s ease;
}
</style>
