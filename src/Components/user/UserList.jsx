import React,{Component} from 'react';
import List from 'com_/List';
import { graphql } from 'react-apollo';
import { Box } from 'gestalt';
import {loadItems} from '_public';
import UserItem from 'com_/UserItem';
import PageLoading from 'com_/PageLoading';
import InTheEnd from 'com_/InTheEnd';
import usersQuery from 'gql_/users.gql';
import UpdateUserButton from 'com_/user/UpdateUserButton'
import FollowUserButton from 'com_/follow/FollowUserButton'

const UserButton=(props)=>{
  return (
    <Box display="flex" direction="row" >
      <Box flex="grow" marginRight={1}>
        <UpdateUserButton userName={props.data.name} buttonProps={{size:"sm"}}/>
      </Box>
      <Box flex="grow">
        <FollowUserButton userName={props.data.name} buttonProps={{size:"sm"}}/>
      </Box>
    </Box>
    )
}
@graphql(usersQuery,{
  options:(props)=>{
      return {
      variables:{
        first:20
      },
      //fetchPolicy: "network-only"
  }},
})
class UserList extends Component{
  render(){
    let {data:{users,loading}}=this.props;
    if(loading) return <PageLoading />;
    return(
      <div>
        <List 
        comp={(props)=>(<UserItem {...props} content={UserButton} />)}
        loadItems={(data)=>loadItems({props:this.props,queryName:'users'})} 
        minCols={2} 
        virtualize={true}
        items={users?users.list:[]} />
        {users && users.isEnd && <InTheEnd/>}
      </div>
    )
  }
}
export default UserList