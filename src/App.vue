<template> 
  <div id="app">
    <Header></Header>
    <side-bar></side-bar>
    <router-view/>
    <songlist-detail></songlist-detail>
    <!-- 此处发现一个坑 由于各个组件分模块导入 各个组件的css样式以行内样式一一导入 如果类名相同会导致样式冲突 所以在每个css样式书写之前都先写上总的根父类名或设置scoped -->
    <operation></operation>
    <bottom-bar></bottom-bar>
    <now-playingList></now-playingList>
  </div>
</template>

<script>
import Header from "@/components/Header"
import sideBar from "@/components/SideBar/sideBar"
import bottomBar from "@/components/bottomBar"
import songlistDetail from "@/components/Music/SongList/songListDetail"
import operation from "./Components/Common/operation"
import nowPlayingList from "@/components/Music/PlayingMusic/nowPlayingList"
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
    operation,
    nowPlayingList
  },
  methods: {

  },
  created () {
    //默认登录自己的账号获取用户信息存入vuex 此处放的是uid
    axios.defaults.baseURL = 'http://127.0.0.1:3000'
    axios.get('/user/detail?uid=246442459').then(res => {
      this.$store.commit('setUserInfo', res.data.profile);
    }).catch(error => console.log(error));

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
