<!-- 歌单列表组件 -->
<template>
  <div class="songSheet">
    <div class="each-songSheet">
      <!-- 事件修饰符stop 阻止事件继续传播 相当于阻止事件冒泡 -->
      <!-- <div class="summary-list-header" @click.stop="toggleIconAction">
        <i class="icon-down toggleicon" :class="[showList ? 'toggleiconDown' : 'toggleiconUp']"></i>
        <div class="summary-list-info">
          <span class="summary-list-name">{{ items.name }}</span>
          <span class="summary-list-count">({{ items.count }})</span>
        </div>
        <i class="setting icon-setting" @click.stop="songListSettingAction(items.name)"></i>
      </div> -->
      <div class="all-songList" v-if="showList">
        <div class="each-songList" @click="showSongListDetail(items.id)">
          <div class="songList-detail" :class="{bottomBorder: hasBorder}">
            <img :src="items.coverImgUrl" alt="" class="songList-cover">
            <div class="songList-info">
              <p class="songList-info-name">{{ items.name }}</p>
              <p class="songList-info-count">{{ items.trackCount }}首歌曲</p>
            </div>
          </div>
          <i class="option icon-list-circle" @click.stop="songListOperation(items.name)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "songList",
  data() {
    return {
      hasBorder: true,
      showList: true
    };
  },
  methods: {
    toggleIconAction () {
      this.showList = !this.showList;
    },
    showSongListDetail (listDetail) {
      //存入歌单的id
      this.$store.dispatch('setSheetsDetailInfo', listDetail);
      //同步修改详情页的显示
      this.$store.commit('showSheetsDetail');
    },
    songListSettingAction (title) {
      console.log('setting')
      this.$store.commit('showOperation', {
        title: title,
        iconInfo: [
          {
            iconText: '删除',
            iconClass: 'icon-delete'
          },
          {
            iconText: '编辑',
            iconClass: 'icon-edit'
          }
        ]
      })
    },
    songListOperation (name) {
      console.log('operate')
      //显示操作子页面 同时将歌单名,icontext,iconClass等数据传入
      this.$store.commit('showOperation', {
        songListName: name,
        iconInfo: [
          {
            iconText: '下载',
            iconClass: 'icon-download'
          },
          {
            iconText: '分享',
            iconClass: 'icon-share'
          },
          {
            iconText: '删除',
            iconClass: 'icon-delete'
          },
        ]
      })
    }
  },
  props: ['items'],
  created () {
    console.log(this.items)
  }
};
</script>

<style lang="scss">
@import "../../../common/style/global.scss";
.summary-list-header {
  display: flex;
  align-items: center;
  background: #e7e9e9;
  color: #666;
  .toggleicon {
    font-size: 14px;
    padding: 8px 10px;
    transition: all 0.5s;
  }
  .toggleiconDown {
    transform: rotate(0);
  }
  .toggleiconUp {
    transform: rotate(-90deg);
  }
  .summary-list-info {
    flex: 1;
    font-size: 12px;
  }
  .setting {
    text-align: right;
    font-size: 18px;
    padding: 0 20px;
  }
}

.bottomBorder {
  border-bottom: 1px solid $border_1px;
}

.each-songList {
  height: 60px;
  position: relative;
  .songList-detail {
    display: flex;
    align-items: center;
    flex: 1;
    height: 60px;
    &:active {
      background: $list_active;
    }
    .songList-cover {
      width: 50px;
      height: 50px;
      margin: 5px;
    } 
    .songList-info {
      flex: 1;
      margin-left: 5px;
      .songList-info-name {
        font-size: 16px;
      }
      .songList-info-count {
        margin-top: 5px;
        color: #666;
        font-size: 12px;
      }
    }
  }
  .option {
    color: #666;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    position: absolute;
    top: 0;
    right: 0;
    &:active {
      background: $list_active;
    }
  }
}
</style>
