<template>
  <transition name="msg">
    <div v-if="isShow" @click="close" class="msg">
      <div @click.stop class="msg-box">
        <div class="header">
          <span>未读消息</span>
        </div>
        <div class="msg-content">
          <span v-show="!unreadMsg.length">无</span>
          <topic @click.native='close' v-for="(item, index) in unreadMsg" :key="index" :topic="unreadMsg[index]"></topic>
        </div>
        <div class="header">
          <span>已读消息</span>
        </div>
        <div class="msg-content">
          <span v-show="!readMsg.length">无</span>
          <topic @click.native='close' v-for="(item, index) in readMsg" :key="index" :topic="readMsg[index]"></topic>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Topic from '@/components/Topic'
import { getMessages } from '@/request/api'

export default {
  components: {
    Topic
  },
  data () {
    return {
      unreadMsg: [],
      readMsg: []
    }
  },
  computed: {
    isShow () {
      return this.$store.state.isShowMessage
    },
    Auth () {
      return this.$store.state.Auth
    }
  },
  methods: {
    close () {
      this.$store.commit('switchMessage')
    }
  },
  async mounted () {
    const res = await getMessages(this.Auth)
    ;[this.unreadMsg, this.readMsg] = [res.data.has_read_messages, res.data.hasnot_read_messages]
  }
}
</script>

<style lang="scss" scoped>
.msg {
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

  .msg-box {
    display: flex;
    flex-direction: column;
    cursor: auto;
    // max-width: 50%;
    // width: 50%;
    // max-height: 70%;

    @media (max-width: 767px) {
      width: 300px;
      max-width: 300px;
      max-height: 50%;
    }

    @media (min-width: 768px) {
      width: 400px;
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

    .msg-content {
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

.msg-enter-active, .msg-leave-active {
  transition: opacity .5s;
}

.msg-enter, .msg-leave-to {
  opacity: 0;
}
</style>
