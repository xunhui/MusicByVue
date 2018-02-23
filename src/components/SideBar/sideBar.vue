<template>
  <div class="sidebar">
      <transition name="fade">
          <div class="sidebar-mask" @click="hideSideBar" v-show="isShow"></div>
      </transition>
      <transition name="slide">
          <div class="sidebar-content" v-show="isShow">
            <div class="top-personalinfo">
              <img src="../../../static/images/userlogo.jpg" class="avatar-img">
              <div class="user-info">
                <div class="user-left-info">
                  <span class="user-name">xunhui</span>
                  <span class="user-level">Lv.7</span>
                </div>
                <div class="user-right-info user-signin">
                  <i class=""></i>
                  SignIn
                </div>
              </div>
            </div>
            <div class="bottom-list">
              <sideBarList iconClass="icon-message" listText="我的消息"></sideBarList>
              <sideBarList iconClass="icon-vip" listText="我的会员"></sideBarList>
              <sideBarList iconClass="icon-market" listText="商城" ></sideBarList>
              <sideBarList iconClass="icon-friend" listText="我的好友" ></sideBarList>
              <sideBarList iconClass="icon-place" listText="附近的人"></sideBarList>
              <sideBarList iconClass="icon-theme" listText="个性换肤"></sideBarList>
              <sideBarList iconClass="icon-set-time" listText="定时播放"></sideBarList>
              <sideBarList iconClass="icon-lock" listText="音乐闹钟"></sideBarList>
              <sideBarList iconClass="icon-car" listText="驾驶模式"></sideBarList>
              <sideBarList iconClass="icon-cloud" listText="音乐云盘"></sideBarList>
            </div>
          </div>
      </transition>
  </div>
</template>

<script>
import sideBarList from './sideBarList'
export default {
  data () {
      return {
        
      }
  },
  computed: {
      isShow () {
          return this.$store.state.sideBar.isShow;
      }
  },
  methods: {
      hideSideBar () {
          this.$store.dispatch('hideSideBar')
      }
  },
  components: {
    sideBarList
  }
}
</script>

<style lang="scss" scoped>
.sidebar-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.8;
    z-index: 99;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}
.fade-enter-active, .fade-leave-active {
    transition: all .3s;
}
.sidebar-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
    z-index: 100;
    .top-personalinfo {
      position: relative;
      height: 180px;
      background: url('../../../static/images/sidebarBg.jpg');
      width: 100%;
      background-size: cover;
      display: flex;
      .avatar-img {
        position: absolute;
        bottom: 50px;
        left: 15px;
        border-radius: 50%;
        width: 70px;
        height: 70px;
      }
      .user-info {
        display: flex;
        align-items: center;
        width: 285px;
        color: #fff;
        font-size: 16px;
        padding: 15px 0;
        position: absolute;
        bottom: 0;
        left: 15px;
        .user-left-info {
          flex: 3;
          .user-name {
            font-size: 20px;
            margin-right: 10px;
            vertical-align: middle;
            text-align: center;
          }
          .user-level {
            border-radius: 15px;
            padding: 0 8px;
            border: 1px solid #fff;
            font-size: 12px;
            vertical-align: middle;
            text-align: center;
          }
        }
        .user-right-info {
          flex: 1;
          border-radius: 15px;
          padding: 2px 8px;
          border: 1px solid #fff;
          margin-right: 10px;
          text-align: center;
        }
      }
    }

}
.slide-enter, .slide-leave-to {
  transform: translateX(-300px);
}
.slide-enter-active, .slide-leave-active {
  transition: all .3s;
}

</style>
