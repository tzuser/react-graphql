import React,{Component} from 'react';
import {Box,Icon,SearchField,IconButton,Button,Text} from 'gestalt';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import HeaderContainer from 'com_/HeaderContainer';

const SearchButton=styled(Link)`
  transition: transform 0.2s ease-out;
  background-color: #efefef;
  border-radius: 8px;
  height: 40px;
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
  flex-direction: row;
  display: flex;
  text-decoration: none;
  flex: 1 1 auto;
  align-items: center;
  &:active{
    border:1px solid #bbb;
    padding-left: 11px;
    padding-right: 11px;
  }
`

class Header extends Component{
  state={value:''}
  render(){
    return (
      <HeaderContainer>
            <SearchButton to="/search_keyword/">
              <Box padding={1} >
                <Icon 
                icon="search"
                size={16}
                accessibilityLabel="Pinterest"
                />
              </Box>
              <Box flex="grow" padding={3} >
                <Text bold color="gray">搜索</Text>
              </Box>
            </SearchButton>
      </HeaderContainer>
    );
  }
}


export default Header;