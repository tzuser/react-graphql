import React,{Component} from 'react';
import List from 'com_/List';
import { graphql } from 'react-apollo';
import followingQuery from 'gql_/following.gql';
import {loadItems} from '_public';
import UserItem from 'com_/UserItem';
import PageLoading from 'com_/PageLoading';
import InTheEnd from 'com_/InTheEnd';

@graphql(followingQuery,{
  options:(props)=>{
      return {
      variables:{
        name:props.userName||null,
        first:20
      },
      fetchPolicy: "network-only"
  }},
})
class FollowList extends Component{
  render(){
    let {data:{following,loading}}=this.props;
    if(loading) return <PageLoading />;
    return(
      <div>
        <List 
        comp={UserItem} 
        loadItems={(data)=>loadItems({props:this.props,queryName:'following'})} 
        minCols={2} 
        virtualize={true}
        items={following?following.list:[]} />
        {following && following.isEnd && <InTheEnd/>}
      </div>
    )
  }
}
export default FollowList