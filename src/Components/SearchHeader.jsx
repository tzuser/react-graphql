import React,{PureComponent} from 'react';
import {Box,Icon,IconButton,Button,Text} from 'gestalt';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import SearchFieldFocus from 'com_/SearchFieldFocus.jsx';
import HeaderContainer from 'com_/HeaderContainer';


const SearchContainer=styled.form`
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
const SearchInput=styled.input`
    width:100%;
    background:none;
    border:none;
    color: rgb(85, 85, 85);
    font-size: 18px;
    font-weight: 700;
    padding: 0px;
    outline: none;
    font-family: "Helvetica Neue", Helvetica, arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-appearance: radio;
    letter-spacing: -0.25px;
    line-height: 24px;
    box-sizing: border-box;
    &::-webkit-search-cancel-button {display: none;}
`
@withRouter
class SearchHeader extends PureComponent{
  constructor(props){
    super(props);
    let {match:{params:{keyword}}}=props
    this.state={value:keyword?`${keyword}`:''}
  }
  render(){
    let {history:{goBack,push},onChange}=this.props;
    return (
      <HeaderContainer>
        <SearchContainer onSubmit={e => {
          e.preventDefault();
          push(`/search/${this.state.value}`)
        }}>
          <SearchInput 
          autoFocus
          autoCapitalize="none" 
          type="search"   
          onChange={(event) => {
            this.setState({ value: event.target.value })
            onChange(event.target.value);
          }}
          value={this.state.value}
          />
          {this.state.value && <Box onTouchEnd={()=>{
            this.setState({value:''});
            onChange('');
          }} >
            <Icon 
            icon="clear"
            size={20}
            accessibilityLabel="Pinterest"
            />
          </Box>}
        </SearchContainer>
        <Box  marginLeft={1} flex="none" >
          <Button onClick={goBack} text="取消" size="sm" color="white" />
        </Box>
      </HeaderContainer>
    );
  }
}


export default SearchHeader;