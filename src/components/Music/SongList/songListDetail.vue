<!-- 歌单详情页 -->
<template>
  <transition name="slide">
    <div class="SongListDetail" ref="wholepage" v-show="ifShowDetail" @scroll="scrollTransition">
      <div class="navigation-bar" ref="headerbar">
        <i class="icon-back back" @click="backToPre"></i>
        <span class="navigation-bar-text">歌单</span>
        <!-- 歌单内搜索功能待实现 -->
        <!-- <i class="icon-search search"></i> -->
        <!-- <i class="icon-list-circle more"></i> -->
      </div>
      <div class="content">
        <div class="top" ref="top" v-if="coverDetailInfo">
        <!-- :style="{backgroundImage: `url(${coverImgURL})`, backgroundSize: '5000%', backgroundPosition: 'center'}" -->
          <div class="cover">
            <img :src="coverDetailInfo.coverImgUrl" class="cover-img">
            <div class="right-info">
              <p class="list-title">{{ coverDetailInfo.name }}</p>
              <!-- <p>{{ sheetsDetailInfo.user }}</p>
              不明白的为什么user对象存在 在下面取值的时候会提示user为undifined？ 
              用v-if解决该报错
              -->
              <div class="user-info" v-if="coverDetailInfo.creator">
                <img :src="coverDetailInfo.creator.avatarUrl" class="user-avatar">
                <span class="user-name">{{ coverDetailInfo.creator.nickname}}</span>
                <i class="icon-right next"></i>
              </div>
            </div>
          </div>
          <div class="operation">
            <div class="collect">
              <i class="icon-collect"></i>
              <p>收藏</p>
            </div>
            <div class="collect">
              <i class="icon-msg"></i>
              <p>评论</p>
            </div>
            <div class="collect">
              <i class="icon-share"></i>
              <p>分享</p>
            </div>
            <div class="collect">
              <i class="icon-download"></i>
              <p>下载</p>
            </div>
          </div>
          <div class="background-image">
            <img :src="coverDetailInfo.coverImgUrl"></img>
          </div>
        </div>
        <div class="bottom" v-if="!ifLoading">
          <div class="play-songlist-header">
              <i class="icon-play-detail playall-icon"></i>
              <span class="playall-title">播放全部</span>
              <span class="songlist-count">(共{{ sheetsDetailInfo.tracks.length }}首)</span>
              <div class="selectmore">
                <i class="icon-menu selectmore-icon"></i>
                <span class="selectmore-text">多选</span>
              </div>
          </div>
          <div class="all-playsonglist">
            <each-song v-for="(item, index) in sheetsDetailInfo.tracks" :list="item" :sheetsDetailInfo="sheetsDetailInfo" :index="index" :key="item.id"></each-song>
          </div>
          <div class="collect-amount">
            <p class="collect-amount-text">共有...只有我收藏hhh~</p>
          </div>
        </div>
        <scale-loader :loading="ifLoading" :color="baseColor" :height="height" class="loading"></scale-loader>
      </div>
    </div>
  </transition>
</template>

<script>
import eachSong from "./eachSong";
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
export default {
  data() {
    return {
      baseColor: "#D23A31",
      height: "25px"
    };
  },
  components: {
    eachSong,
    ScaleLoader
  },
  computed: {
    ifShowDetail() {
      return this.$store.getters.getSheetsDetailState;
    },
    coverDetailInfo () {
      return this.$store.getters.getCoverDetailInfo;
    },
    sheetsDetailInfo () {
      return this.$store.getters.getSheetsDetailInfo;
    },
    ifLoading () {
      return this.$store.getters.getShowLoadingState;
    }
  },
  methods: {
    backToPre() {
      this.$store.dispatch("hideSheetsDetail"); //隐藏歌单详情页
    },
    scrollTransition() {
      let transparentDistance =
        this.$refs.top.offsetHeight - this.$refs.headerbar.offsetHeight;
      let opacity = 0.05 + this.$refs.wholepage.scrollTop / transparentDistance;
      if (opacity < 0.6) {
        this.$refs.headerbar.style.background = `rgba(7, 17, 27, ${opacity})`;
      } else { 
        this.$refs.headerbar.style.background = "rgba(7, 17, 27, 0.6)";
      }
    }
  },
  created() {
    //已经在APP.vue中挂载到页面中了 所以点击后仅仅只是数据的改变而并不会重新创建
    console.log()
  },
  // 使用watch侦听器来侦听该页面的show or notshow状态 来实现每当重新显示该组件时滚动条回到最初位置
  watch: {
    ifShowDetail: function(newShow, oldShow) {
      this.$refs.wholepage.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss">
@import "../../../common/style/global.scss";
.SongListDetail {
  &.slide-enter,
  &.slide-leave-to {
    transform: translateY(100%);
  }
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  z-index: 15;
  background: $baseColor;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .navigation-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    align-items: center;
    color: #fff;
    z-index: 1;
    background: rgba(7, 17, 27, 0.05);
    i {
      font-size: 24px;
      padding: 13px 10px;
    }
    .more {
      padding: 13px 15px;
    }
    .navigation-bar-text {
      flex: 1;
      margin-left: 10px;
    }
    .navigation-bar-bg {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      z-index: -1;
    }
  }
  .content {
    .top {
      color: #fff;
      padding-top: 50px;
      position: relative;
      .cover {
        display: flex;
        padding: 30px 15px;
        .cover-img {
          width: 120px;
          height: 120px;
        }
        .right-info {
          flex: 1;
          padding-left: 20px;
          padding-top: 20px;
          .list-title {
            margin-bottom: 20px;
          }
          .user-info {
            display: flex;
            align-items: center;
            font-size: 12px;
            .user-name {
              margin-left: 8px;
            }
            .user-avatar {
              border-radius: 50%;
              width: 30px;
              height: 30px;
            }
            .next {
              margin-left: 5px;
            }
          }
        }
      }
      .operation {
        display: flex;
        align-items: center;
        padding: 0 0 10px 0;
        div {
          flex: 1;
          text-align: center;
          p {
            font-size: 14px;
          }
          i {
            font-size: 20px;
          }
        }
      }
      .background-image {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        filter: blur(10px);
      }
      .background-image img {
        width: 100%;
        height: 100%;
      }
    }
    .bottom {
      .play-songlist-header {
        display: flex;
        align-items: center;
        height: 50px;
        background: $baseColor;
        border-bottom: $border_1px;
        &:active {
          background: $list_active;
        }
        .playall-icon {
          width: 50px;
          text-align: center;
          font-size: 22px;
        }
        .playall-title {
          font-size: 16px;
          margin-left: 5px;
        }
        .songlist-count {
          color: #aaa;
          font-size: 15px;
          flex: 1;
        }
        .selectmore {
          display: flex;
          align-items: center;
          height: 50px;
          z-index: 100;
          .selectmore-icon {
            font-size: 22px;
            margin-right: 5px;
          }
          .selectmore-text {
            font-size: 15px;
            margin-right: 10px;
          }
        }
      }
      .collect-amount {
        height: 60px;
        line-height: 60px;
        &:active {
          background: $list_active;
        }
        .collect-amount-text {
          padding-right: 10px;
          margin-left: 50px;
          text-align: center;
          border-bottom: $border_1px;
        }
      }
    }
    .loading {
      margin-top: 100px;
    }
  }
}
</style>
