import React,{Component} from 'react';
import {Tabs,Text} from 'gestalt';
import {Link,withRouter} from 'react-router-dom';
import classnames from 'classnames';
//import styles from 'gestalt/src/Tabs/Tabs.css';

class TabsCom extends Tabs{
  handleTabClick=(i, e)=>{
      e.preventDefault();
      this.props.tabClickCallBack({ activeTabIndex: i, event: e })
      this.props.onChange({ activeTabIndex: i, event: e });
  };
}

@withRouter
class TabsRoot extends Component{
	tabClickCallBack({activeTabIndex,event}){
		const {tabs,onChange,history:{replace,push}} = this.props;
		if(tabs[activeTabIndex].isReplace){//如果是替换
			replace(tabs[activeTabIndex].href)
		}else{
			push(tabs[activeTabIndex].href)
		}
	}
	render(){
		let tabsData=this.props.tabs.map(item=>({href:item.href,text:item.text}))
		console.log(tabsData)
		return <TabsCom {...this.props} tabClickCallBack={this.tabClickCallBack.bind(this)} tabs={tabsData}/>
	}
}

export default TabsRoot