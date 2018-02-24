<template>
  <div class="bottomBar">
    <!-- <img :src="" alt="" class="songList-cover"> -->
    <div style="width: 30px;height: 30px;margin: 5px;background: orange;"></div>
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
export default {
  name: 'bottomBar',
  data () {
  	return {
  		
  	}
  }
}
</script>

<style lang="scss">
.bottomBar {
  display: flex;
  align-items: center;
  height: 50px;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .nowplaying-song {
    display: flex;
    align-items: center;
    flex: 1;
    height: 60px;
    .song-info {
      flex: 2;
      margin-left: 5px;
      p {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .song-name {
        font-size: 16px;
      }
      .song-singer {
        margin-top: 5px;
        color: #666;
        font-size: 12px;
      }
    }
    .song-control {
      flex: 1;
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
