import React,{Component} from 'react'
import {Box,IconButton,Heading,Avatar,Text} from 'gestalt';
import {FollowCountShow} from 'com_/FollowCountButton';
import {withRouter} from 'react-router-dom';
import {imageUrl} from 'tools_';
import HeaderContainer from 'com_/HeaderContainer';
import styled from 'styled-components';
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
class FollowHeader extends Component{
	render(){
		let {user,history:{goBack},
		followCount,
		title
		}=this.props;
		if(!user)return null;
		return (
		  	<div >
			<Header goBack={goBack}/>
		  	<Box direction="row" display="flex">
		  		<FollowCountShow >
		  			<FollowCount >{followCount}</FollowCount>
		            <Text bold size="md" color="gray">{title}</Text>
		  		</FollowCountShow>
		  	</Box>
		    <Box direction="row" display="flex">
		      <Box flex="grow"></Box>
		      <Box marginLeft={1} column={2} flex="none"><Avatar  name="Long" src={imageUrl(user.avatar)} /></Box>
		    </Box>
		    </div>
		)
  }
}
export default FollowHeader