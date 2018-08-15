//我关注的
import React,{Component} from 'react';
import {Box,Text} from 'gestalt';
import {errorReply} from '_public';
import {withRouter} from 'react-router-dom';
import FollowHeader from 'com_/follow/FollowHeader';
import PageLoading from 'com_/PageLoading';
import FollowersList from 'com_/follow/FollowersList';

@withRouter
class Following extends Component{
  render(){
    let {match:{params:{name}}}=this.props;
    return (
    <div>
      <FollowHeader userName={name} attrName={'followersCount'} title="粉丝"/>
      <Box marginTop={2}>
        <FollowersList userName={name}/>
      </Box>
    </div>
    )
  }
}


export default Following