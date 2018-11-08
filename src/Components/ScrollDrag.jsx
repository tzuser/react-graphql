import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ScrollDrag extends Component {
  startPrint = { x: 0, y: 0 };
  startLeft = 0;
  startTop = 0;
  isDrag = false;
  constructor(props){
    super(props);
    this.startDrag=this._startDrag.bind(this);
    this.stopDrag=this._stopDrag.bind(this);
    this.move=this._move.bind(this);
    this.click=this._click.bind(this);
   
  }

  componentDidMount(){
    this.dom=ReactDOM.findDOMNode(this);
    this.dom.addEventListener('mousedown',this.startDrag,false)
    window.addEventListener('mouseup',this.stopDrag,true)
    window.addEventListener('mousemove',this.move,false)
    this.dom.addEventListener('click',this.click,true)
  }
  componentWillUnmount(){
    this.dom.removeEventListener('mousedown',this.startDrag,false)
    window.removeEventListener('mouseup',this.stopDrag,true)
    window.removeEventListener('mousemove',this.move,false)
    this.dom.removeEventListener('click',this.click,true)
  }
  _startDrag(e) {
    e.preventDefault();
    this.startPrint = { x: e.clientX, y: e.clientY };
    this.startLeft = e.currentTarget.scrollLeft;
    this.startTop = e.currentTarget.scrollTop;
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
      e.stopPropagation();
    }
  }

  _move(e) {
    if (this.isDrag) {
      let left = this.startPrint.x - e.clientX;
      let top = this.startPrint.y - e.clientY;
      this.dom.scrollLeft = this.startLeft + left;
      this.dom.scrollTop = this.startTop + top;
    }
  }
 
  render() {
    return this.props.children
  }
}
export default ScrollDrag;
