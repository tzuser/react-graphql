import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {Box,Text} from 'gestalt'

const ListBox = styled.ul`
  list-style: none;
  column-gap: 10px;
  column-count: 5;
  padding: 0;
  margin: 0;
  li {
    break-inside: avoid;
  }
  @media (min-width: 992px) and (max-width: 1300px) {
    & {
      column-count: 4;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    & {
      column-count: 2;
    }
  }
  @media (max-width: 767px) {
    & {
      column-count: 1;
    }
  }
`;

class ListShow extends Component {
  constructor(props) {
    super(props);
    this.scrollContainer = props.scrollContainer();
    this.onScroll = this._onScroll.bind(this);
  }
  _onScroll(e) {
    let target = e.target.documentElement;
    let cTop = target.scrollTop;
    let space = 100;
    if (target.scrollHeight - (cTop + target.clientHeight) < space) {
      if (!this.isSpace) {
        this.isSpace = true;
        console.log('底部');
        let pms = this.props.loadItems();
        console.log(pms);
        pms.then(res => {
          this.isSpace = false;
        });
      }
    }
  }
  componentDidMount() {
    this.scrollContainer.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    this.scrollContainer.removeEventListener('scroll', this.onScroll);
  }
  getItem(page) {
    const { list, comp, pageNum = 20 } = this.props;
    let doms = [];
    for (let i = pageNum; i > 0; i--) {
      let key = pageNum * (page + 1) - i;
      console.log(key);
      if(!list[key])break;
      doms.push(<li key={key}>{comp({ data: list[key] })}</li>);
    }
    return doms;
  }
  getPage() {
    const { list, pageNum = 20 } = this.props;
    const pageLen = Math.ceil(list.length / pageNum);
    let index = 0;
    let doms = [];
    for (let page = 0; page < pageLen; page++) {
      doms.push(
        <React.Fragment key={page}>
          <ListBox >{this.getItem(page, pageNum)}</ListBox>
          <Box paddingY={4} marginBottom={12}><Text align="center" color="gray">第{page}页</Text></Box>
        </React.Fragment>
      );
    }
    return doms;
  }
  render() {
    const { list, comp, pageNum = 20 } = this.props;

    return <React.Fragment>{this.getPage()}</React.Fragment>;
  }
}
export default ListShow;

/* <ListBox>
          {list.map((item, key) => {
            return <li key={key}>{comp({ data: item })}</li>;
          })}
        </ListBox>*/
