<template>
    <div class="operation">
        <transition name="fade">
            <div class="mask" @click="hideOperation" v-show="ifShowOperation"></div>
        </transition>
        <transition name="slide">
            <div class="content" v-show="ifShowOperation">
                <div class="header">
                  <!-- 歌曲 -->
                  <p class="header-title" v-if="operationInfo.songName">歌曲:{{ operationInfo.songName }}</p>
                  <!-- 歌单 -->
                  <p class="header-title" v-if="operationInfo.songListName">歌单:{{ operationInfo.songListName }}</p>
                  <!-- 其他 -->
                  <p class="header-title" v-if="operationInfo.title">{{ operationInfo.title }}</p>
                </div>
                <operationList :iconInfo="operationInfo.iconInfo"></operationList>
            </div>
        </transition>
    </div>
</template>

<script>
import operationList from "./operationList";
export default {
  data() {
    return {};
  },
  components: {
    operationList: operationList
  },
  computed: {
    ifShowOperation () {
      return this.$store.getters.getShowOperationState;
    },
    operationInfo () {
      return this.$store.getters.getOperationInfo;
    }
  },
  methods: {
    hideOperation() {
      this.$store.commit("hideOperation");
    }
  }
};
</script>

<style lang="scss">
@import "../../common/style/global.scss";
.operation {
  .mask {
    background: #000;
    opacity: 0.8;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }
    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 0.3s;
    }
  }
  .content {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    max-height: 250px;
    &::-webkit-scrollbar {
      display: none;
    }
    background: $baseColor;
    z-index: 21;
    padding-bottom: 10px;   
    &.slide-enter,
    &.slide-leave-to {
      transform: translateY(100%);
    }
    &.slide-enter-active,
    &.slide-leave-active {
      transition: all 0.3s;
    }
    .header {
      padding-top: 20px;
      padding-bottom: 5px;
      .header-title {
        color: #666;
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }
}
</style>
