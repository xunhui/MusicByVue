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
      //获取歌单列表信息 传递到myMusic中
    }, (err) => {
      alert(err)
    })

    //暂时没有做登录界面所以目前默认登录自己的账号获取用户信息存入vuex 
    //emmm...为了不暴露我的账号密码 我直接从后台返回数据取到我的userId
    //可以自行根据接口文档修改成自己的账号密码或userId
    axios.defaults.baseURL = 'http://127.0.0.1:3000'
    this.$http.get('/user/detail?uid=246442459').then(res => {
      this.$store.dispatch('setUserInfo', res.data.profile);
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
