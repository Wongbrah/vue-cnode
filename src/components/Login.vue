<template>
  <transition name="login">
    <div v-show="isShow" @click="close" class="login">
      <div @click.stop class="login-box">
        <h1>登录</h1>
        <h3>请输入AccessToken:</h3>
        <input type="text">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    isShow () {
      return this.$store.state.isShowLogin
    }
  },
  methods: {
    close () {
      this.$store.commit('switchLogin')
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
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

  .login-box {
    border: 1px solid #80bd01;
    border-radius: 5%;
    width: 300px;
    height: 300px;
    background: #f6f6f6;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: auto;
  }
}

.login-enter-active, .login-leave-active {
  transition: opacity .5s;
}

.login-enter, .login-leave-to {
  opacity: 0;
}
</style>
