import React,{Component} from 'react';
import ListShow from 'com_/ListShow';
import { graphql } from 'react-apollo';
import followersQuery from 'gql_/followers.gql';
import {loadItems} from '_public';
import UserItem from 'com_/UserItem';
import PageLoading from 'com_/PageLoading';
import InTheEnd from 'com_/InTheEnd';
import FollowUserButton from 'com_/follow/FollowUserButton'

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
    let {data:{followers,loading},userName}=this.props;
    if(loading) return <PageLoading />;
    return(
      <div>
        <ListShow 
        name={`FollowersList_${userName}`}
        comp={(props)=>(<UserItem {...props} content={(props)=>(<FollowUserButton userName={props.data.name} />)} />)} 
        loadItems={(data)=>loadItems({props:this.props,queryName:'followers'})} 
        minCols={2} 
        virtualize={true}
        scrollContainer={()=>window}
        items={followers?followers.list:[]} />
        {followers && followers.isEnd && <InTheEnd/>}
      </div>
    )
  }
}
export default FollowList