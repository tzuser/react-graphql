import React, { Component } from 'react';
import ListShow from 'com_/ListShow';
import { graphql } from 'react-apollo';
import { Box, Column, Text, Button } from 'gestalt';
import { loadItems } from '_public';
import UserItem from 'com_/UserItem';
import PageLoading from 'com_/PageLoading';
import InTheEnd from 'com_/InTheEnd';
import usersQuery from 'gql_/users.gql';
import UpdateUserButton from 'com_/user/UpdateUserButton';
import FollowUserButton from 'com_/follow/FollowUserButton';

const UserButton = props => {
  return (
    <div>
      <Box marginBottom={2}>
        <a href={`https://${props.data.name}.tumblr.com/`} target="_blank">
          <Text bold size="sm" align="center" truncate={true} overflow="breakWord">
            https://
            {props.data.name}
            .tumblr.com/
          </Text>
        </a>
      </Box>
      <Box display="flex" direction="row">
        {props.isUpdate && (
          <Box flex="grow" marginRight={1}>
            <UpdateUserButton userName={props.data.name} buttonProps={{ size: 'sm' }} />
          </Box>
        )}
        <Box flex="grow">
          <FollowUserButton userName={props.data.name} buttonProps={{ size: 'sm' }} />
        </Box>
      </Box>
    </div>
  );
};
@graphql(usersQuery, {
  options: props => {
    return {
      variables: {
        first: 20,
      },
      //fetchPolicy: "network-only"
    };
  },
})
class UserList extends Component {
  render() {
    let {
      data: { users, loading },
      isUpdate,
    } = this.props;
    if (loading) return <PageLoading />;
    return (
      <div>
        <ListShow
          name="UserList"
          comp={props => <UserItem {...props} content={UserButton} isUpdate={isUpdate} />}
          loadItems={data => loadItems({ props: this.props, queryName: 'users' })}
          scrollContainer={() => window}
          minCols={2}
          virtualize={true}
          items={users ? users.list : []}
        />
        {users && users.isEnd && <InTheEnd />}
      </div>
    );
  }
}
export default UserList;
