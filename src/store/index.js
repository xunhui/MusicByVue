import Vue from 'Vue'
import Vuex from 'Vuex'
import sideBar from './modules/sideBar.js'

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
        sideBar: sideBar
    }
})

export default store