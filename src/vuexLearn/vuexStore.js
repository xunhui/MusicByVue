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
    },
    getters: {
    	mulOperation (state) {
    		return state.count*2
    	},
    	divideOperation (state) {
    		return state.count/2
    	}
    },
    actions: {
    	addAction: function (context) {
    		context.commit("add",10);
    	},
    	reduceAction (context) {
    		context.commit("reduce");
    	},
    	asynAction ({commit}) {
    		setTimeout(function () {
        		commit('add',10)
      		}, 2000);
      		commit('reduce')
    	}
    }
})

export default store;