//推荐

import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Box, Spinner, Text, Heading } from 'gestalt';
import Header from 'com_/Header';
import PostList from 'com_/PostList';
import { withRouter } from 'react-router-dom';
import subscribeQuery from 'gql_/subscribe.gql';
import { loadItems } from '_public';
import InTheEnd from 'com_/InTheEnd';
import UserListComponent from 'com_/user/UserList';

@withRouter
class Recommend extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      /*data: { subscribe, refetch, fetchMore, loading },*/
      history: { push },
    } = this.props;
    return (
      <div>
        <Header />
        <Box marginTop={4} padding={4}>
          <Heading size="sm">没有动态！</Heading>
          <Text size="md" color="gray">
            以下是为你推荐的用户
          </Text>
        </Box>
        <Box marginTop={2}>
          <UserListComponent />
        </Box>
      </div>
    );
  }
}

export default Recommend;
