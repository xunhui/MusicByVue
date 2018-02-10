<template>
	<div class="header">
		<i class="icon-menu menu"></i>
		<div class="top-tabBar">
			<router-link tag="i" to="/myMusic">
				<i class="icon-music music"></i>
			</router-link>
			<router-link tag="i" to="/recommend">
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
	
</script>

<style scoped lang="scss">
@import "../common/style/global.scss";
.header {
	background: $mainColor;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.menu,.search {
		font-size: 26px;
		padding: 10px;
	}
	.top-tabBar {
		.music,.wangyi,.community {
			font-size: 26px;
			padding: 0 5px;
		}
	}
}
	
</style>