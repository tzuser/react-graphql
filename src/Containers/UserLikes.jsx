import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Spinner,Text,Box } from 'gestalt';
import PostList from '../Components/PostList';
import {withRouter} from 'react-router-dom'

class UserLikes extends React.Component{

  loadItems(data){
    let { data: { likes, refetch ,fetchMore,loading} }=this.props
    if(!likes)return;
    let {first,after,totalCount,isEnd}=likes;
    if(!isEnd && !loading){
        this.props.data.fetchMore({
          variables:{after,first},
          fetchPolicy: "network-only",
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if(previousResult.likes.list){
              fetchMoreResult.likes.list=previousResult.likes.list.concat(fetchMoreResult.likes.list)
            }
            return fetchMoreResult;
          }
        })
    }
  }
 
  render(){
    let { data: { likes, refetch ,fetchMore,loading},minCols,history:{push} }=this.props;
    return (
      <div>
        <PostList 
        list={likes?likes.list:[]}
        minCols={minCols}
        loadItems={this.loadItems.bind(this)}
        virtualize={false}
        />
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {likes && likes.isEnd && <Box paddingY={2}><Text align="center" color="gray">到底了~</Text></Box>}
     </div>
    );
  }

}


export default withRouter(graphql(gql`
  query likes($first:Int!,$after:ID,$userName:String!){
    likes(first:$first,after:$after,userName:$userName) {
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
        first:20,
        userName:props.userName
      },
      fetchPolicy: "network-only"
  }},
})(UserLikes));