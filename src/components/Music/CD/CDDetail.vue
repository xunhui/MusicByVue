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
                    <span class="now-progress-time">0:00</span>
                    <div class="progress-bar"></div>
                    <span class="whole-progress-time">4:32</span>
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
    return {};
  },
  computed: {
    ifShowCDDetail() {
      return this.$store.getters.getCDDetailState;
    },
    playingState() {
      return this.$store.getters.getPlayingState;
    },
    playingSongInfo() {
      return this.$store.getters.getPlayingSongInfo;
    },
    playingMode() {
      return this.$store.getters.getPlayingMode;
    },
    getArtistsAlbumInfo() {
      return common.artistsAlbumInfo(this.playingSongInfo);
    }
  },
  methods: {
    back() {
      this.$store.commit("hideCDDetail");
    },
    changePlayingMode() {
      this.$store.commit("changePlayingMode");
    },
    playOrPause() {
      this.$store.commit("playOrPause");
    },
    preSong() {
      console.log("上");
      this.$store.commit("playPreMusic");
    },
    nextSong() {
      console.log("下");
      this.$store.commit("playNextMusic");
    },
    showNowPlayingList() {
      this.$store.commit("showPlayingSongList");
    }
  },
  created() {
    console.log(this.$store.getters.getPlayingState);
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
        margin-left: -18px;
        transform: rotate(0deg);
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
        padding: 0 15px;
        display: flex;
        align-items: center;
        .now-progress-time {
            width: 40px;
            color: #fff;
            font-size: 12px;
        }
        .whole-progress-time {
            width: 40px;
            color: #fff;
            font-size: 12px;
        }
        .progress-bar {
            flex: 1;
            background: orange;
            height: 2px;
        }
    }
    .operation-option {
      display: flex;
      align-items: center;
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
