<template>
  <div id="app">
    <Masks></Masks>
    <Login></Login>
    <post-topic></post-topic>
    <collect></collect>
    <message></message>
    <Topbar></Topbar>
    <Menu></Menu>
    <TabNav v-show="isShow"></TabNav>
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
import Login from '@/components/Login'
import TabNav from '@/components/Nav'
import PostTopic from '@/components/PostTopic'
import Collect from '@/components/Collect'
import Message from '@/components/Message'

export default {
  components: {
    Masks,
    Topbar,
    Menu,
    Login,
    TabNav,
    PostTopic,
    Collect,
    Message
  },
  name: 'App',
  computed: {
    isShow () {
      return this.$store.state.isShowNav
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
