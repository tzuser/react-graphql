import React,{Component} from 'react';
import PropTypes from 'prop-types';
export default (WrappedComponent)=>{
  class HiddenFooter extends Component{
    componentDidMount(){
      this.context.isFooter(false);
    }
    componentWillUnmount(){
      this.context.isFooter(true);
    }
    render(){
      return <WrappedComponent {...this.props} />
    }
  }
  HiddenFooter.contextTypes={
    isFooter: PropTypes.func
  }
  return HiddenFooter
}
