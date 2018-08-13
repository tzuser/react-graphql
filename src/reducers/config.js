import {SET_SELF,SET_WINDOW_WIDTH,SHOW_FOOTER} from '../actions/config';
const config=(state={showFooter:true,show:true,selfUser:null,width:320,isPc:false},action)=>{
	switch(action.type){
    case SET_WINDOW_WIDTH:
      let isPc=action.width>=768;
      return Object.assign({},state,{width:action.width,isPc});
    case SET_SELF:
      return Object.assign({},state,{selfUser:action.selfUser})
    case SHOW_FOOTER:
      return Object.assign({},state,{showFooter:action.show})
		default:
			return state
	}
}
export default config