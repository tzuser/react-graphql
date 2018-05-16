import React,{Component} from 'react';
//import PageLoading from '../Components/PageLoading';
import hiddenFooter from '../Components/hiddenFooter';
import {Box,Text} from 'gestalt';
class Settings extends Component{
  render(){
    return <Box padding={4}>
      <Text color="gray"  align="center">设置页面</Text>
    </Box>
  }
}


export default hiddenFooter(Settings);