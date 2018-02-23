<template>
  <div id="app">
    <Header></Header>
    <sideBar></sideBar>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header"
import sideBar from "@/components/sideBar"
export default {
  name: 'app',
  components: {
    Header,
    sideBar
  }
}
</script>

<style lang="scss">
$maincolor: #2c3e50;
* {
  margin: 0;
  padding: 0;
}
</style>
