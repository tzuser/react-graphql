import React,{Component} from "react"
import {SearchField} from "gestalt"
class SearchFieldFocus extends SearchField{
  render(){
    //设置input 为自动获取光标
   let elementsTree= super.render()
   let newChildren=elementsTree.props.children.concat();
   let key=newChildren.findIndex(item=>item.type=="input");
   newChildren[key]=React.cloneElement(newChildren[key],{autoFocus:true,key:key})
   return React.cloneElement(elementsTree,elementsTree.props,newChildren)
  }
}
export default SearchFieldFocus