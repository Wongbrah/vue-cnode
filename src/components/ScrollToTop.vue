<template>
  <div class="scrolltotop" v-show="isShow" @click="scrollToTop" ref="top">↑</div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      content: null
    }
  },
  methods: {
    scrollToTop () {
      this.$refs.top.parentNode.parentNode.scrollTop = 0
      this.isShow = false
    },
    handleShow () {
      if (this.content.scrollTop > window.innerHeight) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  mounted () {
    this.content = this.$refs.top.parentNode.parentNode
    this.content.addEventListener('scroll', this.handleShow)
  },
  destroyed () {
    this.content.removeEventListener('scroll', this.handleShow)
  }
}
</script>

<style lang="scss" scoped>
.scrolltotop {
  border: 1px #80bd01 solid;
  background: #333;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  text-align: center;
  position: fixed;
  right: 40px;
  bottom: 50px;
  z-index: 1000;
  color: #e1e1e1;

  &:hover {
    cursor: pointer;
  }
}
</style>
