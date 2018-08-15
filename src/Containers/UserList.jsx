//我关注的
import React,{Component} from 'react';
import {Box,Text} from 'gestalt';
import {errorReply} from '_public';
import {withRouter} from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PageLoading from 'com_/PageLoading';
import UserListComponent from 'com_/user/UserList';

@withRouter
class UserList extends Component{
  render(){
    return (
    <div>
      <Box marginTop={2}>
        <UserListComponent  />
      </Box>
    </div>
    )
  }
}


export default UserList