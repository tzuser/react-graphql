import React, { Component } from 'react';
import List from 'com_/List';
import { graphql } from 'react-apollo';
import { Box } from 'gestalt';
import { loadItems } from '_public';
import UserItem from 'com_/UserItem';
import PageLoading from 'com_/PageLoading';
import InTheEnd from 'com_/InTheEnd';
import usersQuery from 'gql_/users.gql';
import RowListBox from 'com_/RowListBox';
import UpdateUserButton from 'com_/user/UpdateUserButton';
import FollowUserButton from 'com_/follow/FollowUserButton';
import { withRouter } from 'react-router-dom';
import RestoredScroll from 'com_/RestoredScroll';
const UserButton = props => {
  return <Box display="flex" direction="row" />;
};

@withRouter
@graphql(usersQuery, {
  options: props => {
    let {
      match: {
        params: { keyword },
      },
    } = props;
    return {
      variables: {
        first: 20,
        keyword: keyword,
      },
    };
  },
})
class UserList extends Component {
  render() {
    let {
      data: { users, loading },
    } = this.props;
    if (loading) return <PageLoading />;
    return (
      <RestoredScroll id="userRow">
        <RowListBox>
          {users &&
            users.list.map((item, key) => (
              <Box width={120} key={key} flex="none">
                <UserItem data={item} content={UserButton} />
              </Box>
            ))}
        </RowListBox>
      </RestoredScroll>
    );
  }
}
export default UserList;
/*{users && users.isEnd && <InTheEnd />}*/
