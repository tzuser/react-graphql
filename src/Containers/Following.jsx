//我关注的
import React, { Component } from 'react';
import { Box, Text } from 'gestalt';
import { errorReply } from '_public';
import { withRouter } from 'react-router-dom';

import FollowHeader from 'com_/follow/FollowHeader';
import PageLoading from 'com_/PageLoading';
import FollowingList from 'com_/follow/FollowingList';
@withRouter
class Following extends Component {
  render() {
    let {
      match: {
        params: { name },
      },
    } = this.props;
    return (
      <div>
        <FollowHeader
          userName={name}
          attrName={'followingCount'}
          title="关注"
        />
        <Box marginTop={2}>
          <FollowingList userName={name} />
        </Box>
      </div>
    );
  }
}

export default Following;
