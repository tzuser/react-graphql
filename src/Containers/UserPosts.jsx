import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Spinner,Text,Box } from 'gestalt';
import PostList from '../Components/PostList';
import {withRouter} from 'react-router-dom'
import userPostsQuery from 'gql_/userPosts.gql';
class UserPosts extends React.Component{
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
    let { data: { posts, refetch ,fetchMore,loading},minCols,history:{push} }=this.props;
    return (
      <div>
        <PostList 
        list={posts?posts.list:[]}
        minCols={minCols}
        loadItems={this.loadItems.bind(this)}
        />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {posts && posts.isEnd && <Box paddingY={2}><Text align="center" color="gray">到底了~</Text></Box>}
     </div>
    );
  }
}


export default withRouter(graphql(userPostsQuery,{
  options:(props)=>{
      return {
      variables:{
        first:20,
        userName:props.userName
      },
  }},
})(UserPosts));