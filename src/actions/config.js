export const SHOW_SWITCH_OPEN='SHOW_SWITCH_OPEN';//显示
export const SHOW_SWITCH_CLOSE='SHOW_SWITCH_CLOSE';//关闭

export const SET_SELF='SET_SELF';
//打开照片详情
export const showSwitchOpen=()=>({
	type:SHOW_SWITCH_OPEN
});
export const showSwitchClose=()=>({
	type:SHOW_SWITCH_CLOSE
});

export const setSelf=(user)=>({
  type:SET_SELF,
  selfUser:user
});