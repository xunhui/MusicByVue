<!-- 歌单详情页 -->
<template>
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
           <p class="list-title">这是一个歌单hhh</p>
           <div class="user-info">
             <img src="/static/images/avatar.jpg" class="user-avatar">
             <span class="user-name">我家猫爱吃鱼</span>
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
         
       </div>
       <play-songList></play-songList>
     </div>
   </div>
  </div>
</template>

<script>
import playSongList from "./playSongList"
export default {
  data () {
  	return {
  		ifShowDetail: true
  	}
  },
  components: {
  	playSongList
  },
  methods: {
    backToPre () {
      this.ifShowDetail = !this.ifShowDetail;
    }
  }
}
</script>

<style lang="scss">
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
  }
}
</style>
