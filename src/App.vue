<template>
  <div id="app">
    <Header></Header>
    <side-bar :userInfo="userInfo"></side-bar>
    <router-view/>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import Header from "@/components/Header"
import sideBar from "@/components/SideBar/sideBar"
import bottomBar from "@/components/bottomBar"
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      userInfo: {}
    }
  },
  components: {
    Header,
    sideBar,
    bottomBar
  },
  methods: {

  },
  created () {
    let LocalAPI = '../static/data.json'
    axios.get(LocalAPI).then((res) => {
      //获取用户信息传递到sideBar组件中
      this.userInfo = res.data.user
      console.log(this.userInfo)
    }, (err) => {
      alert(err)
    })
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
