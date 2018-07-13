import React,{Component} from 'react';
import {GrayButton,RedButton} from 'com_/IconButton.jsx';
import { graphql,Mutation,Query } from 'react-apollo';
import {Button,Icon} from 'gestalt';
import gql from 'graphql-tag';
import {errorReply} from 'tools_';
import likesQuery from 'gql_/likes.gql';
import {connect} from 'react-redux';
const LIKE=gql`mutation like($post:ID!,$isLike:Boolean!){
    like(post:$post,isLike:$isLike)
}`

const mapStateToProps=(state)=>({
  selfUser:state.config.selfUser
})
@connect(mapStateToProps)
@graphql(gql`
  query isLike($id:ID!){
    isLike(id:$id)
  }
`,
{options:(props)=>{
    return {
      variables:{
        id:props.postID
      },
      //fetchPolicy: "network-only"
    }
  }
})
class LikeButton extends Component{
  render(){
    let {postID,push,data:{isLike,refetch},selfUser}=this.props;
    console.log(this.props)
    let Btn=isLike?GrayButton:RedButton
    return (
      <Mutation mutation={LIKE}>
      {(like)=>(
        <Btn onClick={()=>{
          like({variables:{post:postID,isLike:!isLike},
            refetchQueries:[
            {
              query:likesQuery, 
              variables:{
                first:20,
                userName:selfUser.name
              }
            }
            ]
          }).then(data=>{
            refetch()
          }).catch(error=>{
            errorReply({error,push})
          });
        }}>
          <Icon size={14} accessibilityLabel="喜欢" icon="heart"  />
          {isLike?"不喜欢":"喜欢"}
        </Btn>
      )}
      </Mutation>
      )
  }
}

export default LikeButton