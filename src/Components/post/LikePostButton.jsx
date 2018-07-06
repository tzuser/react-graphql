import React,{Component} from 'react';
import {GrayButton,RedButton} from 'com_/IconButton.jsx';
import { graphql,Mutation,Query } from 'react-apollo';
import {Button,Icon} from 'gestalt';
import gql from 'graphql-tag';
import {errorReply} from '@/public';

const LIKE=gql`mutation like($post:ID!,$isLike:Boolean!){
    like(post:$post,isLike:$isLike)
}`

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
  state={isLike:null}
  render(){
    let {postID,initLike,push,onLike,data:{isLike}}=this.props;
    console.log(isLike)
    let resIsLike=this.state.isLike===null?isLike:this.state.isLike;
    let Btn=resIsLike?GrayButton:RedButton
    return (
      <Mutation mutation={LIKE}>
      {(like)=>(
        <Btn onClick={()=>{
          like({variables:{post:postID,isLike:!resIsLike}}).then(data=>{
            console.log(data)
            if(onLike)onLike(!resIsLike);
            this.setState({isLike:!resIsLike});
          }).catch(error=>{
            errorReply({error,push})
          });
        }}>
          <Icon size={14} accessibilityLabel="喜欢" icon="heart"  />
          {resIsLike?"不喜欢":"喜欢"}
        </Btn>
      )}
      </Mutation>
      )
  }
}
export default LikeButton