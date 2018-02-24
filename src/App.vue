<template> 
  <div id="app">
    <Header></Header>
    <side-bar></side-bar>
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
      console.log(res.data)
      let musicData = res.data.music;
      let userData = res.data.user;
      let findMusicData = res.data.findmusic;
      //获取用户信息 传递到sideBar组件中
      this.$store.dispatch('setUserInfo',userData);
      //获取歌单列表信息 传递到myMusic中
      this.$store.dispatch('setMusicSheetsInfo', musicData.sheets)
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
