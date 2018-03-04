<!-- 播放列表组件 -->
<template>
  <div class="audio">
	<audio ref="audio" src="http://www.daiwei.org/vue/music/%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E4%B8%8D%E4%B8%BA%E8%B0%81%E8%80%8C%E4%BD%9C%E7%9A%84%E6%AD%8C.mp3" @pause="musicPause" @play="musicPlay" @load="musicLoad"></audio>
	<p @click="play">Play</p>
	<p @click="pause">Pause</p>
	<p @click="load">load</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  	pause () {
  		this.$refs.audio.pause()
  	},
  	play () {
  		this.$refs.audio.play()
  	},
  	load () {
  		this.$refs.audio.load()
  		console.log('load')
  	},
  	musicPause () {
  		console.log('pause')
  	},
  	musicPlay () {
  		console.log('play')
  	},
  	musicLoad () {
  		console.log('load')
  	}
  }
}
</script>

<style lang="scss" scoped>

</style>
