import React,{Component} from 'react';
import PropTypes from 'prop-types';
import * as ConfigAct from 'act_/config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export default (WrappedComponent)=>{
  const mapStateToProps=(state)=>({
    
  })
  const mapDispatchToPorps=(dispatch)=>bindActionCreators({
    showFooterAct:ConfigAct.showFooter
  },dispatch)
  @connect(mapStateToProps,mapDispatchToPorps)
  class HiddenFooter extends Component{
    componentDidMount(){
      this.props.showFooterAct(false)
    }
    componentWillUnmount(){
      this.props.showFooterAct(true)
    }
    render(){
      return <WrappedComponent {...this.props} />
    }
  }
  return HiddenFooter
}
