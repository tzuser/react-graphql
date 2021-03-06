import React,{Component} from 'react'
import {Box,IconButton,Heading,Avatar,Text} from 'gestalt';
import {FollowCountShow} from 'com_/follow/FollowCountButton';
import {withRouter} from 'react-router-dom';
import {imageUrl} from '_tools';
import HeaderContainer from 'com_/HeaderContainer';
import styled from 'styled-components';
import Block from 'com_/Block';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import userQuery from 'gql_/user.gql';

const FollowCount = styled.div`
	font-size:36px;
	font-weight: bold;
	color:#555;
	line-height: 1.2;
	font-family: Arial,sans-serif;

`


const Header=({goBack})=>(
  <HeaderContainer>
    <Box marginLeft={-3} flex="grow">
    <IconButton accessibilityLabel="返回" icon="arrow-back" onClick={goBack} />
    </Box>
  </HeaderContainer>
)


@withRouter
@graphql(userQuery,{
  options:(props)=>{
      return {
      variables:{
        name:props.userName||null,
        first:20
      }
  }},
})
class FollowHeader extends Component{
	render(){
		let {
		history:{goBack},
		data:{user,loading},
		attrName,
		title
		}=this.props;
		if(loading)return null;
		return (
		  	<div >
			<Header goBack={goBack}/>
			<Block>
			  	<Box direction="row" display="flex">
			  		<FollowCountShow >
			  			<FollowCount >{user[attrName]}</FollowCount>
			            <Text bold size="md" color="gray">{title}</Text>
			  		</FollowCountShow>
			  	</Box>
			    <Box direction="row" display="flex">
			      <Box flex="grow"></Box>
			      <Box marginLeft={1} column={3} flex="none" maxWidth={120} >
			      	<Avatar  name="Long" src={imageUrl(user.avatar)} />
			      </Box>
			    </Box>
		    </Block>
		    </div>
		)
  }
}
export default FollowHeader