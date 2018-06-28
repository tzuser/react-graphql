import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Box,Spinner,Text } from 'gestalt';
import Header from 'com_/Header';
import PostList from 'com_/PostList';
import {withRouter} from 'react-router-dom';
//import RestoredScroll from 'com_/RestoredScroll';
@withRouter
@graphql(gql`
  query($first:Int!,$after:ID){
    posts(first:$first,after:$after) {
      first
      after
      isEnd
      list{
       id
       content
       type
       thumbnail{
         ...photo
       }
       photos{
         ...photo
       }
       user{
        name
         nick_name
         avatar
         id
       }
      }
    }
  }
  fragment photo on Photo{
    url
    width
    height
  }
`,{
  options:(props)=>{
      return {
      variables:{
        first:20
      }
  }},
})
class Home extends React.Component{
  loadItems(data){
    let { data: { posts, refetch ,fetchMore,loading} }=this.props
    if(!posts)return;
    let {first,after,totalCount,isEnd}=posts
    if(!isEnd && !loading){
        this.props.data.fetchMore({
          variables:{after,first},
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if(previousResult.posts.list){
              fetchMoreResult.posts.list=previousResult.posts.list.concat(fetchMoreResult.posts.list)
            }
            return fetchMoreResult;
          }
        })
    }
  }
 
  render(){
    let { data: { posts, refetch ,fetchMore,loading},history:{push} }=this.props;
    return (
      <div>
        <Header/>
        
          <PostList 
          list={posts?posts.list:[]}
          loadItems={this.loadItems.bind(this)}
          />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {posts && posts.isEnd && <Box paddingY={2}><Text align="center" color="gray">到底了~</Text></Box>}
     </div>
    );
  }
}


export default Home;