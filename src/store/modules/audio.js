const audio = {
	state: {
		//audio标签本身,用来触发audio内置事件
		audioItSelf: {},
		//audio播放状态 播放or暂停
		playingState: false,
		//当前正在播放歌曲信息 给一个默认..免得影响观感
		playingSongInfo: {
			"album": {
				"blurPicUrl":"http://p1.music.126.net/lN7r5689EMOPy8G1unOIYw==/125344325567243.jpg",
				"name": "学不会"
			},
		    "name": "那些你很冒险的梦",
		    "artists": [{
		    	name: '林俊杰'
		    }],
		    url: "http://music.163.com/song/media/outer/url?id=108138.mp3"
			
		},
		//当前正在播放歌曲的在所属歌单中的index
		playingSongIndex: -1,
		//播放列表显示状态
		ifplayingSongListShow: false,
		//当前播放歌单列表 点击某歌单的某首歌 将该歌单的信息置为当前播放列表
		playingSongList: []
	},
	getters: {
		getAudioItSelf: state => state.audioItSelf,
		getPlayingState: state => state.playingState,
		getPlayingSongInfo: state => state.playingSongInfo,
		getPlayingSongIndex: state => state.playingSongIndex,
		getPlayingSongListShowState: state => state.ifplayingSongListShow,
		getPlayingSongList: state => state.playingSongList
	},
	mutations: {
		setAudioItSelf (state, audio) {
			state.audioItSelf = audio;
		},
		playIndexMusic (state, obj) {
      		//改变当前播放音乐状态
			state.playingState = true;
			//设置当前播放音乐的索引位置 播放图标显示
			state.playingSongIndex = obj.index;
			//修改当前播放音乐信息
			// !!! 此处有一个重大bug 如果修改当前播放音乐信息和播放音乐放在一块写，就会报play() method is interrupted by a new load()  
			//个人猜测是修改了audio组件中的数据源会导致load()方法
			//设置当前播放歌单信息和当前播放歌曲信息
			state.playingSongList = obj.songSheetInfo;
			state.playingSongInfo = obj.songSheetInfo[obj.index];
			state.audioItSelf.setAttribute('src', "http://music.163.com/song/media/outer/url?id=" + state.playingSongInfo.id + ".mp3")
			state.audioItSelf.load();
			state.audioItSelf.play()
			console.log(state.audioItSelf)
		},
		//点击按钮 toggle播放or暂停
		playOrPause (state) {
			if (state.playingState == false) {
				state.playingState = true;
				state.audioItSelf.play();
			} else {
				state.playingState = false;
				state.audioItSelf.pause();
			}
		},
		showPlayingSongList (state) {
			state.ifplayingSongListShow = true;
		},
		hidePlayingSongList (state) {
			state.ifplayingSongListShow = false;
		},
		setPlayingSongList (state, songList) {
			state.playingSongList = songList;
		}
	},
	actions: {
		setAudioItSelf ({commit}) {
			commit("setAudioItSelf")
		},
		playMusic ({commit}) {
			commit("playMusic")
		},
		pauseMusic ({commit}) {
			commit("pauseMusic")
		},
		setPlayingSongList ({commit}, songList) {
			commit("setPlayingSongList", songList)
		}
	}
}

export default audio;