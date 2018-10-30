import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Box, Spinner } from 'gestalt';
import Header from 'com_/Header';
import PostList from 'com_/PostList';
import { withRouter } from 'react-router-dom';
//import RestoredScroll from 'com_/RestoredScroll';
import homePostsQuery from 'gql_/homePosts.gql';
import { loadItems } from '_public';
import InTheEnd from 'com_/InTheEnd';

@withRouter
@graphql(homePostsQuery, {
  options: props => {
    return {
      variables: {
        first: 20,
      },
    };
  },
})
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      data: { posts, refetch, fetchMore, loading },
      history: { push },
    } = this.props;
    return (
      <React.Fragment>
        <Header />
        <PostList
          name="Home"
          list={posts ? posts.list : []}
          loadItems={data => loadItems({ props: this.props, queryName: 'posts' })}
        />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {posts && posts.isEnd && <InTheEnd />}
      </React.Fragment>
    );
  }
}

export default Home;
