<template>
  <transition name="topic">
    <div v-show="isShow" @click="close" class="topic">
      <div @click.stop class="topic-box">
        <div class="header">
          <span>发布话题</span>
        </div>
        <form
          @submit="checkForm"
          id="postTopic"
          method="post"
        >
          <div class="form">
            <span v-show="errors[0]" class="err iconfont icon-jinggao"> 请选择一个分类</span>
            <div class="row">
              <span>选择板块：</span>
              <select v-model="tab" name="tab" id="tab-value">
                <option value="">请选择</option>
                  <option value="share" disabled>分享</option>
                  <option value="ask" disabled>问答</option>
                  <option value="job" disabled>招聘</option>
                  <option value="dev">客户端测试</option>
              </select>
            </div>
            <span v-show="errors[1]" class="err iconfont icon-jinggao"> 标题不能为空</span>
            <span v-show="errors[2]" class="err iconfont icon-jinggao"> 标题字数 10 字以上</span>
            <div class="row">
              <input v-model="title" type="text" name="title" placeholder="标题字数 10 字以上">
            </div>
            <span v-show="errors[3]" class="err iconfont icon-jinggao"> 内容不能为空</span>
            <div class="row">
              <textarea v-model="content" name="content" id="" cols="30" rows="10" placeholder="内容"></textarea>
            </div>
            <div class="row">
              <input type="submit" value="提交">
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      errors: [false, false, false, false],
      tab: '', // 0
      title: '', // 1, 2
      content: '' // 3
    }
  },
  computed: {
    isShow () {
      return this.$store.state.isShowPostTopic
    }
  },
  methods: {
    close () {
      this.$store.commit('switchPostTopic')
    },
    checkForm (e) {
      if (this.tab && this.title && this.content) {
        return true
      }

      this.errors = [false, false, false, false]

      if (!this.tab) {
        this.errors[0] = true
      }
      if (!this.title) {
        this.errors[1] = true
      }
      if (!this.errors[1] && this.title.length < 10) {
        this.errors[2] = true
      }
      if (!this.content) {
        this.errors[3] = true
      }

      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
.topic {
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

  .topic-box {
    display: flex;
    flex-direction: column;
    cursor: auto;

    .header {
      padding: 10px;
      background-color: #f6f6f6;
      border-radius: 3px 3px 0 0;

      span {
        line-height: 20px;
        color: #80bd01;
      }
    }

    .form {
      padding: 10px;
      background: #fff;
      display: flex;
      flex-direction: column;
      border-radius: 0 0 3px 3px;

      .row {
        display: flex;
        margin: 10px 0;

        &>* {
          border: 1px solid #ccc;
          padding: 4px 6px;
          border-radius: 4px;

          &:focus {
            outline: none;
            border-color: #80bd01;
            box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.1);
          }
        }

        span {
          border: none;
        }

        select {
          cursor: pointer;
          width: 220px;
        }

        input {
          width: 100%;
        }

        input[type=submit] {
          border: none;
          background: #80bd01;
          color: #fff;
          width: 100%;
          margin: 0 40%;
          user-select: none;

          &:hover {
            cursor: pointer;
          }
        }

        textarea {
          width: 400px;
          height: 200px;
          min-width: 200px;
          min-height: 100px;
          max-width: 500px;
          max-height: 250px;
        }
      }

      .err {
        color: red;
        font-size: 10px;
      }
    }
  }
}

.topic-enter-active, .topic-leave-active {
  transition: opacity .5s;
}

.topic-enter, .topic-leave-to {
  opacity: 0;
}
</style>
