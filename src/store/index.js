import Vue from 'vue'
import Vuex from 'vuex'
import SideBar from './modules/sideBar.js'

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
        sideBar: SideBar
    }
})

export default store