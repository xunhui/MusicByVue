<!-- 点击播放后的当前播放列表 -->
<template>
	<!-- 歌单列表播放方式 -->
	<div class="now-playingList">
		<transition name="fade">
			<div class="mask" v-if="ifShowPlayingList"></div>
		</transition>
		<transition name="slide">
			<div class="song-list" v-if="ifShowPlayingList">
				<div class="list-playmode">
					<i class="playmode-icon"></i>
					<p class="playmode-title"></p>
					<p class="list-count">233</p>
				</div>
				<div>
					<p class="song-name">一首简单的歌</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		props: [],
		components: {

		},
		computed: {
			ifShowPlayingList () {
				return this.$store.getters.getPlayingSongListShowState;
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
@import "../../../common/style/global.scss";
	.mask {
	    background: #000;
	    opacity: 0.8;
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    z-index: 20;
	    &.fade-enter,
	    &.fade-leave-to {
	      opacity: 0;
	    }
	    &.fade-enter-active,
	    &.fade-leave-active {
	      transition: opacity 0.3s;
	    }
  	}
  	.song-list {
  		position: fixed;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    overflow-y: auto;
	    max-height: 250px;
	    &::-webkit-scrollbar {
	      display: none;
	    }
	    background: $baseColor;
	    z-index: 21;
	    padding-bottom: 10px;   
	    &.slide-enter,
	    &.slide-leave-to {
	      transform: translateY(100%);
	    }
	    &.slide-enter-active,
	    &.slide-leave-active {
	      transition: all 0.3s;
	    }
  	}
</style>
