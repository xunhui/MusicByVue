<!-- 歌单详情页 -->
<template>
  <transition name="slide">
    <div class="SongListDetail" ref="wholepage" v-show="ifShowDetail" @scroll="scrollTransition">
      <div class="navigation-bar">
        <i class="icon-back back" @click="backToPre"></i>
        <span class="navigation-bar-text">歌单</span>
        <i class="icon-search search"></i>
        <i class="icon-list-circle more"></i>
        <!-- 根据封面图片来设定顶部背景色，感谢大神的思路-将封面图片水平垂直居中并放大很多很多倍作为背景图片呈现出类似背景渐变色的效果 -->
        <div class="navigation-bar-bg" ref="headerbar" v-if="sheetsDetailInfo.info" :style="{backgroundImage: 'url(' + coverImgURL + ')', backgroundSize: '6000%', backgroundPosition: 'center', opacity: 0}"></div>
      </div>
      <div class="content">
        <div class="top" ref="top" v-if="sheetsDetailInfo.info" :style="{backgroundImage: 'url(' + coverImgURL + ')', backgroundSize: '6000%', backgroundPosition: 'center'}">
          <div class="cover">
            <img :src="coverImgURL" class="cover-img">
            <div class="right-info">
              <p class="list-title">{{ sheetsDetailInfo.name }}</p>
              <!-- <p>{{ sheetsDetailInfo.user }}</p>
              不明白的为什么user对象存在 在下面取值的时候会提示user为undifined？ 
              用v-if解决该报错
              -->
              <div class="user-info">
                <img v-if="sheetsDetailInfo.user" :src="sheetsDetailInfo.user.avatar" class="user-avatar">
                <span class="user-name" v-if="sheetsDetailInfo.user">{{ sheetsDetailInfo.user.name }}</span>
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
        </div>
        <div class="bottom">
          <div class="play-songlist-header">
              <i class="icon-playdetail playall-icon"></i>
              <span class="playall-title">播放全部</span>
              <span class="songlist-count">(共{{ sheetsDetailInfo.count }}首)</span>
              <div class="selectmore">
                <i class="icon-menu selectmore-icon"></i>
                <span class="selectmore-text">多选</span>
              </div>
          </div>
          <div class="all-playsonglist">
            <play-songList v-for="(item, index) in sheetsDetailInfo.info" :list="item" :index="index" :key="item.id"></play-songList>
          </div>
          <div class="collect-amount">
            <p class="collect-amount-text">共有...只有我收藏hhh~</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import playSongList from "./playSongList";
export default {
  data() {
    return {};
  },
  components: {
    playSongList
  },
  computed: {
    ifShowDetail() {
      return this.$store.getters.getSheetsDetailState;
    },
    sheetsDetailInfo() {
      return this.$store.getters.getSheetsDetailInfo;
    },
    coverImgURL() {
      return this.$store.getters.getSheetsDetailInfo.info[0].img_url;
    }
  },
  methods: {
    backToPre() {
      this.$store.dispatch("hideSheetsDetail"); //隐藏歌单详情页
    },
    scrollTransition() {
      let transparentDistance =
        this.$refs.top.offsetHeight - this.$refs.headerbar.offsetHeight;
      let opacity = this.$refs.wholepage.scrollTop / transparentDistance;
      console.log(this.$refs.wholepage.scrollTop, transparentDistance, opacity)
      if (this.$refs.wholepage.scrollTop < transparentDistance) {
        this.$refs.headerbar.style.opacity = opacity;
        this.$refs.headerbar.style.filter = `alpha(opacity:${opacity * 100})`;
      } else {
        this.$refs.headerbar.style.opacity = 1;
        this.$refs.headerbar.style.filter = `alpha(opacity:${100})`;
      }
    }
  },
  created() {
    //已经在APP.vue中挂载到页面中了 所以点击后仅仅只是数据的改变
    console.log(this.$store.getters.getSheetsDetailInfo);
  },
  watch: {
    ifShowDetail: function(newShow, oldShow) {
      this.$refs.wholepage.scrollTop = 0;
    }
  }
  // 使用watch侦听器来侦听该页面的show or notshow状态 来实现每当重新显示该组件时滚动条回到最初位置
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
      .cover {
        display: flex;
        padding: 10px 15px;
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
        padding: 10px 0;
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
    }
    .bottom {
      .play-songlist-header {
        display: flex;
        align-items: center;
        height: 50px;
        background: $baseColor;
        border-bottom: 1px solid $border_1px;
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
          border-bottom: 1px solid $border_1px;
        }
      }
    }
  }
}
</style>
