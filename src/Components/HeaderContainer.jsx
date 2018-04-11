import React,{Component} from 'react';
import {Box,Icon,SearchField,IconButton,Button,Text} from 'gestalt';
import styled from 'styled-components';



class Header extends Component{
  state={value:''}
  render(){
    let {transparent}=this.props;
    const HeaderBox=styled.div`
      background-color:rgba(255,255,255,${transparent?0.9:1});
      top:0;
      right:0;
      left:0;
      position:fixed;
      padding:12px 16px;
      z-index:1;
      height:64px;
      box-sizing: border-box;
      flex-direction: row;
      align-items: center;
      display: flex;

    `
    return (
      <div style={{height:64}}>
        <HeaderBox  position="fixed" shape="rounded" paddingX={4} paddingY={3} display="flex" direction="row" alignItems="center">
           {this.props.children}
        </HeaderBox>
      </div>
    );
  }
}


export default Header;