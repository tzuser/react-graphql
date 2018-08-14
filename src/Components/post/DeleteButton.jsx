import React,{Component} from 'react';
import DEL_POST from 'gql_/delPost.gql';
import { Mutation } from "react-apollo";
import { Button} from 'gestalt';
import {errorReply} from '_public';

const DeleteButton=({postID,goBack,push})=>(
  <Mutation mutation={DEL_POST}>
  {(mutate)=>(            
    <Button text="删除" size="sm" onClick={()=>{
      mutate({variables:{post:postID}}).then(data=>{
        goBack()
      }).catch(error=>{
        errorReply({error,push})
      });
    }}/>
  )}
  </Mutation>
)
export default DeleteButton