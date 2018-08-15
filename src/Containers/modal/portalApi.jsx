//不能使用redux
import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';
const Containers=styled.div`
  position:relative;
  z-index:10;
`
const portalApi = function(WarppedComponent,props){
  if(typeof window !="object")return null;
  const doc = document;
  let node = doc.createElement('div');
  doc.body.appendChild(node);

  class Portal extends React.Component {
    state={show:true}
    render() {
      return <Containers>
          {this.state.show && <WarppedComponent {...props} onClose={async ()=>{
            //写着好玩 只是一个想法
            if(props.onClose){
              if(props.onClose instanceof Promise){
                await props.onClose();
              }else{
                props.onClose();
              }
            }
            this.setState({show:false},()=>{
              document.body.removeChild(node);
            })
          }}/>}
        </Containers>
    }
  }

  ReactDOM.render(<Portal/>,node)
}
export default portalApi

