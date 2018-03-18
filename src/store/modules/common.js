//一些公共组件的状态
const common = {
	state: {
		ifShowOperation: false,//对歌单或歌曲进行操作组件的显示隐藏
		operationInfo: {}//操作组件的信息 （title iconclass等）
	},
	getters: {
		//获取操作组件显示状态
		getShowOperationState: state => state.ifShowOperation,
		//获取操作组件的类型（name icontext iconclass等）
		getOperationInfo: state => state.operationInfo
	},
	mutations: {
		//显示、隐藏操作组件
		showOperation (state, obj) {
			state.ifShowOperation = true;
			state.operationInfo = obj;
		},
		hideOperation (state) {
			state.ifShowOperation = false;
		}
	},
	actions: {

	}
}

export default common;