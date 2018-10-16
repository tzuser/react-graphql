import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Box } from 'gestalt';
import styled from 'styled-components';
import ScrollDrag from 'com_/ScrollDrag';
const ListBox = styled.div`
  display: flex;
  overflow: auto;
  ${p => (p.isDisable && `
    >*{
    pointer-events: none;
    }
  `)}
`;

class RowListBox extends Component {
  render() {
    return (
      <ScrollDrag >
        <ListBox
          {...this.props}
        >
          {this.props.children}
        </ListBox>
      </ScrollDrag>
    );
  }
}
export default RowListBox;
