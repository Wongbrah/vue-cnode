<template>
  <div class="nav">
    <router-link :to="{path: 'index', query: {tab: 'all'}}" :class="{active: tabNow === 'all'}">全部</router-link>
    <router-link :to="{path: 'index', query: {tab: 'good'}}" :class="{active: tabNow === 'good'}">精华</router-link>
    <router-link :to="{path: 'index', query: {tab: 'share'}}" :class="{active: tabNow === 'share'}">分享</router-link>
    <router-link :to="{path: 'index', query: {tab: 'ask'}}" :class="{active: tabNow === 'ask'}">问答</router-link>
    <router-link :to="{path: 'index', query: {tab: 'job'}}" :class="{active: tabNow === 'job'}">招聘</router-link>
    <router-link :to="{path: 'index', query: {tab: 'dev'}}" :class="{active: tabNow === 'dev'}">客户端测试</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    tabNow () {
      return this.$route.query.tab || 'all'
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  background: #f6f6f6;
  text-align: center;
  padding: 5px;

  a {
    margin: 0 5px;
    text-decoration: none;
    color: #80bd01;
  }

  .active {
    background: #80bd01;
    color: #fff;
    border-radius: 10%;
    padding: 0 3px;
  }
}
</style>
