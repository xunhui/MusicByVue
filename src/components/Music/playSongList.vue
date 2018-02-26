<!-- 播放列表组件 -->
<template>
  <div class="playSongList" @click="clickToPlay">
    <i class="icon-volume-medium" v-show="isPlaying"></i>
    <p class="song-index" v-show="!isPlaying">{{ index+1 }}</p>
    <div class="song-detail">  
      <div class="song-info">
        <p class="song-name">{{ list.name }}</p>
        <p class="song-singer">{{ list.singer }}</p>  
      </div>
      <i class="icon-list-circle more"></i>
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
  	return {
      isPlaying: false
  	}
  },
  props: ['list', 'index'],
  methods: {
    clickToPlay() {
      this.isPlaying = !this.isPlaying;
    }
  }
}
</script>

<style lang="scss">
@import "../../common/style/global.scss";
.playSongList {
  display: flex;
  align-items: center;
  height: 60px;
  background: $baseColor;
  &:active {
    background: $list_active;
  }
  .icon-volume-medium {
    color: $mainColor;
    width: 50px;
    text-align: center;
  }
  .song-index {
    font-size: 17px;
    color: #666;
    width: 50px;
    text-align: center;
  }
  .song-detail {
    flex: 1;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $border_1px;
    height: 60px;
    .song-info {
      margin-left: 5px;
      flex: 1;
      .song-name {
        font-size: 16px;
      }
      .song-singer {
        margin-top: 5px;
        color: #666;
        font-size: 12px;
      }
    }
    .more {
      margin-right: 15px;
      color: #aaa; 
    }
  }
  

}
</style>
