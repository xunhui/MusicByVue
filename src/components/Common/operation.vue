<template>
    <div class="operation">
        <transition name="operationfade">
            <div class="mask" @click="hideOperation" v-show="ifShowOperation"></div>
        </transition>
        <transition name="operationslide">
            <div class="content" v-show="ifShowOperation">
                <div class="header">
                    <p class="header-title">歌单:我喜欢的音乐</p>
                </div>
                <operationList></operationList>
                <operationList></operationList>
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
.operationfade-enter, .operationfade-leave-to {
    opacity: 0;
  }
.operationfade-enter-active, .operationfade-leave-active {
    transition: opacity 0.3s;
  }

.operationslide-enter, .operationslide-leave-to {
  transform: translateY(100%);
}
.operationslide-enter-active, .operationslide-leave-active {
  transition: all 0.3s;
}
.mask {
  background: #000;
  opacity: 0.8;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

}
.content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: $baseColor;
  
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
