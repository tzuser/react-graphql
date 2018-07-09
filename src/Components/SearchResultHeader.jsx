import React,{Component} from 'react';
import {Box,Icon,SearchField,IconButton,Button,Text} from 'gestalt';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import HeaderContainer from 'com_/HeaderContainer';


const SearchButton=styled(Link)`
  transition: transform 0.2s ease-out;
  background-color: #efefef;
  border-radius: 8px;
  height: 40px;
  box-sizing: border-box;
  padding-left: 4px;
  padding-right: 12px;
  flex-direction: row;
  display: flex;
  text-decoration: none;
  flex: 1 1 auto;
  align-items: center;

  color: rgb(85, 85, 85);
  font-size: 18px;
  font-weight: 700;
  line-height:32px;
  font-family: "Helvetica Neue", Helvetica, arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.25px;
  
  &:active{
    border:1px solid #bbb;
    padding-left: 11px;
    padding-right: 11px;
  }
`
@withRouter
class SearchHeader extends Component{
  state={value:''}
  render(){
    let {keyword,history:{goBack,push,replace}}=this.props;
    return (
      <HeaderContainer>
        <SearchButton to={`/search_keyword/${keyword}`}>
          <Box flex="grow" paddingX={2}  >
            {keyword}
          </Box>
          <Box onTouchEnd={(e)=>{
            if (e.cancelable && !e.defaultPrevented) {
              push(`/search_keyword`);
              e.preventDefault();
              }}
            } >
            <Icon 
            icon="clear"
            size={20}
            accessibilityLabel="Pinterest"
            />
          </Box>
        </SearchButton>
        <Box  marginLeft={1}  >
          <Button onClick={goBack}  text="取消" size="sm" color="white" />
        </Box>
      </HeaderContainer>
    );
  }
}


export default SearchHeader;