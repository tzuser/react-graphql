import React,{Component} from 'react';
import {Spinner,Box} from 'gestalt';

class PageLoading extends Component{
  render(){
    return(<Box paddingY={4}><Spinner show={true} accessibilityLabel="Example spinner" /></Box>)
  }
}
export default PageLoading