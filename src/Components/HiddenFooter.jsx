import React,{Component} from 'react';
import PropTypes from 'prop-types';
class HiddenFooter extends Component{
  componentDidMount(){
    //console.log(this.context)
    this.context.isFooter(false);
  }
  componentWillUnmount(){
    this.context.isFooter(true);
  }
  render(){
    return false
  }
}
HiddenFooter.contextTypes={
  isFooter: PropTypes.func
}
export default HiddenFooter