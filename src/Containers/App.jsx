//千山鸟飞绝 万径人踪灭 孤舟蓑笠翁 独钓寒江雪
import React, { PureComponent } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Root = Loadable({
  loader: () => import('con_/Root.jsx'),
  loading: () => <div>加载中...</div>,
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
