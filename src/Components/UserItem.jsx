import React,{Component} from 'react';
import {Card,Text,Box,Button,Avatar} from 'gestalt';
import {Link} from 'react-router-dom'
import {imageUrl} from '_tools'
import {withRouter} from 'react-router-dom';
@withRouter
class UserItem extends Component{
  render(){
    let {data:{name,nick_name,avatar,id},history:{push}}=this.props;
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
       <Button
          onClick={(event)=>{
            push(`/${name}/`)
          }}
          accessibilityLabel="Follow James Jones"
          color="red"
          text="关注"
       />
     </Card>
    
    </Box>
  }
}
export default UserItem