import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Box, Spinner, Text, IconButton, Mask, Image, Avatar, Button, Icon, TextField } from 'gestalt';
import HeaderContainer from '../Components/HeaderContainer';
import styled from 'styled-components';
import Scroll from '../Components/Scroll';
import { Mutation } from 'react-apollo';
import { imageUrl } from '_tools';
import { errorReply } from '_public';
import hiddenFooter from '../Components/HiddenFooter';
import PageLoading from '../Components/PageLoading';
import commentsQuery from 'gql_/comments.gql';
import ADD_COMMENT from 'gql_/addComment.gql';
import Block from 'com_/Block';


const CommentInput = styled.div`
  input {
    background-color: #efefef;
    border: 1px solid #efefef;
    &:hover {
      background-color: #efefef;
      border: 1px solid #efefef;
    }
  }
`;
const UserNode = ({ user, content, reply, onReply, userClick }) => (
  <Box direction="row" marginTop={2} display="flex" alignItems="start" paddingY={2}>
    <div onClick={e => userClick(e, user)}>
      <Avatar size="sm" src={imageUrl(user.avatar)} name="Long" />
    </div>
    <Box paddingX={2} flex="grow">
      <div
        onClick={() => {
          onReply(user);
        }}
      >
        <Box direction="row" display="flex" justifyContent="start" alignItems="start">
          <Text bold size="xs" inline>
            {user.nick_name}
          </Text>
          {reply && (
            <Box direction="row" display="flex">
              <Box marginLeft={1} marginRight={1}>
                <Icon icon="send" accessibilityLabel="send" color="gray" size={12} />
              </Box>
              <Text size="xs" inline>
                {reply.nick_name}
              </Text>
            </Box>
          )}
        </Box>

        <Box paddingY={1}>
          <Text overflow="normal" leading="tall" size="sm">
            {content}
          </Text>
        </Box>
      </div>
    </Box>
  </Box>
);


@graphql(commentsQuery, {
  options: props => {
    return {
      variables: {
        id: props.match.params.id,
        first: 20,
      }
    };
  },
})
@hiddenFooter
class Comments extends Component {
  state = {
    comment: '',
    replyId: null,
    replyName: null,
  };
  /*componentWillReceiveProps(nextProps){
    console.log(nextProps);
  }*/
  /*componentDidMount() {
    this.scrollBox = ReactDOM.findDOMNode(this);
  }*/
  async getNewComments(isPoll = false) {
    //获取新消息
    if (!this.props.data || !this.props.data.comments) return;
    let { comments, fetchMore } = this.props.data;
    let { list } = comments;

    let after = list[0] ? list[0].id : null;
    let options = {
      variables: { first: 20, desc: false, after },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        let pCom = previousResult.comments;
        let nCom = fetchMoreResult.comments;
        let resList = pCom.list || [];
        if (nCom.list) {
          resList = nCom.list.concat(resList);
        }
        return {
          ...previousResult,
          comments: { ...previousResult.comments, list: resList },
        };
      },
    };
    if (isPoll) options.pollInterval = 2000;
    return await fetchMore(options);
  }

  async send(addComment) {
    let {
      data: { refetch },
      history: { push },
      match: {
        params: { id },
      },
    } = this.props;
    try {
      let data = await addComment({
        variables: {
          post: id,
          content: this.state.comment,
          reply: this.state.replyId,
        },
      });
    } catch (error) {
      errorReply({ error, push });
      return;
    }
    this.setState({ comment: '' });
    this.setState({ replyId: null, replyName: null });
    //await refetch();
    await this.getNewComments();
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    let {
      data: { error, comments, refetch, fetchMore, loading },
      history: { goBack, push },
      match: {
        params: { id },
      },
    } = this.props;
    if (loading) {
      return <PageLoading />;
    }
    let list = comments.list.concat().reverse();
    let { replyName, replyId } = this.state;
    return (
      <Box height="100%" display="flex" direction="column">
        <HeaderContainer isFixed={false}>
          <Box marginLeft={-3}>
            <IconButton accessibilityLabel="返回" icon="arrow-back" onClick={() => goBack()} />
          </Box>
          <Box flex="grow">
            <Text bold size="lg">
              评论
            </Text>
          </Box>
        </HeaderContainer>
        <Scroll
          bottom={true}
          onTop={(target, cTop) => {
            console.log('aaa');
            if (comments.isEnd) return;
            let scrollStartH = target.scrollHeight;
            fetchMore({
              variables: { after: comments.after, first: comments.first },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (previousResult.comments.list) {
                  fetchMoreResult.comments.list = previousResult.comments.list.concat(fetchMoreResult.comments.list);
                }
                return fetchMoreResult;
              },
            }).then(data => {
              let span = target.scrollHeight - scrollStartH;
              if (span > 0) target.scrollTo(0, span + cTop);
            });
          }}
        >
          <Block>
            <Spinner show={!comments.isEnd} accessibilityLabel="Example spinner" />
            {list.map((item, key) => (
              <UserNode
                key={key}
                user={item.user}
                reply={item.reply}
                content={item.content}
                onReply={({ id, nick_name }) => this.setState({ replyId: id, replyName: nick_name })}
                userClick={(e, data) => push(`/${data.name}/`)}
              />
            ))}
          </Block>
        </Scroll>
        <Mutation mutation={ADD_COMMENT}>
          {addComment => {
            return (
              <Box color="white">
                {replyName && (
                  <Box paddingX={4} display="flex" color="lightGray" direction="row" justifyContent="between" alignItems="center">
                    <div>回复 {replyName}</div>
                    <IconButton accessibilityLabel="Love" icon="clear" size="sm" iconColor="darkGray" onClick={() => this.setState({ replyId: null, replyName: null })} />
                  </Box>
                )}
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    this.send(addComment);
                  }}
                >
                  <Box paddingY={3} paddingX={4} display="flex" direction="row" alignItems="center">
                    <Box flex="grow">
                      <CommentInput>
                        <TextField
                          id="comment"
                          type="text"
                          value={this.state.comment}
                          placeholder="评论"
                          autoComplete="off"
                          onChange={({ event, value }) => {
                            this.setState({ comment: value });
                          }}
                        />
                      </CommentInput>
                    </Box>
                    {this.state.comment.trim() && (
                      <Box paddingX={2}>
                        <Button color="red" text="发送" type="submit" />
                      </Box>
                    )}
                  </Box>
                </form>
              </Box>
            );
          }}
        </Mutation>
      </Box>
    );
  }
}

export default Comments;
