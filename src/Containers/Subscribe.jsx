import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Box, Spinner } from 'gestalt';
import Header from 'com_/Header';
import PostList from 'com_/PostList';
import { withRouter } from 'react-router-dom';
import subscribeQuery from 'gql_/subscribe.gql';
import { loadItems } from '_public';
import InTheEnd from 'com_/InTheEnd';

@withRouter
@graphql(subscribeQuery, {
  options: props => {
    return {
      variables: {
        first: 20,
      },
      ssr: false,
    };
  },
})
class Subscribe extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      data: { subscribe, refetch, fetchMore, loading },
      history: { push },
    } = this.props;
    return (
      <div>
        <Header />
        <PostList
          list={subscribe ? subscribe.list : []}
          loadItems={data =>
            loadItems({ props: this.props, queryName: 'subscribe' })
          }
        />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {subscribe && subscribe.isEnd && <InTheEnd />}
      </div>
    );
  }
}

export default Subscribe;
