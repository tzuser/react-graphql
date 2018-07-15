//我关注的
import React,{Component} from 'react';
import {Box,Text} from 'gestalt';
import {errorReply} from '_public';
import {withRouter} from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import FollowHeader from 'com_/follow/FollowHeader';
import PageLoading from 'com_/PageLoading';
import userQuery from 'gql_/user.gql';
import FollowingList from 'com_/follow/FollowingList';
@withRouter
@graphql(userQuery,{
  options:(props)=>{
      return {
      variables:{
        name:props.match.params.name||null,
        first:20
      }
  }},
})
class Following extends Component{
	render(){
		let {data:{user,loading},match:{params:{name}}}=this.props;
		if(loading) return <PageLoading />;
		return (
    <div>
      <Box paddingX={4}>
  		  <FollowHeader user={user} followCount={0} title="关注"/>
  		</Box>
      <Box marginTop={2}>
        <FollowingList userName={name}/>
      </Box>
    </div>
    )
	}
}


export default Following