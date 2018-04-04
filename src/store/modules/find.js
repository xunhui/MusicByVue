let find = {
    state: {
        //轮播图信息列表
        bannerList: []
    },
    getters: {
        getBannerList: state => state.bannerList
    },
    mutations: {
        setBannerList (state, banner) {
            state.bannerList = banner;
        }
    },
    actions: {

    }
}

export default find;