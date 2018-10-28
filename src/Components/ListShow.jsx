import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

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
  render() {
    const { list, comp } = this.props;
    return (
      <ListBox>
        {list.map((item, key) => {
          return <li key={key}>{comp({ data: item })}</li>;
        })}
      </ListBox>
    );
  }
}
export default ListShow;
