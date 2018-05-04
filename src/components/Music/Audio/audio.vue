<!-- H5 audio播放组件 -->
<template>
  <div class="audio">
	<audio ref="audio" @pause="musicPause" @play="musicPlay" @ended="continuePlay"></audio>
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
    },
    continuePlay () {
      console.log('ended');
      this.$store.commit('playNextMusic');
    }
  },
  mounted () {
    
    //mounted阶段才可以获取到dom节点
    this.$store.commit("setAudioItSelf", this.$refs.audio);
    this.$refs.audio.src = "http://music.163.com/song/media/outer/url?id=" + this.playingMusicInfo.id + ".mp3";
    console.log(this.$refs.audio)
  }
}
</script>

<style lang="scss" scoped>

</style>
