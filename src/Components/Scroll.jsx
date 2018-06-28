import React,{Component} from 'react';
//组件滚动条位置及恢复
class Scroll extends Component{
  constructor(props){
    super(props)
    this.isSpace=false;
    this.scrollEventFun=this.scrollEvent.bind(this);
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.scrollEventFun)
  }
  componentDidMount() {
    let {top,bottom,left,right,onTop,onBottom}=this.props;
    if(bottom){
      window.scrollTo(0,document.body.scrollHeight)
    }else if(top){
      window.scrollTo(0,0)
    }
    if(onTop){
      window.addEventListener('scroll',this.scrollEventFun)
    }
  }
  scrollEvent(e){
    let {space=10,onTop}=this.props;
    let cTop=document.documentElement.scrollTop+document.body.scrollTop;
    //底部
    //console.log()
    if(document.body.scrollHeight-(cTop+document.body.clientHeight)<space){
      if(!this.isSpace){
        this.isSpace=true;
        //console.log('底部')
      }
    }else if(cTop<space){
      if(!this.isSpace){
        this.isSpace=true;
        if(onTop){
          onTop(cTop);
        }
        //console.log('头部')
      }
    }else{
      this.isSpace=false;
    }
  }
  render(){
    return false
  }
}

export default Scroll