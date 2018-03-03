<template> 
  <div id="app">
    <Header></Header>
    <side-bar></side-bar>
    <router-view/>
    <songlist-detail></songlist-detail>
    <!-- 此处发现一个坑 由于各个组件分模块导入 各个组件的css样式以行内样式一一导入 如果类名相同会导致样式冲突 所以在每个css样式书写之前都先写上总的根父类名 -->
    <operation></operation>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import Header from "@/components/Header"
import sideBar from "@/components/SideBar/sideBar"
import bottomBar from "@/components/bottomBar"
import songlistDetail from "@/components/Music/SongList/songListDetail"
import operation from "./Components/Common/operation";
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
    bottomBar,
    songlistDetail,
    operation
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
