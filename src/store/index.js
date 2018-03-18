import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user.js'
import Music from './modules/music.js'
import Audio from './modules/audio.js'
import Common from './modules/common.js'

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
        user: User,
        music: Music,
        audio: Audio,
        common: Common
    }
})

export default store