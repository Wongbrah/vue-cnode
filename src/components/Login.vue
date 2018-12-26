<template>
  <transition name="login">
    <div v-show="isShow" @click="close" class="login">
      <div @click.stop class="login-box">
        <div class="header">
          <span>登录</span>
        </div>
        <div class="form">
          <span v-show="blankErr" class="err iconfont icon-jinggao"> accessToken 不能为空</span>
          <span v-show="tokenErr" class="err iconfont icon-jinggao"> 登陆失败！您输入的 accessToken 不正确</span>
          <div class="row">
            <input v-model="token" type="text" name="token" placeholder="请输入您的 accessToken">
          </div>
          <div class="row">
            <span>如何获取 accessToken？ 用户登录后，在设置页面可以看到自己的 accessToken。 建议各移动端应用使用手机扫码的形式登录，验证使用 /accesstoken 接口，登录后长期保存 accessToken。</span>
          </div>
          <div class="row">
            <button @click="checkForm">登录</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { login } from '@/request/api'

export default {
  data () {
    return {
      token: '',
      blankErr: false,
      tokenErr: false
    }
  },
  computed: {
    isShow () {
      return this.$store.state.isShowLogin
    }
  },
  methods: {
    close () {
      this.$store.commit('switchLogin')
    },
    async checkForm (e) {
      [this.blankErr, this.tokenErr] = [false, false]

      if (this.token) {
        const res = await login({
          accesstoken: this.token
        }).catch(err => {
          this.tokenErr = true
          console.log('登录失败！')
          return false
        })
        if (res.success) {
          localStorage.setItem('access_token', this.token)
          localStorage.setItem('loginname', res.loginname)
          localStorage.setItem('avatar_url', res.avatar_url)
          localStorage.setItem('id', res.id)
          console.log('登录成功！')
          location.reload()
        }
        return true
      }

      if (!this.token) {
        this.blankErr = true
      }
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
  z-index: 99;

  .login-box {
    display: flex;
    flex-direction: column;
    cursor: auto;
    max-width: 50%;

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

        button {
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

.login-enter-active, .login-leave-active {
  transition: opacity .5s;
}

.login-enter, .login-leave-to {
  opacity: 0;
}
</style>
