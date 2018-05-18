<!-- H5 audio播放组件 -->
<template>
  <div class="audio">
	<audio ref="audio" @pause="musicPause" @play="musicPlay" @ended="continuePlay" @durationchange="setDuration"></audio>
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
    },
    setDuration () {
      console.log(this.$refs.audio.duration)
      this.$store.commit('setAudioDuration', this.$refs.audio.duration);
    }
  },
  mounted () {
    //mounted阶段才可以获取到dom节点
    this.$store.commit("setAudioItSelf", this.$refs.audio);
    console.log(this.$refs.audio.volume);
    this.$refs.audio.src = "http://music.163.com/song/media/outer/url?id=" + this.playingMusicInfo.id + ".mp3";
  }
}
</script>

<style lang="scss" scoped>

</style>
