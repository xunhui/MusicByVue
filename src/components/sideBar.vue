<template>
  <div class="sidebar">
      <transition name="fade">
          <div class="sidebar-mask" @click="hideSideBar" v-show="ifShow"></div>
      </transition>
      <transition name="side">
          <div class="sidebar-content">

          </div>
      </transition>
  </div>
</template>

<script>
export default {
  data () {
      return {
        
      }
  },
  computed: {
      ifShow () {
          return this.$store.state.sideBar.isShow;
      }
  },
  methods: {
      hideSideBar () {
          this.$store.dispatch('hideSideBar')
      }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.8;
    z-index: 99;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}
.fade-enter-active, .fade-leave-active {
    transition: all .3s;
}
// .sidebar-content {
//     position: absolute;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     background: orange;
//     width: 82%;
//     z-index: 100;
// }
</style>
