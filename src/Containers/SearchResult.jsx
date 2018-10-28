import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Box, Spinner, Text, Column } from 'gestalt';
import SearchResultHeader from 'com_/SearchResultHeader';
import PostList from 'com_/PostList';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchAct from 'act_/search';
import searchQuery from 'gql_/search.gql';
import Block from 'com_/Block';
import UsersRow from 'con_/UsersRow';
import styled from 'styled-components';
import { loadItems } from '_public';


const Stacky = styled.div`
  position: sticky;
  top: 63px;
  z-index: 1;
  background: rgba(255, 255, 255);
`;

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addHistoryAct: searchAct.addHistory,
    },
    dispatch
  );


@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps
)
@graphql(searchQuery, {
  options: props => {
    let {
      match: {
        params: { keyword, type },
      },
    } = props;
    return {
      variables: {
        first: 20,
        keyword: keyword,
        type: type,
      },
    };
  },
})
class SearchResult extends React.Component {
  loadItems(data) {

    let {
      data: { searchPost, refetch, fetchMore, loading },
    } = this.props;
    if (!searchPost) return;
    let { first, after, totalCount, isEnd } = searchPost;
    if (!isEnd && !loading) {
      this.props.data.fetchMore;({
        variables: { after, first },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (previousResult.searchPost.list) {
            fetchMoreResult.searchPost.list = previousResult.searchPost.list.concat(fetchMoreResult.searchPost.list);
          }
          return fetchMoreResult;
        },
      });
    }
  }

  componentDidMount() {
    let {
      match: {
        params: { keyword },
      },
      addHistoryAct,
    } = this.props;
    //存储搜索记录
    addHistoryAct(keyword);
  }

  render() {
    let {
      data: { searchPost, refetch, fetchMore, loading },
      history: { push, replace },
      match: {
        params: { type, keyword },
      },
    } = this.props;
    const columnList = [{ text: '全部', type: 'all' }, { text: '文章', type: 'article' }, { text: '图片', type: 'photo' }, { text: '视频', type: 'video' }];
    let currentType = searchPost ? type : 'all';
    return (
      <div>
        <SearchResultHeader keyword={keyword} />

        <UsersRow />
        <Stacky>
          <Block>
            <Box display="flex" direction="row" paddingY={2}>
              {columnList.map((item, key) => (
                <Box marginRight={1} key={key}>
                  <Button
                    text={item.text}
                    size="sm"
                    inline={true}
                    color={item.type == currentType ? 'red' : 'white'}
                    onClick={() => {
                      replace(`/search/${item.type}/${keyword}`);
                      /* refetch({
                        first: 20,
                        keyword: keyword,
                        type: item.type,
                      });*/
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Block>
        </Stacky>
        <PostList list={searchPost ? searchPost.list : []} 
        loadItems={data => loadItems({ props: this.props, queryName: 'searchPost' ,condition:{keyword:keyword} })} />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {searchPost &&
          searchPost.isEnd && (
            <Box paddingY={2}>
              <Text align="center" color="gray">
                到底了~
              </Text>
            </Box>
          )}
      </div>
    );
  }
}

export default SearchResult;
