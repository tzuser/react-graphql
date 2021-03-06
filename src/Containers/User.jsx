import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Box,
  Spinner,
  Text,
  IconButton,
  Mask,
  Image,
  Avatar,
  Button,
  Heading,
  Column,
} from 'gestalt';
import Tabs from 'com_/Tabs';
import HeaderContainer from 'com_/HeaderContainer';
import PageLoading from 'com_/PageLoading';

import { imageUrl } from '_tools';
import { errorReply } from '_public';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as configActs from '../actions/config';
import UserPosts from './UserPosts';
import Loadable from 'react-loadable';
import FollowUserButton from 'com_/follow/FollowUserButton';
import FollowCountButton from 'com_/follow/FollowCountButton';
import Block from 'com_/Block';
import userQuery from 'gql_/user.gql';
import UpdateUserButton from 'com_/user/UpdateUserButton';
import DeleteButton from 'com_/user/DeleteButton';
import initSelf from 'com_/InitSelf';
import { withRouter } from 'react-router-dom';
//

const LoadableUserPosts = Loadable({
  loader: () => import(/* webpackChunkName: 'UserPosts' */ './UserPosts'),
  loading: PageLoading,
});
const LoadableUserLikes = Loadable({
  loader: () => import(/* webpackChunkName: 'UserLikes' */ './UserLikes'),
  loading: PageLoading,
});

const UserHeader = ({ userName, goBack, isAdmin }) => (
  <HeaderContainer>
    <Box marginLeft={-3} flex="grow">
      <IconButton accessibilityLabel="返回" icon="arrow-back" onClick={goBack} />
    </Box>

    {isAdmin && (
      <Box>
        <DeleteButton userName={userName} />
      </Box>
    )}
    {isAdmin && (
      <Box marginLeft={1}>
        <UpdateUserButton userName={userName} />
      </Box>
    )}

    <Box marginLeft={1}>
      <FollowUserButton userName={userName} />
    </Box>
  </HeaderContainer>
);

const SelfHeader = ({ userName }) => (
  <HeaderContainer>
    <Box flex="grow">
      <Text>{userName}</Text>
    </Box>
    <Box>
      <Link to="/create/">
        <IconButton accessibilityLabel="发布" icon="add" />
      </Link>
    </Box>
    <Box marginRight={-3}>
      <Link to="/settings/">
        <IconButton accessibilityLabel="设置" icon="cog" />
      </Link>
    </Box>
  </HeaderContainer>
);
const UserCard = ({ user }) => {
  if (!user) return null;
  return (
    <Box direction="row" display="flex">
      <Box flex="grow">
        <Heading size="xs">{user.nick_name}</Heading>
      </Box>
      <Box marginLeft={1} column={4} maxWidth={120} flex="none">
        <Avatar name="Long" src={imageUrl(user.avatar)} />
      </Box>
    </Box>
  );
};

@initSelf(true)
@withRouter
@graphql(userQuery, {
  options: props => {
    return {
      variables: {
        name: props.match.params.name || null,
      },
    };
  },
})
class User extends Component {
  state = { tabIndex: 0 };
  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.error) {
      errorReply({ error: nextProps.data.error, push: nextProps.history.push });
    }
  }

  render() {
    let {
      data: { error, user, refetch, fetchMore, loading },
      history: { goBack, push },
      location: { pathname },
      match: {
        params: { name: userName },
      },
      selfUser,
    } = this.props;
    /*  if(loading){
      return <PageLoading />
    }*/
    const isSlef = selfUser && selfUser.name == userName;
    const isAdmin = selfUser && selfUser.roles.includes('admin');
    console.log(isSlef, isAdmin);
    //tabs
    let tabsData = [
      /*{
              text: "收藏集"
            },*/
      {
        text: '帖子',
        href: `/${userName}/post`,
        isReplace: true,
      },
      {
        text: '喜欢',
        href: `/${userName}/like`,
        isReplace: true,
      },
    ];
    if (isAdmin) {
      tabsData.push({
        text: '用户管理',
        href: `/user_list`,
        isReplace: false,
      });
    }
    let tabsIndex = tabsData.findIndex(item => pathname.startsWith(item.href));
    tabsIndex = tabsIndex < 0 ? 0 : tabsIndex;
    return (
      <div>
        {isSlef ? (
          <SelfHeader userName={userName} />
        ) : (
            <UserHeader userName={userName} goBack={goBack} isAdmin={isAdmin} />
          )}
        {loading && <PageLoading />}
        {!loading && user && (
          <Box marginTop={2}>
            <Block>
              <UserCard user={user} />
              <Box direction="row" display="flex" marginTop={3}>
                <Column span={5}>
                  <FollowCountButton to={`/${userName}/followers`}>
                    <Text bold size="sm">
                      {user.followersCount}
                    </Text>
                    <Text bold size="sm" color="gray">
                      粉丝
                    </Text>
                  </FollowCountButton>
                </Column>
                <Column span={5}>
                  <FollowCountButton to={`/${userName}/following`}>
                    <Text bold size="sm">
                      {user.followingCount}
                    </Text>
                    <Text bold size="sm" color="gray">
                      关注
                    </Text>
                  </FollowCountButton>
                </Column>
                <Column span={6}>
                  <a href={user.website || `https://${userName}.tumblr.com/`} target="_blank">
                    <Text bold size="sm" align="right" truncate={true} overflow="breakWord">
                      {user.website}
                    </Text>
                  </a>
                </Column>
              </Box>
              <Box marginTop={4}>
                <Tabs tabs={tabsData} activeTabIndex={tabsIndex} onChange={e => { }} />
              </Box>
            </Block>
            <Box marginTop={3} paddingX={2}>
              {tabsIndex == 0 && <LoadableUserPosts userName={userName} minCols={2} />}
              {tabsIndex == 1 && <LoadableUserLikes userName={userName} minCols={2} />}
            </Box>
          </Box>
        )}
      </div>
    );
  }
}

export default User;
