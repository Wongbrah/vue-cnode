<template>
  <div>
    <div class="topbar" v-show="isShow">
      <div class="nav">
        <div class="btn" @click="back">
          <span class="iconfont icon-fanhui"></span>
        </div>
          <div class="logo">
            <img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" alt="logo" height="30px">
          </div>
        <div class="btn" @click="menu">
          <span class="iconfont icon-weibiaoti12"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: Boolean
  },
  methods: {
    back () {
      console.log('back')
      this.$router.back()
    },
    menu () {
      console.log('menu')
    }
  }
}
</script>

<style lang="scss" scoped>
.topbar {
  display: flex;
  flex-direction: column;
  background: #333;
  border: 2px solid red;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    color: white;
    margin: 10px 15px;
  }

  .logo {
    margin: 15px 0px;
  }
}
</style>
