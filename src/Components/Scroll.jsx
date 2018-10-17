import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ScrollBox = styled.div`
  height: 100%;
  overflow: auto;
`;
//组件滚动条位置及恢复
class Scroll extends Component{
  constructor(props){
    super(props)
    this.isSpace=false;
    this.scrollEventFun=this.scrollEvent.bind(this);
    this.pHeight=0;
  }
  componentWillUnmount(){
    this.target.removeEventListener('scroll',this.scrollEventFun)
  }
  componentDidMount() {
    this.target=ReactDOM.findDOMNode(this);
    let {top,bottom,left,right,onTop,onBottom}=this.props;

    const target=this.target;
    this.pHeight=target.scrollHeight;
    if(bottom){
      target.scrollTo(0,target.scrollHeight)
    }else if(top){
      target.scrollTo(0,0)
    }
    if(onTop){
      target.addEventListener('scroll',this.scrollEventFun)
    }
  }
  componentDidUpdate(){
    let {top,bottom}=this.props;
    const target=this.target;
    if(this.pHeight!=target.scrollHeight){//高度改变时
      if(bottom){
        target.scrollTo(0,target.scrollHeight)
      }else if(top){
        target.scrollTo(0,0)
      }
    }
  }
  scrollEvent(e){
    let {space=10,onTop}=this.props;
    const target=this.target;

    let cTop=target.scrollTop;
    //底部
    //console.log()
    if(target.scrollHeight-(cTop+target.clientHeight)<space){
      if(!this.isSpace){
        this.isSpace=true;
        //console.log('底部')
      }
    }else if(cTop<space){
      if(!this.isSpace){
        this.isSpace=true;
        if(onTop){
          onTop(target,cTop);
        }
        //console.log('头部')
      }
    }else{
      this.isSpace=false;
    }
  }

  render(){
    return <ScrollBox>{this.props.children}</ScrollBox> 
  }
}

export default Scroll