import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
  constructor(props){
    super(props);
    this.startDrag=this._startDrag.bind(this);
    this.stopDrag=this._stopDrag.bind(this);
    this.move=this._move.bind(this);
    this.click=this._click.bind(this);
  }
  
  componentDidMount(){
    const $this=ReactDOM.findDOMNode(this);
    $this.addEventListener('mousedown',this.startDrag,false)
    $this.addEventListener('mouseup',this.stopDrag,true)
    $this.addEventListener('mousemove',this.move,false)
    $this.addEventListener('click',this.click,true)
  }

  _startDrag(e) {
    e.preventDefault();
    this.startPrint = { x: e.clientX, y: e.clientY };
    this.startLeft = e.currentTarget.scrollLeft;
    this.isDrag = true;
  }

  _stopDrag(e) {
    this.isDrag = false;  
    this.stopEvent(e) 
  }

  _click(e){
    this.stopEvent(e)
  }

  stopEvent(e){
    let d = Math.sqrt(
      (this.startPrint.x - e.clientX) * (this.startPrint.x - e.clientX) +
        (this.startPrint.y - e.clientY) * (this.startPrint.y - e.clientY)
    );
    if (d > 7) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  _move(e) {
    if (this.isDrag) {
      let left = this.startPrint.x - e.clientX;
      e.currentTarget.scrollLeft = this.startLeft + left;
    }
  }
  render() {
    return (
      <ListBox
        {...this.props}
      >
        {this.props.children}
      </ListBox>
    );
  }
}
export default RowListBox;
