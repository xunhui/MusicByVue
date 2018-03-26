//音乐信息状态管理
const music = {
	state: {
		MusicAllInfo: [],//所有音乐信息
		MusicSheetsInfo: [],//歌单信息
		MusicFindInfo: [],//发现音乐信息
		showSheetsDetail: false,//歌单详情页的显示隐藏
		//设置该状态是为了点击歌单后直接显示歌单信息而不用等待访问接口的时间
		coverDetailInfo: {},//歌单封面及收藏人信息
		SheetsDetailInfo: {},//歌单详情页的信息
		songArtistsAndAlbum: ''//每一首歌的歌手及专辑
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
		//获取歌单封面详细信息
		getCoverDetailInfo: state => state.coverDetailInfo,
		//获取歌单详情音乐列表信息
		getSheetsDetailInfo: state => state.SheetsDetailInfo,
		//获取歌曲歌手、歌名、专辑
		getSongArtistsAndAlbum: state => state.songArtistsAndAlbum
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
		},
		//获取详情页歌单列表信息
		setSheetsDetailInfo (state, songlists) {
			state.SheetsDetailInfo = songlists;
		},
		//设置封面详情信息
		setCoverDetailInfo (state, coverInfo) {
			state.coverDetailInfo = coverInfo;
		},
		//显示、隐藏歌单详情页
		showSheetsDetail (state) {
			state.showSheetsDetail = true;
		},
		hideSheetsDetail (state) {
			state.showSheetsDetail = false;
		},
		//设置歌曲信息
		// setSongArtistsAndAlbum (state, obj) {
		//     let allArtists = '', album = '';
		//     let artLen = obj.artists.length;
		//     for (let i = 0;i < artLen;i++) {
		//       allArtists += obj.artists[i].name;
		//       if (i+1 < artLen)
		//         allArtists += '/'
		//     }
		//     album = obj.album.name;
		//     console.log(artLen)
		//     state.songArtistsAndAlbum = allArtists + ' - ' + album;
  //   	}
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
		// setEachSongInfo ({commit}, songInfo) {
		// 	commit('setEachSongInfo', songInfo)
		// }
 	}
}

export default music;