<!-- 播放列表组件 -->
<template>
  <div class="recommend">
    <swiper ref="myswiper" :options="swiperOption" class="myswiper">
      <swiper-slide v-for="banner in bannerList" :key="banner.id">
        <img class="bannerPic" :src="banner.pic" :alt="banner.typeTitle">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
//轮播图插件
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data () {
    return {
      swiperOption: {
        direction : 'horizontal',
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  computed: {
    bannerList () {
      return this.$store.getters.getBannerList;
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {

    this.$http.get('/banner').then( res => {
      this.$store.commit('setBannerList', res.data.banners);
    })
  },
  mounted () {
    let swiper = this.$refs.myswiper;
    console.log(swiper)
    this.$refs.myswiper.style.height = swiper.offsetWidth;
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/global.scss";
//css实现宽高成比例:padding如果是百分比的话,那这个百分比是相对于其父元素的宽度而言的
.recommend {
  background: $baseColor;
  .myswiper {
    width: 100%;
    .bannerPic {
      width: 100%;
      height: auto;
    }
  }
}
</style>
