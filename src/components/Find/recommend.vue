<template>
	<div class="recommend">
		<div class="recommend-title">
			<div class="recommend-title-decoration"></div>
			<p class="recommend-title-text">{{ title }}</p>
			<i class="icon-right icon"></i>
		</div>
		<!-- 显示六个-->
		<div class="recommend-list">
			<!-- 中间封面两侧有间距 -->
			<div class="each-recommend-list" v-for="(item, index) in listInfo" :class="{middleListStyle: (index+2)%3 == 0}" @click="showSongListDetail(item, item.id)">
				<img class="recommend-list-cover" :src="item.picUrl"></img>
				<img class="recommend-list-cover" :src="item.coverImgUrl"></img>
				<p class="recommend-list-title">{{ item.name }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			
		}
	},
	methods: {
		showSongListDetail (item, id) {
	      //将cover信息提取获取 优化用户体验
	      this.$store.commit('setCoverDetailInfo', item);
	      console.log(item)
	      //获取当前点击歌单的详细信息
	      let detailURL = "/playlist/detail?id=" + id.toString();
	      let listDetail = '';
	      this.$store.commit('showLoading');
	      this.$http.get(detailURL).then( res => {
	        this.$store.commit('hideLoading');
	        //歌单详情信息
	        listDetail = res.data.result;
	        this.$store.commit('setSheetsDetailInfo', listDetail);
	      }).catch( error => console.log(error))
	      //同步修改详情页的显示
	      this.$store.commit('showSheetsDetail');
	    },
	},
	props: ['title', 'listInfo', 'type']
}
</script>

<style lang="scss" scoped>
@import "../../common/style/global.scss";
.recommend {
	.recommend-title {
		display: flex;
		align-items: center;
		height: 50px;
		.recommend-title-decoration {
			background: $mainColor;
			height: 21px;
			width: 3px;
		}
		.recommend-title-text {
			margin-left: 8px;
		}
	}
	.recommend-list {
		display: flex;
		flex-wrap: wrap;
		.each-recommend-list {
			width: 32%;
			padding-bottom: 20px;
			.recommend-list-cover {
				width: 100%;
				height: auto;
			}
			.recommend-list-title {
				padding-right: 15px;
				padding-left: 5px;
				font-size: 12px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			
		}	
	}
}
.middleListStyle {
	padding: 0 2%;
}
</style>