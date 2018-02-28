<!-- 歌单列表组件 -->
<template>
  <div class="songSheet">
    <div class="each-songSheet">
      <!-- 事件修饰符stop 阻止事件继续传播 相当于阻止事件冒泡 -->
      <div class="summary-list-header" @click.stop="toggleIconAction">
        <i class="icon-down toggleicon" :class="[showList ? 'toggleiconDown' : 'toggleiconUp']"></i>
        <div class="summary-list-info">
          <span class="summary-list-name">{{ items.name }}</span>
          <span class="summary-list-count">({{ items.count }})</span>
        </div>
        <i class="setting icon-setting" @click.stop="songListSettingAction"></i>
      </div>
      <div class="all-songList" v-if="showList" v-for="item in items.detail" @click="showSongListDetail(item)">
        <div class="each-songList">
          <img :src="item.info[0].img_url" alt="" class="songList-cover">
          <!-- <div style="width: 50px;height: 50px;margin: 5px;background: orange;"></div> -->
          <div class="songList-detail" :class="{bottomBorder: hasBorder}">
            <div class="songList-info">
              <p class="songList-info-name">{{ item.name }}</p>
              <p class="songList-info-count">{{ item.count }}首歌曲</p>
            </div>
            <i class="option icon-list-circle" @click.stop="songListOperation"></i>
          </div>
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
      //异步存入数据
      this.$store.dispatch('setSheetsDetailInfo', listDetail);
      //同步修改详情页的显示
      this.$store.commit('showSheetsDetail');
    },
    songListSettingAction () {
      console.log('setting')
    },
    songListOperation () {
      console.log('operate')
      this.$store.commit('showOperation')
    }
  },
  props: ['items']
};
</script>

<style lang="scss">
@import "../../common/style/global.scss";
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
  display: flex;
  align-items: center;
  height: 60px;
  &:active {
    background: $list_active;
  }
  .songList-cover {
    width: 50px;
    height: 50px;
    margin: 5px;
  }
  .songList-detail {
    display: flex;
    align-items: center;
    flex: 1;
    height: 60px;
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
    .option {
      color: #666;
      text-align: right;
      font-size: 16px;
      padding: 20px;
    }
  }
}
</style>
