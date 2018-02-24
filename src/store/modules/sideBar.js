const sideBar = {
    state: {
        isShow: false,//初始默认侧边栏不显示
        userInfo: {}
    },
    mutations: {
        showBar (state) {
            state.isShow = true;
        },
        hideBar (state) {
            state.isShow = false;
        },
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        showSideBar ({commit}) {
            commit('showBar')
        },
        hideSideBar ({commit}) {
            commit('hideBar')
        },
        setUserInfo ({commit}, userInfo) {
            commit('setUserInfo', userInfo)
        }
    },
    getters: {
        getShowState (state) {
            return state.isShow;
        },
        //获取用户信息
        getUserInfo: state => state.userInfo
    }
}

export default sideBar