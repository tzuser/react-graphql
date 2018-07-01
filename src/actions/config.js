export const SET_SELF='SET_SELF';
export const SET_WINDOW_WIDTH='SET_WINDOW_WIDTH';

export const setSelf=({user,token})=>({
  type:SET_SELF,
  selfUser:{...user,token}
});

//设置窗口宽度
export const setWindowWidth=(width)=>({
	type:SET_WINDOW_WIDTH,
	width
})