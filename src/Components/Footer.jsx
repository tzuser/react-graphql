import React,{Component} from 'react';
import {Box,Text,Column,Icon} from 'gestalt';
import {Link,withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as configActs from '../actions/config';
import ClassNames from 'classnames'
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
    overflow: hidden;
`
const IconLink=styled(Link)`
  margin:auto;
  display: inline-block;
  outline: 0px;
  transition: transform 0.2s ease-out;
  &.active svg{
    color:#555;
  }
  &.red.active svg{
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
class IconColumn extends Component{
  componentWillMount(){
    let {location:{pathname},to,label,icon,index,active,onActive,selfName}=this.props;
    if(active===null){
      if(selfName && pathname.startsWith(`/${selfName}`)){//用户处理
        onActive(index)
      }else if(pathname.startsWith(to)){
        onActive(index)
      }
    }
  }
  render(){
    let {to,label,icon,index,active,onActive,className,replace=true}=this.props;

    return(
      <Column span={3}>
        <IconLink replace={replace} to={to} className={ClassNames(index==0 && 'red',active==index && 'active')}  onClick={()=>onActive(index)} >
          <div>
            <Icon  accessibilityLabel={label} icon={icon} size="24"/>
          </div>
        </IconLink>
      </Column>
      )
  }
}
const mapStateToProps=(state)=>({
  selfUser:state.config.selfUser
})
const mapDispatchToProps=(dispatch)=>bindActionCreators({

},dispatch)
@withRouter
@connect(mapStateToProps,mapDispatchToProps)
class Footer extends Component{
  state={active:null}
  render(){
    let active=this.state.active;
    let {location,show,selfUser}=this.props;
    if(!show)return false;
    let name=selfUser && selfUser.name;
    return(

    <div style={{height:54}}>
      <Foot>
        <Box paddingX={1}  
        justifyContent="center"
        alignItems="start" display="flex" direction="row">
            <Box maxWidth="500px" display="flex" width="100%"  direction="row">
              <IconColumn
                location={location}
                to="/"
                index={0}
                label="发现"
                icon="compass"
                active={active}
                onActive={(index)=>this.setState({active:index})}/>
              <IconColumn
                location={location}
                to="/find"
                index={1}
                label="搜索"
                icon="search"
                active={active}
                onActive={(index)=>this.setState({active:index})}/>
              <IconColumn
                location={location}
                to="/notice"
                index={2}
                label="消息"
                icon="speech-ellipsis"
                active={active}
                onActive={(index)=>this.setState({active:index})}/>
              <IconColumn
                location={location}
                to={name?`/${name}`:"/login/"}
                replace={!!name}
                selfName={name}
                index={3}
                label="我"
                icon="person"
                active={active}
                onActive={(index)=>this.setState({active:index})}/>
            </Box>
        </Box>
      </Foot>
    </div>
    )
  }
}


export default Footer