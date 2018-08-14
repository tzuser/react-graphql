import React,{Component} from 'react';
import {Box,Icon,SearchField,IconButton,Button,Text} from 'gestalt';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Tabs} from 'com_/Footer';

const HeaderBox=styled.div`
      background-color:rgba(255,255,255,${p=>(p.transparent?0.9:1)});
      top:0;
      right:0;
      left:0;
      position:${p=>(p.isPc?"fixed":"none")};
      padding:12px 16px;
      z-index:1;
      height:64px;
      box-sizing: border-box;
      flex-direction: row;
      align-items: center;
      display: flex;
    `


const mapStateToProps=(state)=>({
  isPc:state.config.isPc,
  showFooter:state.config.showFooter
})

@withRouter
@connect(mapStateToProps)
class Header extends Component{
  state={value:''}
  render(){
    let {location:{pathname},match,showFooter,children}=this.props
    let {isPc}=this.props;
    let logoList=['/search','/find','/notice','/search_keyword'];
    let isLogo=isPc && (logoList.find((item)=>pathname.includes(item)) || pathname=="/") && showFooter;

    return (
      <div style={{height:64}}>
        <HeaderBox isPc={isPc}>
            {isPc && showFooter && (
             <div style={{textAlign:'center'}}>
               <Box width={200} marginRight={5} color="lightGray" shape="rounded" overflow="hidden">
                 <Tabs />
               </Box>
             </div>)}
           {children}
           
        </HeaderBox>
      </div>
    );
  }
}


export default Header;