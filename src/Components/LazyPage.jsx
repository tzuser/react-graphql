import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PageStore from 'com_/PageStore';
const pageStore=new PageStore()

const PageItem=styled.div`
  ${p=>(p.isShow || `
    width:${p.w}px;
    height:${p.h}px;
  `)}
`

const initState={width:null,height:null,top:null,left:null,init:false}
class LazyPage extends Component{
  state=initState;
  constructor(props){
    super(props);
    let size=pageStore.has(props.trait) && pageStore.get(props.trait);
    if(size){
      this.state={...size,init:true}
    }
  }
  componentDidMount(){
    this.dom=ReactDOM.findDOMNode(this);
    const {trait}=this.props;
    if(!pageStore.has(trait)){
      pageStore.set(trait,{
        width:this.dom.clientWidth,
        height:this.dom.clientHeight,
        top:this.dom.offsetTop,
        left:this.dom.offsetLeft
      })
      console.log(LazyPage.checkShow(this.props));
    }
  }

  static checkShow(props){
    const size=pageStore.get(props.trait)
    let isShow=false;
    if(size){
      if(props.showHeight==0 || props.scrollY==0){
        isShow=false
      }else{
        let s={t:props.scrollY,b:props.scrollY+props.showHeight}
        let c={t:size.top,b:size.top+size.height}
        let space=500;
        if((c.t+space)>s.t || (c.b+space)>s.t){
          isShow=true
        }
      }
    }else{
      isShow=true
    }

    return {...size,isShow:isShow}
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return LazyPage.checkShow(nextProps)
  }
  render() {
    const {trait,children,scrollY,showHeight}=this.props;
    const {width,height,isShow}=this.state;
    return (
      <PageItem  w={width} h={height} isShow={isShow}>{isShow && children}</PageItem>
    );
  }
}

export default LazyPage