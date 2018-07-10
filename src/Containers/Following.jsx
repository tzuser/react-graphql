//我关注的
import React,{Component} from 'react';
import {Box,Text} from 'gestalt';
import {errorReply} from 'tools_';
import {withRouter} from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import FollowHeader from 'com_/FollowHeader'
import PageLoading from 'com_/PageLoading'
@withRouter
@graphql(gql`
  query($name:String){
    user(name:$name){
      id
      name
      nick_name
      avatar
    }
  }
`,{
  options:(props)=>{
      return {
      variables:{
        name:props.match.params.name||null,
      }
  }},
})
class Following extends Component{
	render(){
		let {data:{user,loading},match:{params:{name}}}=this.props;
		if(loading) return <PageLoading />;
		return <Box paddingX={4}>
		<FollowHeader user={user} followCount={0} title="关注"/>
		关注
		</Box>
	}
}


export default Following