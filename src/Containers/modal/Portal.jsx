import React from 'react';
import {createPortal} from 'react-dom';

class Portal extends React.Component {
  constructor() {
    super(...arguments);
    const doc = document;
    this.node = doc.createElement('div');
    doc.body.appendChild(this.node);
  }

  render() {
    return createPortal(
      <div className="Portal">
        {this.props.children}
      </div>, //塞进传送门的JSX
      this.node //传送门的另一端DOM node
    );
  }

  componentWillUnmount() {
    document.body.removeChild(this.node);
  }
}
export default Portal