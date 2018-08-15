import React,{Component} from 'react';
import {Card,Text,Box,Button,Avatar} from 'gestalt';
import {Link} from 'react-router-dom'
import {imageUrl} from '_tools'
import {withRouter} from 'react-router-dom';
@withRouter
class UserItem extends Component{
  componentWillUnmount(){
    console.log('卸载')
  }
  render(){
    let {data:{name,nick_name,avatar,id},history:{push},content:Content}=this.props;
    return <Box padding={3} >
      <Card image={
         <Link to={`/${name}/`}>
           <Avatar
             name={name}
             src={imageUrl(avatar)}
           />
         </Link>
       }>
       <Link to={`/${name}/`}>
       <Text align="center" bold size="sm"  truncate={true} >
           <Box paddingX={3} paddingY={2}>
             {nick_name || name}
           </Box>
       </Text>
       </Link>
       <Content {...this.props}/>
    </Card>
    
    </Box>
  }
}
export default UserItem