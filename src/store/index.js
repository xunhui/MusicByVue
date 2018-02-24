import Vue from 'vue'
import Vuex from 'vuex'
import SideBar from './modules/sideBar.js'
import Music from './modules/music.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        sideBar: SideBar,
        music: Music
    }
})

export default store