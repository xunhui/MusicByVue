<!-- 我的音乐主界面 -->
<template>
  <div class="myMusic">
		<topList iconInfo="icon-music" titleText="我的音乐" titleCount="68" :isPlaying="true" :hasBorder="true"></topList>
		<topList iconInfo="icon-zuijinplay" titleText="最近播放" titleCount="32" hasBorder=true></topList>
		<topList iconInfo="icon-diantai" titleText="我的电台" titleCount="3" hasBorder=true></topList>
		<topList iconInfo="icon-collect" titleText="我的收藏" titleCount="专辑/歌手/视频/专栏" :hasBorder="false"></topList>
		<!-- 用v-for循环渲染组件可以让每个组件内部拥有自己的变量  歌单列表 -->
    <clip-loader :loading="loading" :color="baseColor" :size="height" class="loading"></clip-loader>
		<songList v-if="!loading" :items="EachSheetsInfo" v-for="EachSheetsInfo in SheetsInfo" :key="EachSheetsInfo.id"></songList>
  </div>
</template>

<script>
import topList from "./TopList/topList";
import songList from "./SongList/songList";
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
// import bottomBar from './bottomBar'
export default {
  name: "myMusic",
  data() {
    return {
      name: "cc",
      loading: false,
      baseColor: "#D23A31",
      height: "25px"
    };
  },
  components: {
    'topList': topList,
	  'songList': songList,
    'ClipLoader': ClipLoader,
    'ScaleLoader': ScaleLoader
  },
  computed: {
    SheetsInfo() {
      return this.$store.getters.getMusicSheetsInfo;
    }
  },
  created () {
    //获取歌单列表
    //提供的这个接口貌似不会自行对歌单进行分类..查看接口信息猜测是根据specialtype来分类 
    //手动写对象很蛋疼..索性直接全部显示..这接口好坑
    this.loading = true;
    this.$http.get('/user/playlist?uid=246442459').then( res => {
      this.$store.commit('setMusicSheetsInfo', res.data.playlist);
      this.loading = false;
      console.log(res)
    })
  }
};
</script>

<style lang="scss">
@import "../../common/style/global.scss";
.myMusic {
  background: $baseColor;
  overflow: auto;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 50px;
  z-index: 10;
  &::-webkit-scrollbar {
    display: none;
  }
  .loading {
    margin-top: 100px;
  }
}
</style>
