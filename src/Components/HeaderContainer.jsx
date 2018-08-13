import React,{Component} from 'react';
import {Box,Icon,SearchField,IconButton,Button,Text} from 'gestalt';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
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
@withRouter
@connect((state)=>({
   selfUser:state.config.selfUser,
}))
class HeaderPc extends Component{
  render(){
    let {history:{push},selfUser}=this.props

    return [
    <Box key="1" marginLeft={10} shape="pill" overflow="hidden">
      <Button text="首页" color="white" onClick={()=>push('/')}  />
    </Box>,
    <Box key="2"  marginLeft={2} shape="pill" overflow="hidden">
      <Button text="发现" color="white" onClick={()=>push(`/find`)}/>
    </Box>,
    <Box key="3"  marginLeft={2} shape="pill" overflow="hidden">
      <Button text="关注中" color="white" onClick={()=>push(selfUser.name?`/${selfUser.name}/following`:'/login')}/>
    </Box>,
    <Box key="4" paddingX={1}>
      <IconButton
      accessibilityLabel="Notifications"
      icon="speech-ellipsis"
      size="md"
      onClick={()=>push(`/notice`)}
      />
    </Box>,
    <Box key="5" paddingX={2}>
      <IconButton accessibilityLabel="Profile" icon="person" size="md" onClick={()=>push(selfUser.name?`/${selfUser.name}/`:'/login')} />
    </Box>]
  }
}

const mapStateToProps=(state)=>({
  isPc:state.config.isPc,
  showFooter:state.config.showFooter
})
@withRouter
@connect(mapStateToProps)
class Header extends Component{
  state={value:''}
  render(){
    let {location:{pathname},match,showFooter}=this.props
    let {isPc}=this.props;
    let logoList=['/search','/find','/notice','/search_keyword'];
    let isLogo=isPc && (logoList.find((item)=>pathname.includes(item)) || pathname=="/") && showFooter;

    return (
      <div style={{height:64}}>
        <HeaderBox>
            {isLogo && <Box padding={3}>
               <Icon
                 icon="pinterest"
                 color="red"
                 size={20}
                 accessibilityLabel="Pinterest"
               />
             </Box>}
           {this.props.children}
           {isPc && showFooter && <HeaderPc />}
        </HeaderBox>
      </div>
    );
  }
}


export default Header;