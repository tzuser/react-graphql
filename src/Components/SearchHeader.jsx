import React,{Component} from 'react';
import {Box,Icon,SearchField,IconButton,Button,Text} from 'gestalt';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const HeaderBox=styled.div`
  background-color:white;
  top:0;
  right:0;
  left:0;
  position:fixed;
  padding:12px 16px;
  z-index:1;
  height:64px;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  display: flex;

`

@withRouter
class SearchHeader extends Component{
  state={value:''}
  render(){
    let {keyword,history:{goBack,push}}=this.props;
    return (
      <div style={{height:64}}>
        <HeaderBox >
            <Box flex="grow"  >
              <SearchField 

              id="searchField" 
              accessibilityLabel="search" 
              placeholder="搜索"
              onChange={({ value }) => this.setState({ value })}
              value={this.state.value} />
            </Box>
            <Box  marginLeft={1} flex="none" >
              <Button onClick={goBack} text="取消" size="sm" color="white" />
            </Box>
        </HeaderBox>
      </div>
    );
  }
}


export default SearchHeader;