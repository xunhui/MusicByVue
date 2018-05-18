<template>
    <transition name="slide">
      <!-- 阻止默认事件 避免移动过快时导致触碰相邻元素而触发点击事件-- -->
      <!-- 已被事件冒弄哭 -->
        <div class="CD-detail" v-show="ifShowCDDetail" @mousemove.prevent="Draging" @mouseup.prevent="stopDrag">
            <div class="top-bar">
                <i class="back icon-back" @click.stop="back"></i>
                <div class="music-info">
                    <p class="music-name">{{ playingSongInfo.name }}</p>
                    <p class="music-singer">{{ getArtistsAlbumInfo.artists }}</p>
                </div>
                <i class="share icon-share"></i>
            </div>
            
            <div class="voice-and-lyrics" v-show="ifShowLyrics" @click="toggleShowContent">
                <!-- 音量进度条 进度条可封装 写在一个组件里可以说相当冗余了... 涉及状态较多暂时不改了...-->
                <div class="voice-control">
                  <span class="voice-icon icon-volume-medium"></span>
                  <div class="whole-voice-bar" @click.stop="setJumpPosition" ref="wholeVoice" type="voice">
                    <div class="now-voice-bar" @click.stop="setJumpPosition" ref="nowVoice" type="voice" :style="currentVoiceWidth"></div>
                    <span class="indicator" ref="indicator" :style="currentVoiceOffset" @mousedown.stop="beginDrag" type="voice" @click.stop="myMouseISUp"></span>
                  </div>
                </div>
                <h1 style="height: 300px;">Lyrics</h1>
            </div>
            <div class="CD-content" v-show="!ifShowLyrics" @click="toggleShowContent">
              <div class="border-top"></div>
              <div class="CD-switch">
                  <img class="switch-image" :class="{switchOn: playingState,switchOff: !playingState}" src="../../../../static/images/switch.png" alt="DropTheBeat">
              </div>
              <div class="CD-poster" :class="{posterOff: !playingState}">
                  <img class="cd-image" src="../../../../static/images/cd-mine.png" alt="CD">
                  <img class="poster-image" :src="playingSongInfo.album.blurPicUrl" alt="CD">
              </div>
            </div> 
           
            <div class="CD-control">
                <!-- 播放进度条 -->
                <div class="progress-control">
                    <span class="now-progress-time">{{ currentFixedTime }}</span>
                    <div class="whole-progress-bar" @click.stop="setJumpPosition" ref="wholeProgress" type="duration">
                      <div class="now-progress-bar" @click.stop="setJumpPosition" ref="nowprogress" type="duration" :style="currentDurationWidth"></div>
                      <!-- mousedown和mouseup会构成click事件 阻止此处事件冒泡即可 -->
                      <span class="indicator" ref="indicator" :style="currentDurationOffset" @mousedown.stop="beginDrag" type="duration" @click.stop></span>
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
      nowProgressType: "duration", //进度条类型 duration|voice
      durationBar: "",
      voiceBar: "",
      currentTime: 0,
      initialDurationOffset: -6,
      currentDurationOffset: {},
      currentDurationWidth: {},
      initialVoiceOffset: -5,
      currentVoiceOffset: {},
      currentVoiceWidth: {},
      playTimer: -1,
      canDrag: false,
      ifMouseDown: false,
      initialOffsetX: -6,
      ifShowLyrics: false
    }
  },
  computed: {
    playingState() {
      return this.$store.getters.getPlayingState;
    },
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
    },
    currentFixedTime() {
      return common.getFormatTimeFromDuration(this.currentTime);
    },
    wholeFixedDuration() {
      return common.getFormatTimeFromDuration(
        this.$store.getters.getAudioDuration
      );
    }
  },
  methods: {
    back() {
      this.$store.commit("hideCDDetail");
    },
    myMouseISUp() {
      this.ifMouseDown = false;
    },
    toggleShowContent(event) {
      event = event || window.event;
      //mousedown记录下的offsetX与此时不等说明是由mousedown和mouseup合成的click
      if (this.initialOffsetX  != event.offsetX && this.ifMouseDown == true) {
        console.log('combine')
        this.ifMouseDown = false;
      } else {
        console.log('click')
        this.ifShowLyrics = !this.ifShowLyrics;
      }
    },
    //进度条点击事件
    setJumpPosition(event) {
      event = event || window.event;
      console.log(event, event.offsetX);
      this.nowProgressType = event.target.getAttribute("type");
      let offsetX = event.offsetX,
        wholeWidth;
      //判断进度条类型 分别进行操作
      if (this.nowProgressType == "duration") {
        wholeWidth = this.$refs.wholeProgress.offsetWidth;
      } else if (this.nowProgressType == "voice") {
        console.log(this.$refs.wholeVoice);
        wholeWidth = this.$refs.wholeVoice.offsetWidth;
      }
      let percent = offsetX / wholeWidth;
      console.log(percent);
      let jumpTime = percent * this.$store.getters.getAudioDuration;
      if (this.nowProgressType == "duration") {
        this.$store.getters.getAudioItSelf.currentTime = jumpTime;
        this.currentTime = jumpTime;
        this.currentDurationOffset = {left: `calc(${percent*100}% + ${this.initialDurationOffset}px)`};
        this.currentDurationWidth = {width: `${percent*100}%`};
      } else if (this.nowProgressType == "voice") {
        this.$store.getters.getAudioItSelf.volume = percent;
        this.currentVoiceOffset = {left: `calc(${percent*100}% + ${this.initialVoiceOffset}px)`};
        this.currentVoiceWidth = {width: `${percent*100}%`};
      }
    },
    //鼠标拖拽事件
    beginDrag(event) {
      this.canDrag = true;
      this.nowProgressType = event.target.getAttribute("type");
      if (this.nowProgressType == "voice")
        this.ifMouseDown = true;
      console.log(event.target.getAttribute("type"));
      //先获取mousedown时的初始偏移量 利用该记录判断点击事件是由用户点击还是由于mousedown和mouseup合成
      this.initialOffsetX = event.offsetX;
      console.log("begin初始偏移量", this.initialOffsetX);
    },
    Draging(event) {
      let fixedValue, minOffset, maxOffset, wholeWidth, currentOffset;
      switch (this.nowProgressType) {
        case "duration": {
          fixedValue = 50;
          minOffset = -6;
          maxOffset = this.$refs.wholeProgress.offsetWidth - 6;
          wholeWidth = this.$refs.wholeProgress.offsetWidth;
          break;
        }
        case "voice": {
          fixedValue = 60;
          minOffset = -5;
          maxOffset = this.$refs.wholeVoice.offsetWidth - 5;
          wholeWidth = this.$refs.wholeVoice.offsetWidth;
          break;
        }
      }
      if (this.canDrag == true) {
        event = event || window.event;
        //拖动过程中的偏移量即起始点和指示器左侧的距离
        currentOffset = event.clientX - this.initialOffsetX - fixedValue;
        //控制拖动范围
        if (currentOffset < minOffset) {
          currentOffset = minOffset;
        }
        if (currentOffset > maxOffset) {
          currentOffset = maxOffset;
        }
        let percent = (currentOffset - minOffset) / wholeWidth;
        if (this.nowProgressType == "duration") {
          this.currentTime = percent * this.$store.getters.getAudioDuration;
          this.$store.getters.getAudioItSelf.currentTime = this.currentTime;
          this.currentDurationOffset = {left: `calc(${percent*100}% + ${this.initialDurationOffset}px)`};
          this.currentDurationWidth = {width: `${percent*100}%`};
        } else if (this.nowProgressType == "voice") {
          //音量必须是介于 0.0 与 1.0 之间的数字。
          this.$store.getters.getAudioItSelf.volume = percent;
          this.currentVoiceOffset = {left: `calc(${percent*100}% + ${this.initialVoiceOffset}px)`};
          this.currentVoiceWidth = {width: `${percent*100}%`};
        }
      }
    },
    stopDrag(event) {
      if (this.canDrag == true) {
        this.canDrag = false;
        //结束拖拽后将音频播放时间置于此
        console.log("stop", event.offsetX, event.clientX);
      }
    },
    //音频播放事件
    audioPlay(event) {
      let that = this;
      if (event == "play") {
        clearInterval(this.playTimer);
        this.playTimer = setInterval(function() {
          //----此处注意this的指向
          let currentTime = that.$store.getters.getAudioItSelf.currentTime;
          let wholeDuration = that.$store.getters.getAudioDuration;
          let percent = currentTime / wholeDuration;
          //修改当前播放时间，音频信息，播放进度条和指示器位置
          that.currentTime = currentTime;
          that.currentDurationOffset = {left: `calc(${percent*100}% + ${that.initialDurationOffset}px)`};
          that.currentDurationWidth = {width: `${percent*100}%`};
        }, 1100);
      } else if (event == "pause") {
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
      this.currentTime = 0;
      this.currentWidth = 0;
      this.currentDurationOffset = {left: `cal(0% + ${this.initialDurationOffset})`};
      this.currentDurationWidth = {width: "0%"};
      this.$store.commit("playPreMusic");
    },
    nextSong() {
      this.currentTime = 0;
      this.currentWidth = 0;
      this.currentDurationOffset = {left: `cal(0% + ${this.initialDurationOffset})`};
      this.currentDurationWidth = {width: "0%"};
      this.$store.commit("playNextMusic");
    },
    showNowPlayingList() {
      this.$store.commit("showPlayingSongList");
    }
  },
  watch: {
    playingState: function(newState, oldState) {
      //play
      if (newState == true) {
        this.audioPlay("play");
      } else {
        //pause
        console.log("该停了");
        this.audioPlay("pause");
      }
    }
  },
  created() {
    this.currentDurationOffset = {left: `calc(0% + ${this.initialDurationOffset}px)`};
    this.currentDurationWidth = {left: `calc(0%)`};
    this.currentVoiceOffset = {left: `calc(100% + ${this.initialVoiceOffset}px)`};
    this.currentVoiceWidth = {width: `100%`};
  },
  mounted() {
    this.$nextTick(() =>{
      // console.log(this.$refs.wholeVoice, this.$refs.wholeVoice.offsetWidth, this.$refs.wholeVoice.style.width)
      // this.currentVoiceOffset = this.$refs.wholeVoice.offsetWidth;
    })
  }
};
</script>

<style lang="scss" scoped>
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
  // 渐入渐出无效 暂不知如何放样式的位置
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
  }
  &.fade-enter-active,
  &.fade-leave-active {
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
  }
  .voice-and-lyrics {
    .voice-control {
      padding: 0 40px 0 0;
      display: flex;
      align-items: center;
      .voice-icon {
        width: 60px;
        text-align: center;
        color: #b8b5b3;
      }
      .whole-voice-bar {
        flex: 1;
        position: relative;
        background: $sub_iconcolor;
        height: 3px;
        border-radius: 8px;
        cursor: pointer;
        .now-voice-bar {
          position: absolute;
          top: 0;
          left: 0;
          background: #b8b5b3;
          height: 3px;
          border-radius: 8px;
        }
        .indicator {
          position: absolute;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background: #fff;
          top: -3.5px;
          cursor: pointer;
        }
      }
    }
  }
  .CD-content {
    overflow: hidden;
    position: relative;
    .border-top {
      height: 1px;
      background: -webkit-linear-gradient(
        left,
        transparent,
        rgba(255, 255, 255, 0.5),
        transparent
      ); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(
        right,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      ); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(
        right,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      ); /* Firefox 3.6 - 15 */
      background: linear-gradient(
        to right,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      ); /* 标准的语法（必须放在最后） */
      position: absolute;
      top: 0;
      left: 60px;
      right: 50px;
    }
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
