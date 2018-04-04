<template>
	<div class="header">
		<i class="icon-menu menu" @click="ShowMenu"></i>
		<div class="top-tabBar">
			<router-link tag="i" to="/myMusic">
				<i class="icon-music music"></i>
			</router-link>
			<router-link tag="i" to="/find">
				<i class="icon-wangyi wangyi"></i>
			</router-link>
			<router-link tag="i" to="/community">
				<i class="icon-community community"></i>
			</router-link>
		</div>  
		<i class="search icon-search"></i>
	</div>
</template>

<script>
export default {
	data () {
		return {

		}
	},
	methods: {
		ShowMenu () {
			this.$store.dispatch('showSideBar')
		}
	}
}
</script>

<style scoped lang="scss">
@import "../common/style/global.scss";
.header {
	height: 50px;
	background: $mainColor;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 10;
	.menu {
		font-size: 24px;
		padding: 13px 10px;
	}
	.search {
		font-size: 24px;
		padding: 13px 15px;
	}
	
	.top-tabBar {
		.router-link-active {
			i {
				color: $link-active;
			}
		}	
		.music,.wangyi,.community {
			font-size: 24px;
			padding: 0 5px;
			color: #e58983;
		}
	}
}
	
</style>