import React, { Component } from 'react';
import { Box } from 'gestalt';
import styled from 'styled-components';
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
  startPrint = { x: 0, y: 0 };
  startLeft = 0;
  isDrag = false;
  state = { isDisable: false };
  startDrag(e) {
    e.preventDefault();
    this.startPrint = { x: e.clientX, y: e.clientY };
    this.startLeft = e.currentTarget.scrollLeft;
    this.isDrag = true;
  }
  stopDrag(e) {
    this.isDrag = false;
    this.setState({ isDisable: false });
  }
  move(e) {
    if (this.isDrag) {
      let left = this.startPrint.x - e.clientX;
      e.currentTarget.scrollLeft = this.startLeft + left;
      let d = Math.sqrt(
        (this.startPrint.x - e.clientX) * (this.startPrint.x - e.clientX) +
          (this.startPrint.y - e.clientY) * (this.startPrint.y - e.clientY)
      );
      if (d > 7) {
        if (!this.state.isDisable) this.setState({ isDisable: true });
      } else {
        if (this.state.isDisable) this.setState({ isDisable: false });
      }
    }
  }
  render() {
    return (
      <ListBox
        {...this.props}
        onMouseDown={this.startDrag.bind(this)}
        onMouseUp={this.stopDrag.bind(this)}
        onMouseMove={this.move.bind(this)}
        isDisable={this.state.isDisable}
      >
        {this.props.children}
      </ListBox>
    );
  }
}
export default RowListBox;
