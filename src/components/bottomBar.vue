<template>
  <div class="bottomBar" @click="showCDDetail">
    <my-audio></my-audio>
    <img :src="playingSongInfo.album.blurPicUrl" class="songList-cover">
    <div class="nowplaying-song">
      <div class="song-info">
        <p class="song-name">{{ playingSongInfo.name }}</p>
        <p class="song-singer">{{ getArtistsAlbumInfo().artistsAndAlbum }}</p>
      </div>
      <div class="circle-diy" @click.stop="playOrPause">
        <i class="play-pause" :class="[playingSongState ? 'icon-pause' : 'icon-play']"></i>
      </div>
      <i @click.stop="showNowPlayingList" class="music-list icon-list-music"></i>
    </div>

  </div>
</template>

<script>
import myAudio from "./Music/Audio/audio"
import common from '@/common/js/common.js'
import axios from "axios"
export default {
  name: 'bottomBar',
  data () {
  	return {
  		
  	}
  },
  components: {
    myAudio: myAudio
  },
  computed: {
    playingSongInfo () {
      return this.$store.getters.getPlayingSongInfo;
    },
    playingSongState () {
      return this.$store.getters.getPlayingState;
    }
  },
  methods: {
    showCDDetail () {
      this.$store.commit('showCDDetail');
    },
    playOrPause () {
      this.$store.commit('playOrPause');
    },
    showNowPlayingList () {
      this.$store.commit('showPlayingSongList');
    },
    getArtistsAlbumInfo () {
      return common.artistsAlbumInfo(this.playingSongInfo)
    }
  },
  created () {
    axios.get('/user/followeds?uid=32953014').then(e => console.log(e))
  }
}
</script>

<style lang="scss">
@import "../Common/style/global.scss";
.bottomBar {
  display: flex;
  align-items: center;
  height: 50px;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 15;
  // cursor: pointer;
  .songList-cover {
    width: 40px;
    height: 40px;
    margin: 5px;
    background: orange;
  }
  .nowplaying-song {
    display: flex;
    align-items: center;
    flex: 1;
    height: 50px;
    .song-info {
      flex: 1;
      margin-left: 5px;
      p {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .song-name {
        font-size: 15px;
      }
      .song-singer {
        margin-top: 3px;
        color: $subtext_color;
        font-size: 12px;
      }
    }
    .circle-diy {
      &:active {
        background: $list_active;
      }
      position: relative;
      border-radius:50%;
      border: 2px solid #666;
      width: 25px;
      height: 25px;
      margin-right: 15px;
      .play-pause {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -7.5px 0 0 -7.5px;
        color: $mainColor;
        font-size: 15px;
      }
    }
    .music-list {
      text-align: center;
      color: $main_iconcolor;
      font-size: 25px;
      padding:  12.5px 10px 12.5px 0;    
    }
  }
  
}
</style>