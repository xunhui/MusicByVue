const sideBar = {
    state: {
        isShow: false//初始默认侧边栏不显示
    },
    mutations: {
        showBar (state) {
            state.isShow = true;
        },
        hideBar (state) {
            state.isShow = false;
        }
    },
    actions: {
        showSideBar ({commit}) {
            commit('showBar')
        },
        hideSideBar ({commit}) {
            commit('hideBar')
        }
    },
    getters: {
        getShowState (state) {
            return state.isShow;
        }
    }
}

export default sideBar