import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {
  Box,
  Text,
  Avatar,
  Button,
} from 'gestalt';
import { imageUrl } from '_tools';

const UserNode = ({ user, content, userClick }) => (
  <Box
    direction="row"
    marginTop={2}
    display="flex"
    alignItems="start"
    paddingY={2}
  >
    <div onClick={e => userClick(e, user)}>
      <Avatar size="md" src={imageUrl(user.avatar)} name="Long" />
    </div>
    <Box paddingX={2}>
      <div onClick={e => userClick(e, user)}>
        <Text bold size="xs" inline>
          {user.nick_name}
        </Text>
      </div>
      <Box paddingY={1}>
        <Text overflow="normal" leading="tall" size="sm">
          {content}
        </Text>
      </Box>
    </Box>
  </Box>
);
export default UserNode