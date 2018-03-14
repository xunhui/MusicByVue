<!-- 播放列表组件 -->
<template>
  <div class="audio">
	<audio ref="audio" @pause="musicPause" @play="musicPlay"></audio>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    //获取当前播放状态
    nowPlayingState () {
      return this.$store.getters.getPlayingState;
    },
    playingMusicInfo () {
      return this.$store.getters.getPlayingSongInfo;
    }
  },
  methods: {
  	musicPause () {
  		console.log('pause')
  	},
  	musicPlay () {
  		console.log('play')
  	}
  },
  mounted () {
    console.log(this.$refs.audio.src)
    //mounted阶段才可以获取到dom节点
    this.$store.commit("setAudioItSelf", this.$refs.audio);
    this.$refs.audio.src = this.playingMusicInfo.url;
  }
}
</script>

<style lang="scss" scoped>

</style>
