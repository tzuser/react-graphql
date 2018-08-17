import React,{Component} from 'react';
import DEL_USER from 'gql_/delUser.gql';
import { Mutation } from "react-apollo";
import { Button} from 'gestalt';
import {errorReply} from '_public';
import Alert from 'con_/modal/Alert';
import portalApi from 'con_/modal/portalApi';
class DeleteButton extends Component{
  state={showAlert:false}
  render(){
    let {userName,goBack,push}=this.props;
    return (
      <Mutation mutation={DEL_USER}>
      {(mutate)=>(
        <div> 
          <Button text="删除" size="md" onClick={()=>{
            //this.setState({showAlert:true})
            portalApi(Alert,{
              title:'确认删除?',
              content:'删除用户，用户所有数据及文件将被删除',
              onConfirm:()=>{
                mutate({variables:{name:userName}}).then(data=>{
                  //goBack()
                  console.log(data)
                }).catch(error=>{
                  errorReply({error,push})
                });

              }
            })
          }}/>
        </div>
      )}
      </Mutation>)
  }
}

export default DeleteButton