<template>
  <div class="bottomBar">
  <my-audio></my-audio>
    <img src="http://oiq8j9er1.bkt.clouddn.com/music_%E6%88%91%E8%BF%98%E6%83%B3%E5%A5%B9.jpg" alt="cover" class="songList-cover">
    <div class="nowplaying-song">
      <div class="song-info">
        <p class="song-name">玫瑰花的葬礼</p>
        <p class="song-singer">许嵩</p>
      </div>
      <div class="song-control">
        <i class="play-pause icon-pause"></i>
        <i class="music-list icon-list-music"></i>
      </div>
    </div>

  </div>
</template>

<script>
import myAudio from "./Common/audio"
export default {
  name: 'bottomBar',
  data () {
  	return {
  		
  	}
  },
  components: {
    myAudio: myAudio
  }
}
</script>

<style lang="scss">
.bottomBar {
  display: flex;
  align-items: center;
  height: 150px;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 15;
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
        color: #666;
        font-size: 12px;
      }
    }
    .song-control {
      text-align: right;
      .play-pause {
        color: #666;
        font-size: 25px;
        margin-right: 10px;
      }
      .music-list {
        color: #666;
        font-size: 25px;
        margin-right: 10px;
      }
    } 
  }
  
}
</style>
