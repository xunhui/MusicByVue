//音乐信息状态管理
const music = {
	state: {
		MusicAllInfo: [],
		MusicSheetsInfo: [],
		MusicFindInfo: []
	},
	getters: {
		//获取所有音乐信息
		getMusicAllInfo: state => state.MusicAllInfo,
		//获取歌单列表信息
		getMusicSheetsInfo: state => state.MusicSheetsInfo,
		//获取发现音乐信息
		getMusicFindInfo: state => state.MusicFindInfo
	},
	mutations: {
		setMusicAllInfo (state, all) {
			state.MusicAllInfo = all
		},
		setMusicSheetsInfo (state, sheets) {
			state.MusicSheetsInfo = sheets
		},
		setMusicFindInfo (state, findMusic) {
			state.MusicFindInfo = findMusic
		}
	},
	actions: {
		setMusicAllInfo ({commit}, all) {
			commit('setMusicAllInfo', all)
		},
		setMusicSheetsInfo ({commit}, sheets) {
			commit('setMusicSheetsInfo', sheets)
		},
		setMusicFindInfo ({commit}, findMusic) {
			commit('setMusicFindInfo', findMusic)
		}
	}
}

export default music;