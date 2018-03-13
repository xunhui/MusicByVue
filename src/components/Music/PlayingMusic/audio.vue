<!-- 播放列表组件 -->
<template>
  <div class="audio">
	<audio ref="audio" :src="playingMusicInfo.url" @pause="musicPause" @play="musicPlay" @load=""></audio>
	<p @click="play">Play</p>
	<p @click="pause">Pause</p>
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
  	pause () {
  		this.$refs.audio.pause()
  	},
  	play () {
  		this.$refs.audio.play()
  	},
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
  }
}
</script>

<style lang="scss" scoped>

</style>
