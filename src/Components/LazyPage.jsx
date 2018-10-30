import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PageStore from 'com_/PageStore';
const pageStore = new PageStore();

const PageItem = styled.div`
  ${p =>
    p.isShow ||
    `
    width:${p.w}px;
    height:${p.h}px;
  `};
`;

const initState = { width: null, height: null, top: null, left: null, init: false,isShow:true };
class LazyPage extends Component {
  state = initState;
  constructor(props) {
    super(props);
    let size = pageStore.has(props.trait) && pageStore.get(props.trait);
    if (size) {
      this.state = { ...size, init: true };
    }
  }

  componentDidMount() {
    this.dom = ReactDOM.findDOMNode(this);
    const { trait } = this.props;
    if (!pageStore.has(trait)) {
      pageStore.set(trait, {
        width: this.dom.clientWidth,
        height: this.dom.clientHeight,
        top: this.dom.offsetTop,
        left: this.dom.offsetLeft,
      });
    }
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    let {isPageRender,trait,scrollY,showHeight}=nextProps;
    const size = pageStore.get(trait);
    if (!size) return prevState;
    let isShow = false;
    if(isPageRender){
      let s = { t: scrollY, b: scrollY + showHeight };
      let c = { t: size.top, b: size.top + size.height };
      let space = 300;
      let isT=c.t > s.t-space || c.b > s.t-space;
      let isB=c.t < s.b+space || c.b < s.b+space;
      if (isT && isB ) {
        isShow = true;
      }
    }
    return { ...size, isShow: isShow };
  }
  render() {
    const { trait, children, scrollY, showHeight } = this.props;
    const { width, height, isShow } = this.state;
    return (
      <PageItem w={width} h={height} isShow={isShow}>
        {isShow && children}
      </PageItem>
    );
  }
}

export default LazyPage;
