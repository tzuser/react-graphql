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
import Recommend from 'con_/Recommend';

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
    let list = subscribe ? subscribe.list : [];
    if (list.length == 0) return <Recommend />;
    return (
      <div>
        <Header />
        <PostList
          name="Subscribe"
          list={list}
          loadItems={data => loadItems({ props: this.props, queryName: 'subscribe' })}
        />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {subscribe && subscribe.isEnd && <InTheEnd />}
      </div>
    );
  }
}

export default Subscribe;
