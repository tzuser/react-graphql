import React, { Component } from 'react';
import { Box, Text, Column, Icon } from 'gestalt';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ClassNames from 'classnames';
import initSelf from 'com_/InitSelf';

const Foot = styled.div`
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  height: 54px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
`;
const IconLink = styled(Link)`
  margin: auto;
  display: inline-block;
  outline: 0px;
  transition: transform 0.2s ease-out;
  &.active svg {
    color: #555;
  }
  &.red.active svg {
    color: #bd081c;
  }
  > div {
    padding: 12px;
    :active {
      background-color: rgb(239, 239, 239);
      border-radius: 50%;
    }
  }
`;

class IconColumn extends Component {
  componentWillMount() {
    let {
      location: { pathname },
      to,
      label,
      icon,
      index,
      active,
      onActive,
      selfName,
    } = this.props;
    if (active === null) {
      if (selfName && pathname.startsWith(`/${selfName}`)) {
        //用户处理
        onActive(index);
      } else if (pathname.startsWith(to)) {
        onActive(index);
      }
    }
  }
  render() {
    let { to, label, icon, index, active, onActive, className, replace = true } = this.props;

    return (
      <Column span={3}>
        <IconLink
          replace={replace}
          to={to}
          className={ClassNames(index == 0 && 'red', active == index && 'active')}
          onClick={() => onActive(index)}
        >
          <div>
            <Icon accessibilityLabel={label} icon={icon} size="24" />
          </div>
        </IconLink>
      </Column>
    );
  }
}

@initSelf()
@withRouter
export class Tabs extends Component {
  state = { active: null };
  render() {
    let active = this.state.active;
    let { location, selfUser } = this.props;

    let name = selfUser && selfUser.name;
    return (
      <Box maxWidth="500px" display="flex" width="100%" direction="row">
        <IconColumn
          location={location}
          to="/"
          index={0}
          label="发现"
          icon="compass"
          active={active}
          onActive={index => this.setState({ active: index })}
        />
        <IconColumn
          location={location}
          to="/subscribe"
          index={1}
          label="关注"
          icon="people"
          active={active}
          onActive={index => this.setState({ active: index })}
        />
        <IconColumn
          location={location}
          to="/notice"
          index={2}
          label="消息"
          icon="speech-ellipsis"
          active={active}
          onActive={index => this.setState({ active: index })}
        />
        <IconColumn
          location={location}
          to={name ? `/${name}` : '/login/'}
          replace={!!name}
          selfName={name}
          index={3}
          label="我"
          icon="person"
          active={active}
          onActive={index => this.setState({ active: index })}
        />
      </Box>
    );
  }
}

@connect(state => ({
  showFooter: state.config.showFooter,
}))
class Footer extends Component {
  render() {
    let { showFooter } = this.props;
    if (!showFooter) return false;
    return (
      <Box height={54} display="block" smDisplay="none">
        <Foot>
          <Box
            paddingX={1}
            justifyContent="center"
            alignItems="start"
            display="flex"
            direction="row"
          >
            <Tabs />
          </Box>
        </Foot>
      </Box>
    );
  }
}

export default Footer;
