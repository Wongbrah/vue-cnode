<template>
  <transition name="collect">
    <div v-if="isShow" @click="close" class="collect">
      <div @click.stop class="collect-box">
        <div class="header">
          <span>我收藏的主题</span>
        </div>
        <div class="collect-content">
          <span v-show="!topics.length">无</span>
          <topic @click.native='close' v-for="(item, index) in topics" :key="index" :topic="topics[index]"></topic>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Topic from '@/components/Topic'
import { getCollection } from '@/request/api'

export default {
  components: {
    Topic
  },
  data () {
    return {
      topics: []
    }
  },
  computed: {
    isShow () {
      return this.$store.state.isShowCollect
    },
    loginName () {
      return this.$store.state.loginName
    }
  },
  methods: {
    close () {
      this.$store.commit('switchCollect')
    }
  },
  async mounted () {
    const res = await getCollection(this.loginName)
    this.topics = res.data
  }
}
</script>

<style lang="scss" scoped>
.collect {
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

  .collect-box {
    display: flex;
    flex-direction: column;
    cursor: auto;
    // max-width: 50%;
    // width: 50%;
    // max-height: 70%;

    @media (max-width: 767px) {
      max-width: 300px;
      max-height: 50%;
    }

    @media (min-width: 768px) {
      max-width: 400px;
      max-height: 70%;
    }

    .header {
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 3px 3px 0 0;

      span {
        line-height: 20px;
        color: #80bd01;
      }
    }

    .collect-content {
      overflow-y: auto;
      background: #fff;
      border-radius: 0 0 3px 3px;

      span {
        display: inline-block;
        margin: 10px 0;
        text-align: center;
        width: 100%;
      }
    }
  }
}

.collect-enter-active, .collect-leave-active {
  transition: opacity .5s;
}

.collect-enter, .collect-leave-to {
  opacity: 0;
}
</style>
