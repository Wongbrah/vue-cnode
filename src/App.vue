<template>
  <div id="app">
    <topbar :isShow="isShow"></topbar>
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </div>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar'

export default {
  components: {
    Topbar
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
  border: 2px solid green;
  overflow-y: scroll;
}
</style>
