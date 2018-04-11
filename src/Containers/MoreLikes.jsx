import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Box,Spinner,Text } from 'gestalt';
import PostList from '../Components/PostList';
import {withRouter} from 'react-router-dom';

class MoreLikes extends React.Component{
  loadItems(data){
    let { data: { moreLikes, refetch ,fetchMore} }=this.props
    if(!moreLikes)return;
    let {first,after,totalCount,isEnd}=moreLikes
    if(!isEnd){
        this.props.data.fetchMore({
          variables:{after,first},
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if(previousResult.moreLikes.list){
              fetchMoreResult.moreLikes.list=previousResult.moreLikes.list.concat(fetchMoreResult.moreLikes.list)
            }
            return fetchMoreResult;
          }
        })
    }
  }
 
  render(){
    let { data: { moreLikes, refetch ,fetchMore,loading},history:{push} }=this.props;
    return (
      <div>
        <Box margin={2} >
          <PostList 
          list={moreLikes?moreLikes.list:[]}
          minCols={2}
          loadItems={this.loadItems.bind(this)}
          itemClick={(e,item)=>{
            push(`/post/${item.id}`)
          }}
          userClick={(e,item)=>{
            push(`/user/${item.user.id}`)
          }}/>
        </Box>
        <Spinner show={loading} accessibilityLabel="Example spinner" />
        {moreLikes && moreLikes.isEnd && <Box paddingY={2}><Text align="center" color="gray">到底了~</Text></Box>}
     </div>
    );
  }
}


export default withRouter(graphql(gql`
  query($id:ID!,$first:Int!,$after:ID){
    moreLikes(id:$id,first:$first,after:$after) {
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
        first:6,
        id:props.id
      }
  }},
})(MoreLikes));