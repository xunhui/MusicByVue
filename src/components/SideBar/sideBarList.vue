<template>
  <div class="sideBarList" :style="{height: listHeight + 'px'}">
    <div class="left-info">
      <i :class="iconClass" class="list-icon"></i>
      <span class="list-text">{{ listText }}</span>
    </div>
    <span class="list-right-attached">{{ Attached }}</span>
  </div>
</template>

<script>
export default {
  data () {
  	return {
  		
  	}
  },
  props: {
    listHeight: {
      type: Number,
      default: 50
    },
    iconClass: {
      type: String
    },
    listText: {
      type: String
    },
    Attached: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
// :active选择器适用于所有元素，不仅限于链接a元素
// :focus 选择器用于选取获得焦点的元素。仅接收键盘事件或其他用户输入的元素允许 :focus 选择器。
// :active，元素被点击时变色，但颜色在点击后消失
// :focus， 元素被点击后变色，且颜色在点击后不消失
@import "../../common/style/global.scss";
.sideBarList {
  display: flex;
  background: #fff;
  align-items: center;
  &:active {
    background: $list_active;
  }
  .left-info {
    display: flex;
    align-items: center;
    flex: 5;
    .list-icon {
      color: $sub_iconcolor;
      font-size: 24px;
      margin-left: 15px;
    }
    .list-text {
      color: #000;
      font-size: 16px;
      margin-left: 20px;
      line-height: 24px;
    }
  }
  .list-right-attached {
    flex: 1;
    line-height: 24px;
    color: $sub_iconcolor;
    text-align: right;
    margin-right: 15px;
    font-size: 12px;
  }
}
</style>
