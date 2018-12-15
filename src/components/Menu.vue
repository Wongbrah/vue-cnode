<template>
  <transition name="menu">
    <div v-show="isShow" class="menu">
      <div class="avatar">
        <img src="@/assets/logo.png" alt="" width="100%" height="100%">
      </div>
      <div class="menu-content">
        <div @click="commit('Login')" class="menu-item">
          <span class="iconfont icon-icon_tianjia"></span>
          新建主题
        </div>
        <div class="menu-item">
          <span class="iconfont icon-shoucang"></span>
          收藏的主题
        </div>
        <div class="menu-item">
          <span class="iconfont icon-icon_zhanghao"></span>
          用户详情
        </div>
        <div class="menu-item">
          <span class="iconfont icon-xiaoxi"></span>
          我的消息
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    isShow () {
      return this.$store.state.isShowMenu
    }
  },
  methods: {
    closeMenu () {
      console.log('onblur')
      this.$store.commit('switchMenu')
    },
    commit (event) {
      this.$store.commit('switchMenu')
      this.$store.commit(`switch${event}`)
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

    img {
      border-radius: 50%;
    }
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

      span {
        margin-right: 20px;
      }
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
