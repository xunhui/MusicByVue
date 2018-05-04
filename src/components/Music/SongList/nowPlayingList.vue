<!-- 点击播放后的当前播放列表 -->
<template>
	<!-- 歌单列表播放方式 -->
	<div class="now-playingList">
		<transition name="fade">
			<div class="mask" v-if="ifShowPlayingList" @click="hidePlayingList"></div>
		</transition>
		<transition name="slide">
			<div class="song-list" v-if="ifShowPlayingList">
				<div class="top-menu" v-if="nowPlayingListInfo.tracks.length">
					<div class="list-playmode" @click="changePlayingMode">
						<i class="playmode-icon" :class="{ 'icon-music-shunxu': playingMode==1, 'icon-music-danqu1': playingMode==2, 'icon-music-random': playingMode==3 }"></i>
						<p class="playmode-title">{{ playModeTitle }}</p>
						<p class="list-count">({{ nowPlayingListInfo.tracks.length }})</p>
					</div>
				</div>
				<div @click="playIndex(index)" v-if="nowPlayingListInfo.tracks.length" class="each-list" v-for="(eachsong, index) in nowPlayingListInfo.tracks" :bind='eachsong.id'>
					<div class="each-song">
						<i class="nowplaying-icon icon-volume-medium" v-if="currentIndex == index && playingSongListID == showingSongListID"></i>
						<p class="song-name" :class="{playingStyle: currentIndex == index}">{{ eachsong.name }}</p>
						<span class="gap" :class="{playingStyle: currentIndex == index}">-</span>
						<p class="song-singer" :class="{playingStyle: currentIndex == index}">{{ getArtistsAlbumInfo(eachsong).artists }}</p>
					</div>
				</div>	
				<div v-if="!nowPlayingListInfo.tracks.length">暂无播放列表，快去点歌吧！</div>
			</div>
		</transition>
	</div>
</template>

<script>
import common from '@/common/js/common.js'
export default {
  data() {
    return {
      
    };
  },
  props: [],
  components: {},
  computed: {
    ifShowPlayingList() {
      	return this.$store.getters.getPlayingSongListShowState;
    },
    nowPlayingListInfo () {
    	return this.$store.getters.getPlayingSongListInfo;
    },
    playingSongListID () {
      return this.$store.getters.getPlayingSongListID;
    },
    showingSongListID () {
     return this.nowPlayingListInfo.id; 
    },
    currentIndex () {
      return this.$store.getters.getPlayingSongIndex;
    },
    playingMode () {
      return this.$store.getters.getPlayingMode;
    },
    playModeTitle () {
      switch (this.playingMode)
      {
        case 1: return '列表循环';
        case 2: return '单曲循环';
        case 3: return '随机播放'; 
        default: return;
      }
    }
  },
  methods: {
    hidePlayingList () {
      this.$store.commit("hidePlayingSongList");
    },
    changePlayingMode () {
        console.log('123')
        this.$store.commit('changePlayingMode');
    },
    getArtistsAlbumInfo (obj) {
      return common.artistsAlbumInfo(obj);
    },
    playIndex (index) {
      let obj = {};
      //this.list.artistsAlbum = this.getArtistsAndAlbum(this.list);
      obj.index = index;
      obj.sheetsDetailInfo = this.$store.getters.getPlayingSongListInfo;
      console.log(obj);
      this.$store.commit('playIndexMusic', obj);
    }
  }
};
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
  max-height: 400px;
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
  .top-menu {
	border-bottom: $border_1px;
    .list-playmode {
      display: flex;
      align-items: center;
      height: 50px;
      width: 135px;
      &:active {
        background: $list_active;
      }
      .playmode-icon {
        margin-left: 10px;
        font-size: 25px;
        color: $subtext_color;
      }
      .playmode-title {
        margin: 0 5px;
        font-size: 14px;
      }
      .list-count {
        font-size: 14px;
      }
    }
  }
  .each-list {
	  &:active {
        background: $list_active;
      }
    .each-song {
      display: flex;
      align-items: center;
      height: 50px;
      margin-left: 10px;
      border-bottom: $border_1px;
      p {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .nowplaying-icon {
        color: $mainColor;
        margin-right: 5px;
        margin-top: 2px;
      }
      .song-name {
        max-width: 60%;
      }
      .gap {
        margin-left: 5px;
        margin-right: 5px;
        color: $subtext_color;
      }
      .song-singer {
        max-width: 40%;
        color: $subtext_color;
        font-size: 14px;
        margin-top: 2px;
      }
      .playingStyle {
        color: $mainColor; 
        font-weight: 550;
      }
    }
  }
}
</style>
