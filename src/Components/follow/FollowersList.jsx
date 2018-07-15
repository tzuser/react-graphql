import React,{Component} from 'react';
import List from 'com_/List';
import { graphql } from 'react-apollo';
import followersQuery from 'gql_/followers.gql';
import {loadItems} from '_public';
import UserItem from 'com_/UserItem';
import PageLoading from 'com_/PageLoading';
import InTheEnd from 'com_/InTheEnd';

@graphql(followersQuery,{
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
    let {data:{followers,loading}}=this.props;
    if(loading) return <PageLoading />;
    return(
      <div>
        <List 
        comp={UserItem} 
        loadItems={(data)=>loadItems({props:this.props,queryName:'followers'})} 
        minCols={2} 
        virtualize={true}
        items={followers?followers.list:[]} />
        {followers && followers.isEnd && <InTheEnd/>}
      </div>
    )
  }
}
export default FollowList