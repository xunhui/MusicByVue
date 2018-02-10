<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header"
export default {
  name: 'app',
  components: {
    Header
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
