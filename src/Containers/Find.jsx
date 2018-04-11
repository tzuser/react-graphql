import React,{Component} from 'react';
import Header from '../Components/Header';
import { Box,Spinner,Text,Heading  } from 'gestalt';
import {ListLink,ListTitle} from '../Components/ListButton'
class Find extends Component{
  render(){
    return <div>
    <Header/>
    <Box paddingX={4}>
      <ListLink text="流行"/>
      <ListLink text="Gifs"/>
      <ListLink text="视频"/>
      <ListTitle text="全部分类"/>
      <ListLink text="萝莉"/>
      <ListLink text="美少女"/>
      <ListLink to="/post/5ab9bdf9868bd156d0c69bce/" text="福利姬"/>
    </Box>
    </div>
  }
}


export default Find;