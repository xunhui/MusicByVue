<!-- 播放列表组件 -->
<template>
  <div class="find">
    <clip-loader :loading="loading" :color="baseColor" :size="height" class="loading"></clip-loader>
    <div class="find-content" v-if="!loading">
      <swiper :options="swiperOption" class="myswiper">
      <swiper-slide v-for="banner in bannerList" :key="banner.id">
        <img class="bannerPic" :src="banner.pic" :alt="banner.typeTitle" @click.stop="goGitHub">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <recommend-list title="推荐歌单" :listInfo="recommendListInfo" type="1"></recommend-list>
      <recommend-list title="当前最热" :listInfo="hottestListInfo" type="2"></recommend-list>
      <recommend-list title="精品歌单" :listInfo="featuredListInfo" type="2"></recommend-list>
    </div>
  </div>
</template>

<script>                               
//轮播图插件
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import recommendList from './recommend'
import common from '@/common/js/common.js'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  data () {
    return {
      loading: false,
      baseColor: "#D23A31",
      height: "25px",
      swiperOption: {
        direction : 'horizontal',
        autoplay: {
          delay: 3000,
          loop: true,
          disableOnInteraction: false,//触碰后继续自动轮播
        },
        pagination: {
          el: '.swiper-pagination',
          bulletActiveClass: 'my-bullet-active'
        }
      },
      bannerList: [],
      recommendListInfo: [],
      hottestListInfo: [],
      featuredListInfo: []
    }
  },
  computed: {
    // bannerList () {
    //   return this.$store.getters.getBannerList;
    // }
  },
  components: {
    swiper,
    swiperSlide,
    recommendList,
    ClipLoader
  },
  methods: {
    goGitHub () {
      window.open('https://github.com/xunhui/MusicByVue')
    }
  },
  created () {
    this.loading = true;
    //轮播图接口
    this.$http.get('/banner').then( res => {
      this.bannerList = res.data.banners;
    })

    //推荐歌单接口 该接口会返回30个歌单 每次随机取6个展示 需要登录的那个接口暂时不会弄 待定
    this.$http.get('/top/playlist/highquality?limit=20&cat=流行').then( res => {
      this.recommendListInfo = common.getNFromArrRandom(res.data.playlists, 6);
    })

    //当前最热音乐
    this.$http.get('/top/playlist?limit=10&order=hot').then( res => {
      this.hottestListInfo = common.getNFromArrRandom(res.data.playlists, 6);
    })

    //网友精选音乐
    this.$http.get('/top/playlist/highquality?limit=20').then( res => {
      this.featuredListInfo = common.getNFromArrRandom(res.data.playlists, 6);
      this.loading = false;
    })
  },
  mounted () {

  }
}
</script>

<style lang="scss">
@import "../../common/style/global.scss";
//css实现宽高成比例:padding如果是百分比的话,那这个百分比是相对于其父元素的宽度而言的
//此处有个坑，如果把样式设置了scoped会导致自定义的swiper样式无法渲染，因为设置scoped后只有后缀为data-v-hash值的类才可被识别
.find {
  background: $baseColor;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 50px;
  z-index: 10;
  overflow: auto;
    &::-webkit-scrollbar {
      display: none;
  }
  .myswiper {
    width: 100%;
    .bannerPic {
      width: 100%;
      height: auto;
    }
    .my-bullet-active {
      opacity: 1;
      background: $mainColor;
    }
  }
  .loading {
    margin-top: 100px;
  }
}

</style>
