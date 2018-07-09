import React,{Component} from 'react';
import {Box,Text,Column,Icon} from 'gestalt';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
const Foot=styled.div`
left: 0;
bottom: 0;
right: 0;
position: fixed;
height: 54px;
z-index: 1;
background-color: rgba(255, 255, 255, 0.9);
box-sizing: border-box;
text-align: center;
`
const IconLink=styled(NavLink)`
  margin:auto;
  display: inline-block;
  outline: 0px;
  transition: transform 0.2s ease-out;
  &.active svg{
    color:#bd081c;
  }
  >div{
    padding:12px;
    :active{
      background-color:rgb(239,239,239);
      border-radius:50%;
    }
  }
`
class Footer extends Component{
  render(){
    return(
    <div style={{height:54}}>
      <Foot>
        <Box paddingX={1}  
        justifyContent="center"
        alignItems="start" display="flex" direction="row">
            <Box maxWidth="500px" display="flex" width="100%"  direction="row">
              <Column span={3}>
                <IconLink exact replace to="/" activeClassName="active">
                  <div>
                    <Icon  accessibilityLabel="发现" icon="compass" size="24"/>
                  </div>
                </IconLink>
              </Column>
             <Column span={3}>
               <IconLink replace to="/find" activeClassName="active">
                 <div>
                   <Icon  accessibilityLabel="搜索" icon="search" size="24"/>
                 </div>
               </IconLink>
             </Column>
             <Column span={3}>
               <IconLink replace to="/notice" activeClassName="active">
                 <div>
                   <Icon  accessibilityLabel="消息" icon="speech-ellipsis" size="24"/>
                 </div>
               </IconLink>
             </Column>
             <Column span={3}>
               <IconLink replace to="/user" activeClassName="active">
                 <div>
                   <Icon  accessibilityLabel="我" icon="person" size="24"/>
                 </div>
               </IconLink>
             </Column>
            </Box>
        </Box>
      </Foot>
    </div>
    )
  }
}
export default Footer