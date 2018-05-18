import common from "@/common/js/common.js"
const audio = {
	state: {
		//audio标签本身,用来触发audio内置事件
		audioItSelf: {},
		//audio音频总时长
		audioDuration: 245,
		//audio播放状态 播放or暂停
		playingState: false,
		//当前正在播放歌曲信息 给一个默认..免得影响观感 （TODO:后续将显示本地存储的播放的最后一首歌曲）
		playingSongInfo: {
			"album": {
				"blurPicUrl":"http://p1.music.126.net/lN7r5689EMOPy8G1unOIYw==/125344325567243.jpg",
				"name": "学不会"
			},
		    "name": "那些你很冒险的梦",
		    "artists": [{
		    	name: '林俊杰'
		    }],
		    "id": "108138"
		},
		//当前正在播放歌曲的在所属歌单中的index
		playingSongIndex: -1,
		//当前播放歌单的id
		playingSongListID: -1,
		//播放列表显示状态
		ifplayingSongListShow: false,
		//当前播放歌单列表 点击某歌单的某首歌 将该歌单的信息置为当前播放列表
		//TODO:将显示本地存储的歌单列表
		playingSongListInfo: {
			tracks: [{
				"album": {
					"blurPicUrl":"http://p1.music.126.net/lN7r5689EMOPy8G1unOIYw==/125344325567243.jpg",
					"name": "学不会"
				},
				"name": "那些你很冒险的梦",
				"artists": [{
					name: '林俊杰'
				}],
				"id": "108138"
			}]
		},
		//播放模式 {1 : '列表循环', 2 : '单曲循环', 3 : '随机播放'} 默认列表循环1
		playingMode: 1
	},
	getters: {
		getAudioItSelf: state => state.audioItSelf,
		getAudioDuration: state => state.audioDuration,
		getPlayingState: state => state.playingState,
		getPlayingSongInfo: state => state.playingSongInfo,
		getPlayingSongIndex: state => state.playingSongIndex,
		getPlayingSongListID: state => state.playingSongListID,
		getPlayingSongListShowState: state => state.ifplayingSongListShow,
		getPlayingSongListInfo: state => state.playingSongListInfo,
		getPlayingMode: state => state.playingMode
	},
	mutations: {
		setAudioItSelf (state, audio) {
			state.audioItSelf = audio;
		},
		setAudioDuration (state, duration) {
			state.audioDuration = duration;
		},
		//播放当前播放列表索引处的歌曲
		playIndexMusic (state, obj) {
      		//改变当前播放音乐状态
			state.playingState = true;
			//设置当前播放音乐的索引位置 播放图标显示
			state.playingSongIndex = obj.index;
			//修改当前播放音乐信息
			// !!! 此处有一个重大bug 如果修改当前播放音乐信息和播放音乐放在一块写，就会报play() method is interrupted by a new load()  
			//个人猜测是修改了audio组件中的数据源会导致load()方法
			//设置当前播放歌单信息和当前播放歌曲信息
			state.playingSongListInfo = obj.sheetsDetailInfo;
			state.playingSongListID = obj.sheetsDetailInfo.id;
			state.playingSongInfo = state.playingSongListInfo.tracks[obj.index];
			state.audioItSelf.setAttribute('src', "http://music.163.com/song/media/outer/url?id=" + state.playingSongInfo.id + ".mp3")
			state.audioItSelf.load();
			state.audioItSelf.play()
		},
		//播放下一首
		playNextMusic (state) {
			//判断播放的类型(列表循环、单曲循环、随机播放等)
			let nowTracks = state.playingSongListInfo.tracks;
			switch (state.playingMode)
			{
				//列表循环
				case 1: {
					if (state.playingSongIndex + 1 > nowTracks.length - 1) {
						state.playingSongIndex = 0;
					} else {
						state.playingSongIndex++;
					}
					break;
				}
				//单曲循环
				case 2: 
					state.playingSongIndex = state.playingSongIndex;
					break;
				//随机播放
				case 3: {
					let newIndex = common.getDifRandomFromArr(nowTracks, state.playingSongIndex);
					console.log(newIndex);
					state.playingSongIndex = newIndex;
				}
				
			}
			state.playingSongInfo = nowTracks[state.playingSongIndex];
			state.audioItSelf.setAttribute('src', "http://music.163.com/song/media/outer/url?id=" + state.playingSongInfo.id + ".mp3")
			state.audioItSelf.load();
			state.playingState = true;
			state.audioItSelf.play()
		},
		//播放上一首
		playPreMusic (state) {
			let nowTracks = state.playingSongListInfo.tracks;
			switch (state.playingMode)
			{
				//列表循环
				case 1: {
					if (state.playingSongIndex - 1 < 0) {
						state.playingSongIndex = nowTracks.length - 1;
					} else {
						state.playingSongIndex--;
					}
					break;
				}
				//单曲循环
				case 2: 
					state.playingSongIndex = state.playingSongIndex;
					break;
				//随机播放
				case 3: {
					let newIndex = common.getDifRandomFromArr(nowTracks, state.playingSongIndex);
					console.log(newIndex);
					state.playingSongIndex = newIndex;
				}
				
			}
			state.playingSongInfo = nowTracks[state.playingSongIndex];
			state.audioItSelf.setAttribute('src', "http://music.163.com/song/media/outer/url?id=" + state.playingSongInfo.id + ".mp3")
			state.audioItSelf.load();
			state.playingState = true;
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
		play (state) {
			state.playingState = true;
			state.audioItSelf.play();
		},
		//改变播放模式
		changePlayingMode (state) {
			if (state.playingMode != 3) {
				state.playingMode++;
			} else {
				state.playingMode = 1;
			}
		},
		showPlayingSongList (state) {
			state.ifplayingSongListShow = true;
		},
		hidePlayingSongList (state) {
			state.ifplayingSongListShow = false;
		},
		setPlayingSongListInfo (state, songListInfo) {
			state.playingSongListInfo = songListInfo;
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