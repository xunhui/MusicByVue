<template>
  <div class="myMusic">
	<topList iconInfo="icon-music" titleText="我的音乐" titleCount="68" isPlaying="true" hasBorder="true"></topList>
	<topList iconInfo="icon-zuijinplay" titleText="最近播放" titleCount="32" hasBorder="true"></topList>
	<topList iconInfo="icon-diantai" titleText="我的电台" titleCount="3" hasBorder="true"></topList>
	<topList iconInfo="icon-collect" titleText="我的收藏" titleCount="专辑/歌手/视频/专栏" hasBorder="false"></topList>
	<songList></songList>
  </div>
</template>

<script>
import topList from "./topList"
import songList from "./songList.vue"
export default {
  name: 'myMusic',
  data () {
  	return {
  		name:'cc'
  	}
  },
  components: {
  	"topList": topList,
  	"songList": songList
  }
}
</script>

<style lang="scss">

</style>
