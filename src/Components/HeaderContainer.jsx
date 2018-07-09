import React,{Component} from 'react';
import {Box,Icon,SearchField,IconButton,Button,Text} from 'gestalt';
import styled from 'styled-components';

const HeaderBox=styled.div`
      background-color:rgba(255,255,255,${p=>(p.transparent?0.9:1)});
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
class Header extends Component{
  state={value:''}
  render(){
    return (
      <div style={{height:64}}>
        <HeaderBox>
           {this.props.children}
        </HeaderBox>
      </div>
    );
  }
}


export default Header;