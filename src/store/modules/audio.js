const audio = {
	state: {
		//audio播放状态 播放or暂停
		playingState: false,
		//当前正在播放歌曲信息
		playingSongInfo: {},
		//当前播放歌单列表
		playingSongList: []
	},
	getters: {
		getPlayingState: state => state.playingState,
		getPlayingSongInfo: state => state.playingSongInfo,
		getPlayingSongList: state => state.playingSongList
	},
	mutations: {
		playMusic (state) {
			state.playingState = true;
		},
		pauseMusic (state) {
			state.playingState = false;
		}
	},
	actions: {
		playMusic ({commit}) {
			commit("playMusic")
		},
		pauseMusic ({commit}) {
			commit("pauseMusic")
		}
	}
}

export default audio;