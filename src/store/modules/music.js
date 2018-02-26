//音乐信息状态管理
const music = {
	state: {
		MusicAllInfo: [],//所有音乐信息
		MusicSheetsInfo: [],//歌单信息
		MusicFindInfo: [],//发现音乐信息
		showSheetsDetail: false,//歌单详情页的显示隐藏
		SheetsDetailListsInfo: []//歌单详情页的信息
	},
	getters: {
		//获取所有音乐信息
		getMusicAllInfo: state => state.MusicAllInfo,
		//获取歌单列表信息
		getMusicSheetsInfo: state => state.MusicSheetsInfo,
		//获取发现音乐信息
		getMusicFindInfo: state => state.MusicFindInfo,
		//获取歌单详情页显示状态
		getSheetsDetailState: state => state.showSheetsDetail,
		//获取歌单详情音乐列表信息
		getSheetsDetailInfo: state => state.SheetsDetailListsInfo
	},
	mutations: {
		//从后台获取数据后存入state中
		setMusicAllInfo (state, all) {
			state.MusicAllInfo = all
		},
		setMusicSheetsInfo (state, sheets) {
			state.MusicSheetsInfo = sheets
		},
		setMusicFindInfo (state, findMusic) {
			state.MusicFindInfo = findMusic
		},
		//获取详情页歌单列表信息
		setSheetsDetailInfo (state, songlists) {
			state.SheetsDetailListsInfo = songlists;
		},
		//显示、隐藏歌单详情页
		showSheetsDetail (state) {
			state.showSheetsDetail = true;
		},
		hideSheetsDetail (state) {
			state.showSheetsDetail = false;
		}
		
	},
	actions: {
		//异步进行
		setMusicAllInfo ({commit}, all) {
			commit('setMusicAllInfo', all)
		},
		setMusicSheetsInfo ({commit}, sheets) {
			commit('setMusicSheetsInfo', sheets)
		},
		setMusicFindInfo ({commit}, findMusic) {
			commit('setMusicFindInfo', findMusic)
		},
		setSheetsDetailInfo ({commit}, songlists) {
			commit('setSheetsDetailInfo', songlists)
		},
		showSheetsDetail ({commit}) {
			commit("showSheetsDetail")
		},
		hideSheetsDetail ({commit}) {
			commit("hideSheetsDetail")
		}
	}
}

export default music;