<template>
  <div class="songSheet">
    <div class="each-songSheet" v-for="EachSheet in SheetsInfo" :key="EachSheet.id">
      <div class="summary-list-header" @click="toggleIconAction">
        <i class="icon-down toggleicon" :class="[showList ? 'toggleiconDown' : 'toggleiconUp']"></i>
        <div class="summary-list-info">
          <span class="summary-list-name">{{ EachSheet.name }}</span>
          <span class="summary-list-count">({{ EachSheet.count }})</span>
        </div>
        <i class="setting icon-setting"></i>
      </div>
      <div class="all-songList" v-if="showList" v-for="SongList in EachSheet.detail">
        <div class="each-songList">
          <img :src="SongList.info[0].img_url" alt="" class="songList-cover">
          <!-- <div style="width: 50px;height: 50px;margin: 5px;background: orange;"></div> -->
          <div class="songList-detail" :class="{bottomBorder: hasBorder}">
            <div class="songList-info">
              <p class="songList-info-name">{{ SongList.name }}</p>
              <p class="songList-info-count">{{ SongList.count }}首歌曲</p>
            </div>
            <i class="option icon-list-circle"></i>
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
    toggleIconAction() {
      this.showList = !this.showList;
    }
  },
  computed: {
    SheetsInfo () {
      return this.$store.getters.getMusicSheetsInfo;
    }
  }
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
    flex: 6;
    font-size: 12px;
  }
  .setting {
    flex: 1;
    text-align: right;
    font-size: 18px;
    margin-right: 20px;
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
      flex: 6;
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
      flex: 1;
      text-align: right;
      font-size: 16px;
      margin-right: 20px;
    }
  }
}
</style>
