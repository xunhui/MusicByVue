import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        add: (state, n) =>  {
            state.count += n;
        },
        reduce: state => state.count--
    }
})

export default store;