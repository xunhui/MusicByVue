<template>
    <div class="operationList">
        <!-- <i :class="operationInfo.iconClass" class="icon"></i>
        <p class="title">{{ operationInfo.title }}</p> -->
        <i class="icon-more icon"></i>
        <div class="title">下载</div>
    </div>  
</template>

<script>
export default {
  data () {
      return {

      }
  },
  props: ['operationInfo']
}
</script>

<style lang="scss" scoped>
@import "../../common/style/global.scss";
.operationList {
    display: flex;
    align-items: center;
    height: 40px;
    .icon {
        height: 40px;
        width: 40px;
        color: $mainColor;
    }
    .title {
        color: #000;
        flex: 1;
        border-bottom: 1px solid $border_1px;
    }
}
</style>

