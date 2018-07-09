import React from 'react';
import {Tabs,Text} from 'gestalt';
import {Link,withRouter} from 'react-router-dom';
import classnames from 'classnames';
//import styles from 'gestalt/src/Tabs/Tabs.css';

class TabsCom extends Tabs{
  handleTabClick=(i, e)=>{
      const {tabs,onChange,history:{replace} } = this.props;
      e.preventDefault();
      onChange({ activeTabIndex: i, event: e });
      replace(tabs[i].href)
  };
}
export default withRouter(TabsCom)