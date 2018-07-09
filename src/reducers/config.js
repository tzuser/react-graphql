import {SET_SELF,SET_WINDOW_WIDTH} from '../actions/config';
const config=(state={show:true,selfUser:null,width:320},action)=>{
	switch(action.type){
	case SET_WINDOW_WIDTH:
	return Object.assign({},state,{width:action.width});
    case SET_SELF:
      return Object.assign({},state,{selfUser:action.selfUser})
		default:
			return state
	}
}
export default config