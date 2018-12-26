<template>
  <transition name="author">
    <div v-if="isShow" @click="close" class="author">
      <div @click.stop class="author-box">
        <div class="header">
          <span>关于</span>
        </div>
        <div class="author-content">
          <span>作者：<a href="https://github.com/Wongbrah">Wongbrah</a></span>
          <span>这是一个基于CNode社区<a href="https://cnodejs.org/api">API</a>打造的Vue SPA（单页应用）</span>
          <span>技术栈：vue-cli, vue-router, vuex, axios, vue-infinite-scroll</span>
          <span>在线项目展示：<a href="http://wongbrah.top/vue-cnode">http://wongbrah.top/vue-cnode</a></span>
          <span>源码：<a href="https://github.com/Wongbrah/vue-cnode">https://github.com/Wongbrah/vue-cnode</a></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    isShow () {
      return this.$store.state.isShowAuthor
    }
  },
  methods: {
    close () {
      console.log('closeAuthor')
      this.$store.commit('switchAuthor')
    }
  }
}
</script>

<style lang="scss" scoped>
.author {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 99;

  .author-box {
    display: flex;
    flex-direction: column;
    cursor: auto;
    max-width: 50%;
    width: 50%;
    max-height: 70%;

    .header {
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 3px 3px 0 0;

      span {
        line-height: 20px;
        color: #80bd01;
      }
    }

    .author-content {
      overflow-y: auto;
      background: #fff;
      border-radius: 0 0 3px 3px;

      span {
        display: inline-block;
        margin: 10px 0;
        text-align: center;
        width: 100%;
      }

      a {
        color: #08c;
        text-decoration: none;
        word-break:break-all;
      }
    }
  }
}

.author-enter-active, .author-leave-active {
  transition: opacity .5s;
}

.author-enter, .author-leave-to {
  opacity: 0;
}
</style>
