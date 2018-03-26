<template>
    <!-- 根模板不允许v-for指令 -->
    <div>
        <div class="operationList" v-for="item in iconInfo" :key="item.id">
            <i :class="item.iconClass" class="icon"></i>
            <p class="title">{{ item.iconText }}</p>
        </div>  
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["iconInfo"]
};
</script>

<style lang="scss">
@import "../../common/style/global.scss";
.operationList {
  display: flex;
  align-items: center;
  height: 50px;
  &:active {
    background: $list_active;
  }
  .icon {
    height: 50px;
    width: 50px;
    font-size: 26px;
    line-height: 50px;
    text-align: center;
    color: $mainColor;
  }
  .title {
    height: 50px;
    line-height: 50px;
    color: #000;
    flex: 1;
    border-bottom: 1px solid $border_1px;
  }
}
</style>

