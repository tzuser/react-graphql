import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Box,Spinner,Text } from 'gestalt';
import SearchResultHeader from 'com_/SearchResultHeader';
import PostList from 'com_/PostList';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchAct from 'act_/search';
import searchQuery from 'gql_/search.gql';


const mapStateToProps=(state)=>({

})
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  addHistoryAct:searchAct.addHistory
},dispatch)

@withRouter
@connect(mapStateToProps,mapDispatchToProps)
@graphql(searchQuery,{
  options:(props)=>{
    let {match:{params:{keyword}}}=props
      return {
      variables:{
        first:20,
        keyword:keyword
      }
  }},
})
class SearchResult extends React.Component{
  loadItems(data){
    let { data: { search, refetch ,fetchMore,loading} }=this.props
    if(!search)return;
    let {first,after,totalCount,isEnd}=search
    if(!isEnd && !loading){
        this.props.data.fetchMore({
          variables:{after,first},
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if(previousResult.search.list){
              fetchMoreResult.search.list=previousResult.search.list.concat(fetchMoreResult.search.list)
            }
            return fetchMoreResult;
          }
        })
    }
  }

  componentDidMount(){
    let {match:{params:{keyword}},addHistoryAct}=this.props;
    //存储搜索记录
    addHistoryAct(keyword)
  }
 
  render(){
    let { data: { search, refetch ,fetchMore,loading},history:{push},match:{params:{keyword}} }=this.props;
    return (
      <div>
          <SearchResultHeader keyword={keyword}/>
          <PostList 
          list={search?search.list:[]}
          loadItems={this.loadItems.bind(this)}
          />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {search && search.isEnd && <Box paddingY={2}><Text align="center" color="gray">到底了~</Text></Box>}
     </div>
    );
  }
}


export default SearchResult;