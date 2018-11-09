//千山鸟飞绝 万径人踪灭 孤舟蓑笠翁 独钓寒江雪
import React, { PureComponent } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import styled from 'styled-components';

const Loading = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    width: 60px;
    height: 60px;

    position: relative;
    margin: 100px auto;
  }

  .double-bounce1,
  .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #222;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: bounce 2s infinite ease-in-out;
    animation: bounce 2s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  @-webkit-keyframes bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;

const Root = Loadable({
  loader: () => import('con_/Root.jsx'),
  loading: () => (
    <Loading>
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    </Loading>
  ),
});
@withRouter
class App extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Root />
      </React.Fragment>
    );
  }
}
export default App;
