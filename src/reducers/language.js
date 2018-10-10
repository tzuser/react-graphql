import {
  LANG_GET_CONFIG,
  SELECT_LANGUAGE
} from '_constants';

const initState={
  list: [],
  index: 0,
}

const lang = (state = initState, action) => {
  switch (action.type) {
    case LANG_GET_CONFIG:
      return Object.assign({},state,{list:action.list})
    case SELECT_LANGUAGE:
      return Object.assign({},state,{index:action.index})
    default:
      return state
  }
}
export default lang