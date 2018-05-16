import React,{Component} from 'react';
import {Heading,Modal,Box,Text,Button,TextField,Spinner } from 'gestalt';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {errorReply,makeCancelable} from '../public'
import {withRouter} from 'react-router-dom';
class AddImage extends Component{
  state={url:"",errorMessage:"",loading:false}
  componentWillUnmount(){
    if(this.post)this.post.cancel();//取消请求
  }
  render(){
    let {mutate,addPhoto,onDismiss,history:{push}}=this.props;
    return (
    <form style={{zIndex:99,position:'relative'}} 
      onSubmit={e => {
            e.preventDefault();
            if(this.state.loading)return;
            this.setState({loading:true})
            this.post=makeCancelable(mutate({variables:{
              url:this.state.url,
            }}));
            this.post.promise.then(({data})=>{
              this.setState({loading:false});
              addPhoto(data.urlToPhoto)
              onDismiss()
            }).catch(async (err)=>{
              console.log(err)
              await errorReply({error:err,push})
              if(err.graphQLErrors && err.graphQLErrors[0]){
                this.setState({
                  loading:false,
                  errorMessage:err.graphQLErrors[0].message || "请求出错"
                });
              }
            })

        }}>

      <Modal
        accessibilityCloseLabel="close"
        accessibilityModalLabel="Edit Julia's board"
        heading="添加图片"
        onDismiss={this.props.onDismiss}
        footer={
          <Box >
            {this.state.loading &&<Box marginBottom={2}>
            <Spinner show={true} accessibilityLabel="Example spinner" />
            </Box>}
            {!this.state.loading && <Button text="添加" color="red" type="submit"/>}
          </Box>
        }
        size="md"
      >
        <Box padding={4}>
          <TextField id="url" type="url" onChange={({event,value})=>this.setState({url:value})} value={this.state.url}  />
          {this.state.errorMessage}
        </Box>
      </Modal>
    </form>)
  }
}

export default withRouter(graphql(gql`
 mutation urlToPhoto($url:String!) {
    urlToPhoto(url:$url){
      url
      width
      height
    }
  }
`)(AddImage))