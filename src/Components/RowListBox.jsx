import React, { Component } from 'react';
import { Box } from 'gestalt';
import styled from 'styled-components';

class RowListBox extends Component {
  render() {
    return (
      <Box display="flex" overflow="auto" {...this.props}>{this.props.children}</Box>
    );
  }
}

export default RowListBox;
