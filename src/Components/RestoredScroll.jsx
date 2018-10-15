import React,{Component} from 'react';
import ReactDOM from 'react-dom';

//记录子组件滚动条位置及恢复
class RestoredScroll extends Component{
  componentDidMount() {
    if(typeof window!=="object")return;
    let positons=window[this.props.id];
    if(positons){
      let obj=ReactDOM.findDOMNode(this);// this.refs.box.firstChild;
      obj.scrollTop=positons[0];
      obj.scrollLeft=positons[1];
    }
  }
  componentWillUnmount() {
    if(typeof window!=="object")return;
    let obj=ReactDOM.findDOMNode(this);
    window[this.props.id]=[obj.scrollTop,obj.scrollLeft];
  }
  render(){
    return this.props.children
  }
}

export default RestoredScroll