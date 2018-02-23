import Vue from 'vue'
import Router from 'vue-router'
import MyMusic from '@/components/Music/myMusic'
import Recommend from '@/components/Recommend/recommend'
import Community from '@/components/Community/community'
import VuexLearn from '@/components/vuexLearn/VuexLearn'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',
	    name: 'myMusic',
      redirect: '/myMusic'
    },
    {
      path: '/myMusic',
      name: 'myMusic',
      component: MyMusic
    },
    {
    	path: '/recommend',
	    component: Recommend,
	    name: 'recommend'
    },
    {
    	path: '/community',
	    component: Community,
	    name: 'Community'
    }
  ]
})
