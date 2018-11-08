//我关注的
import React, { Component } from 'react';
import { Box, Text, IconButton } from 'gestalt';
import { errorReply } from '_public';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PageLoading from 'com_/PageLoading';
import UserListComponent from 'com_/user/UserList';
import HeaderContainer from 'com_/HeaderContainer';

@withRouter
class UserList extends Component {
  render() {
    let {
      history: { goBack, push },
    } = this.props;
    return (
      <div>
        <HeaderContainer>
          <Box marginLeft={-3}>
            <IconButton accessibilityLabel="返回" icon="arrow-back" onClick={() => goBack()} />
          </Box>
          <Box flex="grow">
            <Text bold size="lg">
              用户列表
            </Text>
          </Box>
        </HeaderContainer>
        <Box marginTop={2}>
          <UserListComponent isUpdate={true} />
        </Box>
      </div>
    );
  }
}

export default UserList;
