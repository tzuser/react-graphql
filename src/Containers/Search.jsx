import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Box,Spinner,Text } from 'gestalt';
import Header from 'com_/Header';
import PostList from 'com_/PostList';
import SearchHeader from 'com_/SearchHeader';
import {withRouter} from 'react-router-dom';
import {ListLink,ListTitle} from 'com_/ListButton';

@withRouter
@graphql(gql`
  query($keyword:String){
    searchKeyword(keyword:$keyword){
      name
      count
    }
  }
`,{
  options:(props)=>{
    let {match:{params:{keyword}}}=props
      return {
      variables:{
        keyword:keyword
      }
  }},
})
class Search extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isKeyword:!!props.match.params.keyword
    }
  }

  onChangeKeyword(keyword){//搜索
    
    let {data:{fetchMore}}=this.props;
    if(keyword){
      fetchMore({
        variables:{
          keyword:keyword
        },
        updateQuery:(previousResult, { fetchMoreResult })=>{
          return fetchMoreResult
        }
      })
    }
    this.setState({isKeyword:!!keyword});
  }
  render(){
    let { data: { searchKeyword, refetch ,fetchMore,loading},history:{push} ,match:{params:{keyword}}}=this.props;
    let list=searchKeyword || [];
    let {isKeyword}=this.state;
    return (
      <div>
        <SearchHeader onChange={this.onChangeKeyword.bind(this)} />
         {!isKeyword || <Box paddingX={4}>
          {list.map((item,key)=>(<ListLink to={`/search/${item.name}`} key={key} text={item.name}/>))}
        </Box>}
          {!isKeyword && <Box paddingX={4}><ListTitle text="历史记录"/></Box>}
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {searchKeyword && searchKeyword.isEnd && <Box paddingY={2}><Text align="center" color="gray">到底了~</Text></Box>}
     </div>
    );
  }
}


export default Search;