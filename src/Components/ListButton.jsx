import React,{Component} from 'react';
import { Box,Text } from 'gestalt';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const Btn=styled(Link)`
  display:block;
  text-decoration:none;
  &:active{
    background:rgb(239,239,239);
  }
`
export const ListLink=({text,to="#"})=>{
  return (
    <Btn to={to}>
      <Box padding={2} >
            <Text bold size="xl">{text}</Text>
      </Box>
    </Btn>)
}
export const ListTitle=({text})=>{
  return (
    <Box paddingY={2} marginTop={2}>
      <Text  size="lg">{text}</Text>
    </Box>)
}