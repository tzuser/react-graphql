import React,{Component} from 'react';
import {Box} from 'gestalt';
import styled from 'styled-components';

class Block extends Component{
  render(){
    return (
      <Box display="flex" justifyContent="center">
        <Box paddingX={4} maxWidth={800} width="100%">
            {this.props.children}
        </Box>
      </Box>
    );
  }
}
export default Block;