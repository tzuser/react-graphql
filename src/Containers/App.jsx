import React, { PureComponent } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import InitSelf from 'com_/InitSelf';
/*import styled, { ThemeProvider } from "styled-components";*/

const Root = Loadable({
  loader: () => import("con_/Root.jsx"),
  loading: () => <div>加载中...</div>
});
@withRouter
class App extends PureComponent {
  render() {
    return (
      <React.Fragment>
          <InitSelf />
          <Root />
      </React.Fragment>
    );
  }
}
export default App;
