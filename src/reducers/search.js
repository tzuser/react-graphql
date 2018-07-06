import {ADD_HISTORY_KEYWORD} from 'act_/search';
const search=(state={list:[]},action)=>{
	switch(action.type){
	case ADD_HISTORY_KEYWORD:
		let newList=state.list.filter(item=>item!=action.keyword);
		newList.unshift(action.keyword)
		if(newList.length>50){//最多记录50条
			newList.pop()
		}
		return Object.assign({},state,{list:newList});
	default:
		return state
	}
}
export default search