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
      default: 40
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
.sideBarList {
  display: flex;
  background: #fff;
  align-items: center;
  .left-info {
    display: flex;
    align-items: center;
    flex: 5;
    .list-icon {
      color: #999;
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
    color: #999;
    text-align: right;
    margin-right: 15px;
  }
}
</style>
