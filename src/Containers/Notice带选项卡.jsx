import React,{Component} from 'react';
import HeaderContainer from '../Components/HeaderContainer';
import {Box,SegmentedControl} from 'gestalt';
import PageLoading from '../Components/PageLoading';
class Notice extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      itemIndex: 0,
      items: ['通知', '收件箱']
    };
    this.handleItemChange = this.handleItemChange.bind(this);
  }

  handleItemChange({ activeIndex }) {
    this.setState(prevState => ({ itemIndex: activeIndex }));
  };
  render(){
    return <div>
    <HeaderContainer>
      <Box flex="grow">
        <SegmentedControl
                items={this.state.items}
                selectedItemIndex={this.state.itemIndex}
                onChange={this.handleItemChange}
              />
      </Box>
    </HeaderContainer>
    <PageLoading />
    </div>
  }
}


export default Notice;