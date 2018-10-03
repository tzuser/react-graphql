import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Containers = styled.div`
  position: relative;
  z-index: 10;
`;
function portalApi(WarppedComponent, props) {
  if (typeof window !== 'object') return null;
  const doc = document;
  const node = doc.createElement('div');
  const {onClose}=props;
  doc.body.appendChild(node);

  class Portal extends React.Component {
    state = { show: true };

    render() {
      const { show }=this.state;
      return (
        <Containers>
          {show && (
            <WarppedComponent
              {...props}
              onClose={async () => {
                if ( onClose ) {
                  if (onClose instanceof Promise) {
                    await onClose();
                  } else {
                    onClose();
                  }
                }
                this.setState({ show: false }, () => {
                  document.body.removeChild(node);
                });
              }}
            />
          )}
        </Containers>
      );
    }
  }

  ReactDOM.render(<Portal />, node);
}
export default portalApi;
