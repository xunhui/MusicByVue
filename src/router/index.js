import Vue from 'vue'
import Router from 'vue-router'
import MyMusic from '@/components/Music/myMusic'
import Find from '@/components/Find/find'
import Community from '@/components/Community/community'

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
    	path: '/find',
	    component: Find,
	    name: 'find'
    },
    {
    	path: '/community',
	    component: Community,
	    name: 'Community'
    }
  ]
})
