<template>
  <transition name="mask">
    <div v-show="isShow" @click="closeAll" class="mask"></div>
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
    closeAll () {
      console.log('onblur')
      this.$store.commit('closeAll')
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  &:hover {
    cursor: pointer;
  }
}

.mask-enter-active, .mask-leave-active {
  transition: opacity .5s;
}

.mask-enter, .mask-leave-to {
  opacity: 0;
}
</style>
