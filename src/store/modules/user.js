const user = {
    state: {
        ifSideBarShow: false,//初始默认侧边栏不显示
        userInfo: {}
    },
    getters: {
        getSideBarShowState (state) {
            return state.ifSideBarShow;
        },
        //获取用户信息
        getUserInfo: state => state.userInfo,
        getUserId: state => state.userInfo.userId
    },
    mutations: {
        showSideBar (state) {
            state.ifSideBarShow = true;
        },
        hideSideBar (state) {
            state.ifSideBarShow = false;
        },
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        showSideBar ({commit}) {
            commit('showSideBar')
        },
        hideSideBar ({commit}) {
            commit('hideSideBar')
        },
        setUserInfo ({commit}, userInfo) {
            commit('setUserInfo', userInfo)
        }
    }
}

export default user