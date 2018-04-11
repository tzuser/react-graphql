import {SHOW_SWITCH_OPEN,SHOW_SWITCH_CLOSE,SET_SELF} from '../actions/config';
const config=(state={show:true,selfUser:null},action)=>{
	switch(action.type){
		case SHOW_SWITCH_OPEN:
			return Object.assign({},state,{show:true})
		case SHOW_SWITCH_CLOSE:
			return Object.assign({},state,{show:false})
    case SET_SELF:
      return Object.assign({},state,{selfUser:action.selfUser})
		default:
			return state
	}
}
export default config