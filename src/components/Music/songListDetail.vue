<!-- 歌单详情页 -->
<template>
  <transition class="slide">
    <div class="SongListDetail" v-show="ifShowDetail">
      <div class="navigation-bar">
        <i class="icon-back back" @click="backToPre"></i>
        <span class="navigation-bar-text">歌单</span>
        <i class="icon-search search"></i>
        <i class="icon-list-circle more"></i>
      </div>
      <div class="content">
        <div class="top">
          <div class="cover">
            <img src="/static/logo.png" class="cover-img">
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
          <play-songList v-for="(item, index) in sheetsDetailInfo.info" :list="item" :index="index" :key="item.id"></play-songList>
          <div class="collect-amount">
            <p class="collect-amount-text">共有...只有我收藏hhh~</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import playSongList from "./playSongList"
export default {
  data () {
  	return {
  		
  	}
  },
  components: {
  	playSongList
  },
  computed: {
    ifShowDetail () {
      return this.$store.getters.getSheetsDetailState;
    },
    sheetsDetailInfo () {
      return this.$store.getters.getSheetsDetailInfo;
    }
  },
  methods: {
    backToPre () {
      this.$store.dispatch('hideSheetsDetail')//隐藏歌单详情页
    }
  },
  created () {
    //已经在APP.vue中挂载到页面中了 所以点击后仅仅只是数据的改变
  }
}
</script>

<style lang="scss">
@import "../../common/style/global.scss";
.slide-enter {

}
.SongListDetail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 50px;
  z-index: 99;
  background: orange;
  
  .navigation-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    align-items: center;
    color: #fff;
    i {
      font-size: 24px;
      padding: 0 10px;
    }
    .more {
      padding: 0 15px;
    }
    .navigation-bar-text {
      flex: 1;
      margin-left: 10px;
    }
  }
  .content {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: 50px;
    background: $baseColor;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .top {
      background: red;
      color: #fff;
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
