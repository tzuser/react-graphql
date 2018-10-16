import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Box, Spinner } from 'gestalt';
import Header from 'com_/Header';
import PostList from 'com_/PostList';
import { withRouter } from 'react-router-dom';
//import RestoredScroll from 'com_/RestoredScroll';
import pushPostQuery from 'gql_/pushPost.gql';
import { loadItems } from '_public';
import InTheEnd from 'com_/InTheEnd';
@withRouter
@graphql(pushPostQuery, {
  options: props => {
    return {
      variables: {
        first: 20,
      },
    };
  },
})
class PushPost extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      data: { getPush, refetch, fetchMore, loading },
      history: { push },
    } = this.props;
    return (
      <div>
        <Header />
        <PostList
          list={getPush ? getPush.list : []}
          loadItems={data =>
            loadItems({ props: this.props, queryName: 'getPush' })
          }
        />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {getPush && getPush.isEnd && <InTheEnd />}
      </div>
    );
  }
}

export default PushPost;
