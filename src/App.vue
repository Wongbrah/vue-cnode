<template>
  <div id="app">
    <Masks></Masks>
    <Topbar :isShow="isShow"></Topbar>
    <Menu></Menu>
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </div>
  </div>
</template>

<script>
import Masks from '@/components/Mask'
import Topbar from '@/components/Topbar'
import Menu from '@/components/Menu'

export default {
  components: {
    Masks,
    Topbar,
    Menu
  },
  name: 'App',
  data () {
    return {
      isShow: true
    }
  }
}
</script>

<style>
body {
  margin: 0px;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1;
  /* border: 2px solid green; */
  overflow-y: scroll;
}
</style>
