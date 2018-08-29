import React, { Component } from 'react';
import { Box } from 'gestalt';
import styled from 'styled-components';

class Block extends Component {
  render() {
    let { children, ...other } = this.props;
    return (
      <Box display="flex" justifyContent="center">
        <Box paddingX={4} maxWidth={920} width="100%" {...other}>
          {children}
        </Box>
      </Box>
    );
  }
}
export default Block;
