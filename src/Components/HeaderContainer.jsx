import React, { Component } from 'react';
import { Box, Icon, SearchField, IconButton, Button, Text } from 'gestalt';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'com_/Footer';

const HeaderBox = styled.div`
  background-color: ${p => p.backgroundColor};
  top: 0;
  right: 0;
  left: 0;
  position: ${p => (p.isFixed ? 'fixed' : 'none')};
  padding: 12px 16px;
  height: 64px;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  display: flex;
`;
const Space = styled.div`
  position: relative;
  z-index: 1;
  height: ${p => (p.isSpace ? 64 : 0)}px;
`;

const mapStateToProps = state => ({
  isPc: state.config.isPc,
  showFooter: state.config.showFooter,
});

@withRouter
@connect(mapStateToProps)
class Header extends Component {
  state = { value: '' };
  render() {
    let {
      location: { pathname },
      match,
      showFooter,
      children,
      transparent,
      isSpace = true,
      isBackground = true,
      showMenu = true,
      isFixed=true,
    } = this.props;
    let { isPc } = this.props;
    let backgroundColor = isBackground
      ? `rgba(255, 255, 255, ${transparent ? 0.9 : 1})`
      : 'none';
    showMenu = isPc && showFooter && showMenu;
    return (
      <Space isSpace={isSpace}>
        <HeaderBox isPc={isPc} isFixed={isFixed} backgroundColor={backgroundColor}>
          {showMenu && (
            <div style={{ textAlign: 'center' }}>
              <Box
                width={200}
                marginRight={5}
                color="lightGray"
                shape="rounded"
                overflow="hidden"
              >
                <Tabs />
              </Box>
            </div>
          )}
          {children}
        </HeaderBox>
      </Space>
    );
  }
}

export default Header;
