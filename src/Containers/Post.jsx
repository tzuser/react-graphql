import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {
  Box,
  Spinner,
  Text,
  IconButton,
  Mask,
  Image,
  Avatar,
  Button,
  Icon,
  Column,
} from 'gestalt';
import HeaderContainer from '../Components/HeaderContainer';
import styled from 'styled-components';
import PageLoading from '../Components/PageLoading';
import MoreLikes from './MoreLikes';
import { GrayButton, RedButton } from '../Components/IconButton.jsx';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { imageUrl, vidoeUrl } from '_tools';
import { errorReply } from '_public';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LikePostButton from 'com_/post/LikePostButton';
import DeleteButton from 'com_/post/DeleteButton';
import Block from 'com_/Block';

import postQuery from 'gql_/post.gql';

import UserNode from 'com_/post/UserNode';
import Tag from 'com_/Tag';
import Markdown from 'com_/Markdown';

const Card = styled.div`
  transition: all 0.1s;
  border-radius: 10px;
  transform: scale(1, 1);
  &:active {
    transform: scale(0.99, 0.99);
    background: rgb(239, 239, 239);
  }
`;
const ItemImg = styled.div`
  margin-bottom: 2px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Video = ({ src }) => {
  return (
    <video controls="controls" width="100%" autoPlay="autoplay">
      <source src={vidoeUrl(src)} type="video/mp4" />
    </video>
  );
};

const Article = ({ content }) => {
  return (
    <Markdown source={content} />
  );
};


const Photo = ({ photos, thumbnail }) => {
  return (
    <Card onClick={e => console.log('点击')}>
      <Mask shape="rounded">
        {photos.length == 0 && (
          <ItemImg>
            <Image
              alt=""
              naturalHeight={thumbnail.height}
              naturalWidth={thumbnail.width}
              src={imageUrl(thumbnail.url)}
            />
          </ItemImg>
        )}

        {photos.length > 0 &&
          photos.map((item, key) => (
            <ItemImg key={key}>
              <Image
                alt=""
                naturalHeight={item.height}
                naturalWidth={item.width}
                src={imageUrl(item.url)}
              />
            </ItemImg>
          ))}
      </Mask>
    </Card>
  );
};

const PostHeader = ({ isSelf, isAdmin, postID, goBack, push }) => {
  return (
    <Box display="flex" paddingX={4}>
      <Box marginLeft={-3} marginTop={-1} flex="grow" mdDisplay="none">
        <IconButton
          accessibilityLabel="返回"
          icon="arrow-back"
          onClick={() => goBack()}
        />
      </Box>
      <Box flex="grow" />
      {(isAdmin || isSelf) && (
        <Box>
          <DeleteButton postID={postID} goBack={goBack} push={push} />
        </Box>
      )}
      <Box>
        {!isSelf && (
          <LikePostButton postID={postID} push={push} initLike={false} />
        )}
      </Box>
    </Box>
  );
};

const Content = ({ post, postID, push, isSelf, isAdmin, goBack }) => {
  let {
    user,
    content,
    type,
    tags,
    commentNum,
    hotNum,
    likeNum,
    src,
    thumbnail,
  } = post;
  let photos = post.photos || [];
  return (
    <Block paddingX={0} paddingY={4} color="white" shape="rounded">
      <PostHeader
        isSelf={isSelf}
        isAdmin={isAdmin}
        postID={postID}
        goBack={goBack}
        push={push}
      />
      <Box display="flex" direction="row" paddingY={2} wrap>
        <Column span={12} mdSpan={8}>
          <Box paddingX={4}>
            {type == 'video' && <Video src={src} />}
            {type == 'photo' && <Photo photos={photos} thumbnail={thumbnail} />}
            {type == 'article' && <Article content={content} />}
          </Box>
        </Column>
        <Column span={12} mdSpan={4}>
          <Box paddingX={4}>
            <Box marginTop={8} display="none" mdDisplay="block">
              <hr />
            </Box>
            <UserNode
              user={user}
              content={type == 'article'?'':content}
              userClick={(e, data) => push(`/${data.name}/`)}
            />
            <Box direction="row" display="flex" wrap={true}>
              <Box>
                <Text color="gray" size="xs">
                  热度 {hotNum}
                </Text>
              </Box>
              <Box marginLeft={2}>
                <Text color="gray" size="xs">
                  喜欢 {likeNum}
                </Text>
              </Box>
            </Box>
            <Box paddingY={2}>
              <Link to={`/comments/${postID}/`}>
                <Button text={`添加评论(${commentNum})`} />
              </Link>
            </Box>
            <hr />
            <Box direction="row" display="flex" wrap={true}>
              {tags.map((item, key) => (
                <Tag to={`/search/all/${item}`} key={key} padding={2}>
                  #{item}
                </Tag>
              ))}
            </Box>
          </Box>
        </Column>
      </Box>
    </Block>
  );
};

const Header=({goBack})=>(
  <div style={{ zIndex: 1, position: 'relative' }}>
    <Box
      marginTop={6}
      marginLeft={6}
      position="fixed"
      display="none"
      mdDisplay="block"
    >
      <IconButton
        accessibilityLabel="返回"
        icon="arrow-back"
        onClick={() => goBack()}
        size="lg"
        iconColor="darkGray"
      />
    </Box>
  </div>
)
class Post extends Component {
  render() {
    let {
      data: { error, post, refetch, fetchMore, loading },
      history: { goBack, push },
      match: {
        params: { id },
      },
      selfUser,
      isPc,
    } = this.props;
    if (error) {
      return <div>文章没找到或已被删除!</div>;
    }


    let isSelf = false;
    let isAdmin = false;

    if (!loading && post) {
      isSelf = selfUser && selfUser.name == post.user.name;
      isAdmin = selfUser && selfUser.roles.includes('admin');
    }
    return (
      <Box color={isPc ? 'lightGray' : 'white'}>
        <Header goBack={goBack}/>

        {loading && <PageLoading />}
        {!loading && (
          <div>
            <Box display="none" mdDisplay="block" height={30} />
            <Content
              post={post}
              postID={id}
              push={push}
              isSelf={isSelf}
              isAdmin={isAdmin}
              goBack={goBack}
            />
            <Block
              marginTop={8}
              marginBottom={4}
              display="none"
              mdDisplay="block"
            >
              <Text bold size="lg">
                相似
              </Text>
            </Block>
            <Box paddingX={4} mdDisplay="none">
              <Text bold>相似</Text>
            </Box>
            <MoreLikes id={id} />
          </div>
        )}
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  selfUser: state.config.selfUser,
  isPc: state.config.isPc,
});

export default graphql(postQuery, {
  options: props => {
    return {
      variables: {
        id: props.match.params.id,
      },
      //fetchPolicy: "network-only"
    };
  },
})(connect(mapStateToProps)(Post));
