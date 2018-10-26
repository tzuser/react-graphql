import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Spinner, Text, Box } from 'gestalt';
import PostList from '../Components/PostList';
import { withRouter } from 'react-router-dom';
import userPostsQuery from 'gql_/userPosts.gql';
import { loadItems } from '_public';
import InTheEnd from 'com_/InTheEnd';



class UserPosts extends React.Component {
  render() {
    let {
      data: { posts, refetch, fetchMore, loading },
      minCols,
      history: { push },
    } = this.props;
    return (
      <div>
        <PostList list={posts ? posts.list : []} minCols={minCols} loadItems={data => loadItems({ props: this.props, queryName: 'posts' })} />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {posts && posts.isEnd && <InTheEnd />}
      </div>
    );
  }
}

export default withRouter(
  graphql(userPostsQuery, {
    options: props => {
      return {
        variables: {
          first: 20,
          userName: props.userName,
        },
      };
    },
  })(UserPosts)
);
