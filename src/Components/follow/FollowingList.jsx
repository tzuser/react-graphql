import React,{Component} from 'react';
import ListShow from 'com_/ListShow';
import { graphql } from 'react-apollo';
import followingQuery from 'gql_/following.gql';
import {loadItems} from '_public';
import UserItem from 'com_/UserItem';
import PageLoading from 'com_/PageLoading';
import FollowUserButton from 'com_/follow/FollowUserButton';
import InTheEnd from 'com_/InTheEnd';

const Btn=(props)=>{
  return <FollowUserButton userName={props.data.name} />
}
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
    let {data:{following,loading},userName}=this.props;
    if(loading) return <PageLoading />;
    return(
      <div>
        <ListShow 
        name={`FollowingList_${userName}`}
        comp={(props)=>(<UserItem {...props} content={Btn} />)}
        loadItems={(data)=>loadItems({props:this.props,queryName:'following'})} 
        minCols={2} 
        virtualize={true}
        items={following?following.list:[]}
        scrollContainer={()=>window}
        />
        {following && following.isEnd && <InTheEnd/>}
      </div>
    )
  }
}
export default FollowList