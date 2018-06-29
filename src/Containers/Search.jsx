import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Box,Spinner,Text } from 'gestalt';
import Header from 'com_/Header';
import PostList from 'com_/PostList';
import SearchHeader from 'com_/SearchHeader';
import {withRouter} from 'react-router-dom';
@withRouter
@graphql(gql`
  query($keyword:String!){
    searchKeyword(keyword:$keyword) 
  }
`,{
  options:(props)=>{
    let {match:{params:{keyword}}}=props
      return {
      variables:{
        keyword:"test"
      }
  }},
})
class Search extends React.Component{
  render(){
    let { data: { searchKeyword, refetch ,fetchMore,loading},history:{push} ,match:{params:{keyword}}}=this.props;
    return (
      <div>
        <SearchHeader keyword={keyword} />
        {searchKeyword && searchKeyword.map((item,key)=>(<span key={key}>{item}</span>))}
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {searchKeyword && searchKeyword.isEnd && <Box paddingY={2}><Text align="center" color="gray">到底了~</Text></Box>}
     </div>
    );
  }
}


export default Search;