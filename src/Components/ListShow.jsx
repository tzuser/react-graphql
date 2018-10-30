import React, { Component } from 'react';
import styled from 'styled-components';
import { Box, Text } from 'gestalt';
import LazyPage from 'com_/LazyPage';
import {filteringJitter2} from '_tools';

const fj=filteringJitter2()
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
      column-count: ${p => p.minCols};
    }
  }
`;

class ListShow extends Component {
  state={scrollY:0,showHeight:0}
  constructor(props) {
    super(props);
    this.onScroll = this._onScroll.bind(this);
  }
  _onScroll(e) {
    let target = e.target.documentElement;
    let cTop = target.scrollTop;
    let space = 100;
    fj().then(res=>{
      this.setState({scrollY:target.scrollTop,showHeight:target.clientHeight});
    }).catch(err=>{})

    if (target.scrollHeight - (cTop + target.clientHeight) < space) {
      if (!this.isSpace) {
        this.isSpace = true;
        console.log('底部');
        let pms = this.props.loadItems();
        pms.then(res => {
          this.isSpace = false;
        });
      }
    }
  }
  componentDidMount() {
    this.scrollContainer = this.props.scrollContainer();
    if (this.scrollContainer) this.scrollContainer.addEventListener('scroll', this.onScroll);
    let target=this.scrollContainer.document.body;
    this.setState({scrollY:target.scrollTop,showHeight:target.clientHeight});
  }
  componentWillUnmount() {
    if (this.scrollContainer) this.scrollContainer.removeEventListener('scroll', this.onScroll);
  }

  getPage() {
    const { items, pageNum = 20, minCols = 1, comp,name } = this.props;
    const { scrollY,showHeight } = this.state;
    const pageLen = Math.ceil(items.length / pageNum);
    let index = 0;
    let doms = [];
    for (let page = 0; page < pageLen; page++) {
      let pageItems = items.slice(page * pageNum, (page + 1) * pageNum);
      doms.push(
        <ListPage
          key={page}
          items={pageItems}
          page={page}
          pageNum={pageNum}
          comp={comp}
          minCols={minCols}
          name={name}
          scrollY={scrollY}
          showHeight={showHeight}
        />
      );
    }

    return doms;
  }
  render() {
    return <React.Fragment>{this.getPage()}</React.Fragment>;
  }
}

class ListPage extends Component {


  getItem(items, comp) {
    return items.map((item, key) => <li key={key}>{comp({ data: item })}</li>);
  }

  render() {
    let { items, page, pageNum, comp, minCols, name,...other} = this.props;

    return (
      <LazyPage trait={`${name}_${page}`} {...other}>
        <ListBox minCols={minCols}>{this.getItem(items, comp)}</ListBox>
        <Box paddingY={4} marginBottom={12}>
          <Text align="center" color="gray">
            第{page}页
          </Text>
        </Box>
      </LazyPage>
    );
  }
}



export default ListShow;