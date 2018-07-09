//我关注的
import React,{Component} from 'react';
import HeaderContainer from '../Components/HeaderContainer';
import {Box,IconButton,Heading,Avatar} from 'gestalt';
import {errorReply,imageUrl} from 'tools_';
import {withRouter} from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PageLoading from '../Components/PageLoading';

const Header=({goBack})=>(
  <HeaderContainer>
    <Box marginLeft={-3} flex="grow">
    <IconButton accessibilityLabel="返回" icon="arrow-back" onClick={goBack} />
    </Box>
  </HeaderContainer>
)

const UserCard=({user})=>{
  if(!user)return null;
  return (
  	<Box >
  	<Box direction="row" display="flex">
  	  <Box flex="grow">
  	  <Heading size="xs">{user.nick_name}</Heading>
  	  </Box>
  	</Box>
    <Box direction="row" display="flex">
      <Box flex="grow"></Box>
      <Box marginLeft={1} column={2} flex="none"><Avatar  name="Long" src={imageUrl(user.avatar)} /></Box>
    </Box>
    </Box>
    )
}

@withRouter
@graphql(gql`
  query($name:String){
    user(name:$name){
      id
      name
      nick_name
      avatar
    }
  }
`,{
  options:(props)=>{
      return {
      variables:{
        name:props.match.params.name||null,
      }
  }},
})
class Following extends Component{
	render(){
		let {data:{user,loading},history:{goBack},match:{params:{name}}}=this.props;
		if(loading) return <PageLoading />;

    	
		return <Box paddingX={4}>
		<Header goBack={goBack}/>
		<UserCard user={user} />
		我关注的
		</Box>
	}
}


export default Following