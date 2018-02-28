<template>
    <div class="operation">
        <transition name="fade">
            <div class="mask" @click="hideOperation" v-show="ifShowOperation"></div>
        </transition>
        <transition name="slide">
            <div class="content" v-show="ifShowOperation">
                <div class="header">
                    <p class="header-title">歌单:我喜欢的音乐</p>
                </div>
                <operationList></operationList>
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
    }
  },
  methods: {
      hideOperation () {
          this.$store.commit('hideOperation')
      }
  }
};
</script>

<style lang="scss">
@import "../../common/style/global.scss";
.mask {
  background: #000;
  opacity: 0.8;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
.content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: $baseColor;
  z-index: 100;
  .header {
      height: 50px;
      line-height: 50px;
      .header-title {
          color: #aaa;
          font-size: 12px;
          margin-left: 8px;
      }
  }
}
</style>
