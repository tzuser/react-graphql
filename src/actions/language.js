import {LANG_GET_CONFIG,SELECT_LANGUAGE} from '_constants'

export const getConfig=()=>async (dispatch,getState)=>{
  let res = await fetch(`/config.json`);
  let json = await res.json();
  dispatch({type:LANG_GET_CONFIG, list: json })
}

export const setLanguage=(index)=> async (dispatch,getState)=>{
  let item = getState().lang.list[index];
  let res = await fetch(`/${item.language}.json`);
  let json = await res.json();
  dispatch({type:SELECT_LANGUAGE,index:index,data:json})
}

export const setLanguageConfig=()=> async (dispatch,getState)=>{

}