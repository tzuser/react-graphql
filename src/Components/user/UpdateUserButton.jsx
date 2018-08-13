import React,{Component} from 'react';
import {GrayButton,RedButton} from 'com_/IconButton.jsx';
import { graphql,Mutation } from 'react-apollo';
import {Button} from 'gestalt';
import {errorReply} from '_public';
import gql from 'graphql-tag';
import ISUPDATE from 'gql_/isUpdate.gql';
import {withRouter} from 'react-router-dom';


@withRouter
@graphql(gql`
  query IsUpdate($name:String!){
    isUpdate(name:$name)
  }
`,
{options:(props)=>({
      variables:{
        name:props.userName
      },
      errorPolicy:"ignore",
    })
})
class UpdateUserButton extends Component{
  state={addLoading:false}
  render(){
    let {userName,data:{isUpdate,refetch,loading},history:{push}}=this.props;
    let BtnColor=isUpdate?"gray":"blue";
    let isLoading=loading || this.state.addLoading;
    return (
      <Mutation mutation={ISUPDATE}>
      {(setUpdate)=>(
        <Button 
        disabled={isLoading}
        text={isUpdate?'不更新':'更新'} 
        color={BtnColor}
        onClick={()=>{
          this.setState({addLoading:true});
          setUpdate({variables:{name:userName,isUpdate:!isUpdate}}).then(data=>{
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

export default UpdateUserButton