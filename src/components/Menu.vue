<template>
  <transition name="menu">
    <div v-show="isShow" class="menu">
      <div class="avatar"></div>
      <ul>
        <li>新建主题</li>
        <li>收藏的主题</li>
        <li>用户详情</li>
        <li>我的消息</li>
      </ul>
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
  background: #e1e1e1;
  right: 0;
  z-index: 99;
}

.menu-enter, .menu-leave-active {
  transform: translateX(-100%);
  opacity: 0;
}

.menu-enter-active, .menu-leave-active {
  transition: all .5s ease;
}
</style>
