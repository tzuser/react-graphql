import React,{Component} from 'react';
import {GrayButton,RedButton} from 'com_/IconButton.jsx';
import { graphql,Mutation } from 'react-apollo';
import {Button} from 'gestalt';
import {errorReply} from '_public';
import gql from 'graphql-tag';
import FOLLOW from 'gql_/follow.gql';
@graphql(gql`
  query IsFollow($name:String!){
    isFollow(name:$name)
  }
`,
{options:(props)=>({
      variables:{
        name:props.userName
      },
    })
})
class FollowUserButton extends Component{
  state={addLoading:false}
  render(){
    let {userName,push,data:{isFollow,refetch,loading}}=this.props;
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
          follow({variables:{name:userName,isFollow:!isFollow}}).then(data=>{
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
        />
      )}
      </Mutation>
      )
  }
}

export default FollowUserButton