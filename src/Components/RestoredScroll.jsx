import React,{Component} from 'react';
//记录子组件滚动条位置及恢复
class RestoredScroll extends Component{
  componentDidMount() {

    let positons=window[this.props.id];
    console.log('渲染完成',positons)
    if(positons){
      //let obj=this.refs.box.firstChild;
     // window.scrollTop=positons[0];
     // window.scrollLeft=positons[1];
     setTimeout(()=>{
      window.scrollTo(positons[1],positons[0]);
    },1000)
      
    }
  }
  componentWillUnmount() {
    console.log('将要离开')
    //let obj=this.refs.box.firstChild;
    window[this.props.id]=[document.documentElement.scrollTop,document.documentElement.scrollLeft];
  }
  render(){
    return null
  }
}

export default RestoredScroll