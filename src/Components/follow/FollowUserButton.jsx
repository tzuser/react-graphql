import React,{Component} from 'react';
import {GrayButton,RedButton} from 'com_/IconButton.jsx';
import { graphql,Mutation } from 'react-apollo';
import {Button} from 'gestalt';
import {errorReply} from '_public';
import gql from 'graphql-tag';
import FOLLOW from 'gql_/follow.gql';
import {withRouter} from 'react-router-dom';
import userQuery from 'gql_/user.gql';
import {connect} from 'react-redux';
const mapStateToProps=(state)=>({
  selfUser:state.config.selfUser
})
@withRouter
@connect(mapStateToProps)
@graphql(gql`
  query IsFollow($name:String!){
    isFollow(name:$name)
  }
`,
{options:(props)=>({
      variables:{
        name:props.userName
      },
      errorPolicy:"ignore",
    })
})
class FollowUserButton extends Component{
  state={addLoading:false}
  render(){
    let {userName,data:{isFollow,refetch,loading},history:{push},selfUser,buttonProps}=this.props;
    let BtnColor=isFollow?"gray":"red";
    let isLoading=loading || this.state.addLoading;
    return (
      <Mutation mutation={FOLLOW}>
      {(follow)=>(
        <Button 
        disabled={isLoading}
        text={isFollow?'不关注':'关注'} 
        color={BtnColor}
        onClick={()=>{
          this.setState({addLoading:true});
          follow({variables:{name:userName,isFollow:!isFollow},
            refetchQueries:[
            {
              query:userQuery, 
              variables:{
                name:userName
              }
            },
            {
              query:userQuery, 
              variables:{
                name:selfUser && selfUser.name
              }
            }
            ]
          }).then(data=>{
            refetch().then(err=>{
              this.setState({addLoading:false});
            }).catch(err=>{
              this.setState({addLoading:false});
            });
          }).catch(error=>{
            this.setState({addLoading:false});
            errorReply({error,push});
          });
        }}
        {...buttonProps}
        />
      )}
      </Mutation>
      )
  }
}

export default FollowUserButton