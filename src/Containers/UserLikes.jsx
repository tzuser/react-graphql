import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Spinner, Text, Box } from 'gestalt';
import PostList from '../Components/PostList';
import { withRouter } from 'react-router-dom';
import likesQuery from 'gql_/likes.gql';
import { loadItems } from '_public';
import PageLoading from 'com_/PageLoading';
import InTheEnd from 'com_/InTheEnd';
import { withTheme } from 'styled-components';

@withTheme
class UserLikes extends React.Component {
  render() {
    let {
      data: { likes, refetch, fetchMore, loading },
      minCols,
      history: { push },
    } = this.props;
    if (loading) {
      return <PageLoading />;
    }
    return (
      <div>
        <PostList list={likes ? likes.list : []} minCols={minCols} loadItems={data => loadItems({ props: this.props, queryName: 'likes' })} />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {likes && likes.isEnd && <InTheEnd />}
      </div>
    );
  }
}

export default withRouter(
  graphql(likesQuery, {
    options: props => {
      return {
        variables: {
          first: 20,
          userName: props.userName,
        },
        //fetchPolicy: "network-only"
      };
    },
  })(UserLikes)
);
