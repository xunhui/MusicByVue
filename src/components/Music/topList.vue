<template>
  <div class="topList">
	<i :class="iconInfo" class="icon"></i>
	<div :class="{bottomBorder:hasBorder}" class="rightPart">
		<div class="detail-title">
			<span class="titleText">{{ titleText }}</span>
			<span class="titleCount">({{ titleCount }})</span>
		</div>
		<i v-if="isPlaying" class="icon-volume-medium playing"></i>
	</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  // props: {
  // 	iconInfo: {
  // 		type: String
  // 	},  
  // 	titleText: {
  // 		type: String,
  // 		default: "xunhui"
  // 	},
  // 	titleCount: {
  // 		type: Number,
  // 		default: 1
  // 	},
  // 	isPlaying: {
  // 		type: Boolean,
  // 		default: false
  // 	},
  // 	hasBorder: {
  // 		type: Boolean,
  // 		default: true
  // 	}
  // },
  props: ["iconInfo", "titleText", "titleCount", "isPlaying", "hasBorder"],
  data () {
  	return {

  	}
  }
}
</script>

<style lang="scss">
@import "../../common/style/global.scss";
.topList {
	height: 50px;
	display: flex;
	align-items: center;
	background: $baseColor;
	&:active {
        background: $list_active;
    }
	.icon {
		font-size: 22px;
		color: $mainColor;
		padding: 0 10px;
	}
	.bottomBorder {
		border-bottom: 1px solid $border_1px;
	}
	.rightPart {
		flex: 1;
		height: 50px;
		display: flex;
		align-items: center;
		.detail-title {
			flex: 5;
			display: flex;
			align-items: center;
			.titleText {
				color: #333;
				font-size: 15px;
			}
			.titleCount {
				margin-left: 5px;
				color:#aaa;
				font-size:10px;
			}
		}
		.playing {
			flex: 1;
			color: $mainColor;
			text-align: right;
			margin-right: 20px;
		}
	}
		
}

</style>
