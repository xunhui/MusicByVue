<!-- 歌单内的播放列表组件 -->
<template>
  <div class="eachSong">
    <div class="song-detail" @click="playIndex(index)">  
      <!-- 需要判断当前所听音乐在对应的哪个歌单，解决每个歌单的相同index位置都是播放状态bug 用了一个比较蠢的方法（判断当前显示歌单和播放歌单是否是同一个id）-->
      <i class="icon-volume-medium left" v-show="playingSongListID == showingSongListID && currentIndex == index"></i>
      <p class="song-index left" v-show="playingSongListID != showingSongListID || currentIndex != index">{{ index+1 }}</p>
      <div class="song-info">
        <p class="song-name">{{ list.name }}</p>
        <p class="song-artists">{{ getArtistsAlbumInfo(list).artistsAndAlbum }}</p>  
      </div>
    </div>
    <div class="border-1px"></div>
    <i class="icon-list-circle more" @click="showMoreOperation(list.name)"></i>
  </div>
</template>

<script>
import common from '@/common/js/common.js'
export default {
  data () {
  	return {
      //不能给每个组件绑定一个当前index数据
  	}
  },
  props: ['list', 'index','sheetsDetailInfo'],
  computed: {
    currentIndex () {
      return this.$store.getters.getPlayingSongIndex;
    },
    playingSongListID () {
      return this.$store.getters.getPlayingSongListID;
    },
    showingSongListID () {
     return this.sheetsDetailInfo.id; 
    }
  },
  methods: {
    playIndex (index) {
      let obj = {};
      //this.list.artistsAlbum = this.getArtistsAndAlbum(this.list);
      obj.index = index;
      obj.sheetsDetailInfo = this.sheetsDetailInfo;
      console.log(obj);
      this.$store.commit('playIndexMusic', obj);
    },
    showMoreOperation (songName) {
      this.$store.commit('showOperation', {
        songName: songName,
        iconInfo: [
          {
            iconText: '收藏到歌单',
            iconClass: 'icon-add-project'
          },
          {
            iconText: '下载',
            iconClass: 'icon-download'
          },
          {
            iconText: '评论' + '(2333)',
            iconClass: 'icon-msg'
          },
          {
            iconText: '分享',
            iconClass: 'icon-share'
          },
          {
            iconText: '歌手:' + this.getArtistsAlbumInfo(this.list).artists,
            iconClass: 'icon-collect'
          },
          {
            iconText: '删除',
            iconClass: 'icon-delete'
          }
        ]
      })
    },
    getArtistsAlbumInfo (obj) {
      return common.artistsAlbumInfo(obj);
    }
  }
}
</script>

<style lang="scss">
//为了实现点击more_icon时只有此处高亮...尝试了很蛋疼绝对定位的的写法把icon从整个列表文档流中分出去..个人觉得写的话还是用JS来实现靠谱
@import "../../../common/style/global.scss";
.eachSong {
  height: 60px;
  background: $baseColor;
  position: relative;
  .song-detail {
    display: flex;
    align-items: center;
    &:active {
      background: $list_active;
    }
    .left {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .icon-volume-medium {
      color: $mainColor; 
    }
    .song-index {
      font-size: 17px;
    }
    .song-info {
      margin-left: 5px;
      flex: 1;
      
      @media (max-width: 320px) { 
        .song-name {
          max-width: 190px;
          font-size: 14px;
        }
        .song-artists {
          max-width: 190px;
        }
      }
           
      @media (min-width: 321px) and (max-width: 375px) { 
        .song-name {
          max-width: 250px;
          font-size: 16px;
        }
        .song-artists {
          max-width: 250px;
        }
      }

      @media (min-width: 376px) and (max-width: 414px) { 
        .song-name {
          max-width: 290px;
          font-size: 16px;
        }
        .song-artists {
          max-width: 290px;
        }
      }

      @media (min-width: 414px) { 
        .song-name {
          font-size: 16px;
        }
      }
      

      .song-name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .song-artists {
        margin-top: 5px;
        color: $subtext_color;
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

  }
  .border-1px {
    height: 1px;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 65px;
    background: rgba(7, 17, 27, 0.1);
  }
  .more {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: $sub_iconcolor; 
    &:active {
      background: $list_active;
    }
  }
}
</style>
