import React,{Component} from 'react';
import {GrayButton,RedButton} from 'com_/IconButton.jsx';
import { graphql,Mutation } from 'react-apollo';
import {Button} from 'gestalt';
import {errorReply} from '../public';
import gql from 'graphql-tag';

const FOLLOW=gql`mutation follow($userID:ID!,$isFollow:Boolean!){
    follow(userID:$userID,isFollow:$isFollow)
}`

class FollowUserButton extends Component{
  state={isFollow:null}
  render(){
    let {postID,initFollow,push,onFollow}=this.props;
    let isFollow=this.state.isFollow===null?initFollow:this.state.isFollow;
    let Btn=isFollow?RedButton:GrayButton
    return (
      <Mutation mutation={FOLLOW}>
      {(follow)=>(
        <Button 
        text={'关注'} 
        onClick={()=>{
          follow({variables:{post:postID,isFollow:!isFollow}}).then(data=>{
            if(onFollow)onFollow(!isFollow);
            this.setState({isFollow:!isFollow});
          }).catch(error=>{
            errorReply({error,push})
          });
        }}
        />
      )}
      </Mutation>
      )
  }
}

export default FollowUserButton