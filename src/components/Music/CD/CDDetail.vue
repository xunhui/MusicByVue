<template>
    <transition name="slide">
        <div class="CD-detail" v-if="ifShowCDDetail">
            <div class="top-bar">
                <i class="back icon-back" @click.stop="back"></i>
                <div class="music-info">
                    <p class="music-name">{{ playingSongInfo.name }}</p>
                    <p class="music-singer">{{ getArtistsAlbumInfo.artists }}</p>
                </div>
                <i class="share icon-share"></i>
                <div class="border-bottom"></div>
            </div>
            <div class="CD-content">
                <div class="CD-switch">
                    <img class="switch-image" :class="{switchOn: playingState,switchOff: !playingState}" src="../../../../static/images/switch.png" alt="DropTheBeat">
                </div>
                <div class="CD-poster" :class="{posterOff: !playingState}">
                    <img class="cd-image" src="../../../../static/images/cd-mine.png" alt="CD">
                    <img class="poster-image" :src="playingSongInfo.album.blurPicUrl" alt="CD">
                </div>
            </div>  
            <div class="CD-control">
                <div class="progress-control">
                    <span class="now-progress-time">{{ currentFixedTime }}</span>
                    <div class="whole-progress-bar" @click="setPlayingTime" ref="wholeProgress">
                      <div class="now-progress-bar" ref="nowrogress" :style="{width: currentOffset - initialOffset + 'px'}"></div>
                      <span class="indicator" ref="indicator" :style="{left: currentOffset + 'px'}" @mousedown="beginDrag" @mouseup="stopDrag"></span>
                    </div>
                    <span class="whole-progress-time">{{ wholeFixedDuration }}</span>
                </div>
                <div class="operation-option">
                    <i class="option-mode-select" :class="{ 'icon-music-shunxu': playingMode==1, 'icon-music-danqu1': playingMode==2, 'icon-music-random': playingMode==3 }" @click="changePlayingMode"></i>
                    <div class="play-operation-option">
                        <i class="option-pre-song icon-prevdetail" @click="preSong"></i>
                        <i class="option-play-pause" @click="playOrPause" :class="[playingState ? 'icon-pause' : 'icon-play']"></i>
                        <i class="option-next-song icon-nextdetail" @click="nextSong"></i>
                    </div>
                    <i class="option-music-list icon-list-music" @click="showNowPlayingList"></i>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import common from "@/common/js/common.js";
export default {
  data() {
    return {
      currentTime: 0,
      currentOffset: -6,
      initialOffset: -6,
      playTimer: -1
    };
  },
  computed: {
    playingState () {
      return this.$store.getters.getPlayingState;
    },
    ifShowCDDetail () {
      return this.$store.getters.getCDDetailState;
    },
    playingState () {
      return this.$store.getters.getPlayingState;
    },
    playingSongInfo () {
      return this.$store.getters.getPlayingSongInfo;
    },
    playingMode () {
      return this.$store.getters.getPlayingMode;
    },
    getArtistsAlbumInfo () {
      return common.artistsAlbumInfo(this.playingSongInfo);
    },
    currentFixedTime () {
      return common.getTimeFromDuration(this.currentTime)
    },
    wholeFixedDuration() {
      return common.getTimeFromDuration(this.$store.getters.getAudioDuration);
    }
  },
  methods: {
    back() {
      this.$store.commit("hideCDDetail");
    },
    //进度条点击事件
    setPlayingTime (event) {
      event = event || window.event;
      let offsetX = event.offsetX, wholeWidth = this.$refs.wholeProgress.offsetWidth;
      let wholeDuration = this.$store.getters.getAudioDuration;
      let jumpTime = offsetX/wholeWidth*wholeDuration;
      console.log('offsetX:',offsetX, 'jumpTime:', jumpTime);
      //修改当前播放时间，音频信息，播放进度条和指示器位置
      this.currentTime = jumpTime;
      this.$store.getters.getAudioItSelf.currentTime = jumpTime;
      this.currentOffset = offsetX + this.initialOffset;
      console.log(this.currentOffset)
    },
    //鼠标拖拽事件
    beginDrag (event) {
      event = event || window.event;
      //先获取点击时
      let initialOffsetX = event.offsetX;
      console.log('begin', event.offsetX, event.clientX)
      if (event) {
        let fixedValue = 50, maxOffset = that.$refs.wholeProgress.offsetWidth - 6;
        //拖动过程中的偏移量即起始点和指示器左侧的距离
        this.$refs.indicator.onmousemove = (e) => {
          e = e || window.event;
          this.currentOffset = e.clientX - initialOffsetX - fixedValue;
          if (this.currentOffset < -6) {
            this.currentOffset = -6;
          }
          if (this.currentOffset > maxOffset) {
            this.currentOffset = maxOffset;
          }
          console.log('ing', e.offsetX, e.clientX, this.currentOffset)
        }
      }
    },
    stopDrag (event){
      console.log('stop', event.offsetX, event.clientX)
    },
    //音频播放事件
    audioPlay (event) {
      let that = this;
      if (event == 'play')  {
        clearInterval(this.playTimer);
        this.playTimer = setInterval( function () {
          //----此处注意this的指向
          let currentTime = that.$store.getters.getAudioItSelf.currentTime;
          let wholeDuration = that.$store.getters.getAudioDuration;
          let offsetX = currentTime/wholeDuration*that.$refs.wholeProgress.offsetWidth;
          //修改当前播放时间，音频信息，播放进度条和指示器位置
          that.currentTime = currentTime;
          that.currentOffset = offsetX + that.initialOffset;
          console.log(currentTime)
        }, 1100)
      } else if (event == 'pause') {
        console.log('clear')
        clearInterval(this.playTimer);
      }
    },
    changePlayingMode() {
      this.$store.commit("changePlayingMode");
    },
    playOrPause() {
      this.$store.commit("playOrPause");
    },
    preSong() {
      console.log("上");
      this.currentTime = 0;
      this.currentWidth = 0;
      this.currentOffset = this.initialOffset;
      this.$store.commit("playPreMusic");
    },
    nextSong() {
      console.log("下");
      this.currentTime = 0;
      this.currentWidth = 0;
      this.currentOffset = this.initialOffset;
      this.$store.commit("playNextMusic");
    },
    showNowPlayingList() {
      this.$store.commit("showPlayingSongList");
    }
  },
  watch: {
    playingState: function (newState, oldState) {
      //play
      if (newState == true) {
        this.audioPlay('play');
      } 
      //pause
      else {
        console.log('该停了')
        this.audioPlay('pause');
      }
    }
  },
  created() {
    
  }
};
</script>

<style lang="scss">
@import "../../../common/style/global.scss";
.CD-detail {
  &.slide-enter,
  &.slide-leave-to {
    transform: translateY(100%);
  }
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  background: #666;
  padding-top: 10px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 15;
  .top-bar {
    display: flex;
    align-items: center;
    height: 55px;
    position: relative;
    .back {
      width: 60px;
      height: 55px;
      line-height: 55px;
      font-size: 24px;
      text-align: center;
      color: #fff;
    }
    .share {
      width: 50px;
      height: 55px;
      line-height: 55px;
      font-size: 38px;
      text-align: center;
      color: #fff;
    }
    .music-info {
      flex: 1;
      .music-name {
        color: #fff;
        font-size: 16px;
      }
      .music-singer {
        color: $subtext_color;
        font-size: 14px;
      }
    }
    .border-bottom {
      height: 1px;
      background: rgba($color: #ffffff, $alpha: 0.1);
      position: absolute;
      bottom: 0;
      left: 60px;
      right: 50px;
      top: 55px;
    }
  }
  .CD-content {
    overflow: hidden;
    .CD-switch {
      z-index: 20;
      .switch-image {
        transition: all 0.8s;
        width: 100px;
        position: relative;
        left: 50%;
        z-index: 20;
      }
      .switchOn {
        top: -20px;
        transform: translate3d(-18px, 0, 0) rotate(0deg);
      }
      .switchOff {
        top: -35px;
        transform: rotate(-22deg);
      }
    }
    .CD-poster {
      position: relative;
      height: 300px;
      top: -85px;
      animation: RotateCircle 15s infinite linear;
      z-index: 15;
      @keyframes RotateCircle {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .cd-image {
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -150px;
        margin-top: -150px;
      }
      .poster-image {
        width: 190px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -95px;
        margin-top: -95px;
      }
    }
    .posterOff {
      animation-play-state: paused;
    }
  }
  .CD-control {
    .progress-control {
        padding: 20px 15px;
        display: flex;
        align-items: center;
        .now-progress-time {
            width: 35px;
            color: $sub_iconcolor;
            font-size: 10px;
            text-align: left;
        }
        .whole-progress-time {
            width: 35px;
            color: $sub_iconcolor;
            font-size: 10px;
            text-align: right;
        }
        .whole-progress-bar {
            flex: 1;
            position: relative;
            background: $sub_iconcolor;
            height: 3px;
            border-radius: 8px;
            cursor: pointer;
            .now-progress-bar {
                position: absolute;
                top: 0;
                left: 0;
                background: $mainColor;
                height: 3px;
                border-radius: 8px;
            }
            .indicator {
              position: absolute;
              height: 12px;
              width: 12px;
              border-radius: 50%;
              background: #fff;
              top: -4.5px;
              cursor: pointer;
            }
        }
        
    }
    .operation-option {
      display: flex;
      align-items: center;
      i {
        cursor: pointer;
      }
      .option-mode-select,
      .option-music-list {
        width: 60px;
        font-size: 30px;
        text-align: center;
        color: $sub_iconcolor;
      }
      .play-operation-option {
        flex: 1;
        text-align: center;
        i {
          color: #fff;
          font-size: 40px;
        }
        .option-play-pause {
          padding: 0 35px;
        }
      }
    }
  }
}
</style>
