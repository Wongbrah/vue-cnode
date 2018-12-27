<template>
  <div>
    <div class="topbar">
      <div class="nav">
        <div class="btn" @click="back">
          <span class="iconfont icon-fanhui"></span>
        </div>
          <div class="logo" @click="index">
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
  methods: {
    back () {
      // console.log('back')
      this.$router.back()
    },
    index () {
      this.$router.push('/index')
    },
    menu () {
      // console.log('menu')
      this.$store.commit('switchMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
.topbar {
  display: flex;
  flex-direction: column;
  background: #333;
  // border: 2px solid red;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    color: white;
    margin: 10px 15px;

    &:hover {
      cursor: pointer;
    }
  }

  .logo {
    margin: 15px 0px;
    user-select: none;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
