import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Label,
  Tooltip,
  Box,
  Spinner,
  Text,
  Button,
  Icon,
  TextField,
} from 'gestalt';
import { Link } from 'react-router-dom';
import HeaderContainer from '../Components/HeaderContainer';
import styled from 'styled-components';
import Scroll from '../Components/Scroll';
import * as configActs from '../actions/config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import hiddenFooter from '../Components/HiddenFooter';
import T from 'com_/T';
class Login extends Component {
  state = {
    name: '',
    password: '',
    errorOpen: false,
    message: '',
  };
  handleDismiss() {
    this.setState(() => ({ errorOpen: false }));
  }
  render() {
    let {
      mutate,
      history: { goBack, push },
      setSelfAct,
    } = this.props;
    return (
      <Box paddingX={4} paddingY={10}>
        <form
          onSubmit={e => {
            e.preventDefault();
            mutate({
              variables: {
                name: this.state.name,
                password: this.state.password,
              },
            })
              .then(({ data: { login: { token, user } } }) => {
                setSelfAct({ token, user });
                goBack();
              })
              .catch(err => {
                console.log(err);
                this.setState({
                  message: err.graphQLErrors[0].message,
                  errorOpen: true,
                });
              });
          }}
        >
          <Box paddingY={2}>
            <Label htmlFor="name">
              <Text>
                <T n="account" />
              </Text>
            </Label>
            <T n="enterAccount">
              {text => (
                <TextField
                  id="name"
                  onChange={({ value }) => this.setState({ name: value })}
                  type="text"
                  value={this.state.name}
                  placeholder={text}
                />
              )}
            </T>
          </Box>
          <Box paddingY={2}>
            <Label htmlFor="password">
              <Text>
                <T n="password" />
              </Text>
            </Label>
            <T n="enterPassword">
              {text => (
                <TextField
                  id="password"
                  onChange={({ value }) => this.setState({ password: value })}
                  type="password"
                  value={this.state.password}
                  errorMessage={this.state.message}
                  placeholder={text}
                />
              )}
            </T>
          </Box>
          <Box paddingY={2}>
            <T n="signIn">
              {text => (
                <Button
                  accessibilityExpanded={!!this.state.errorOpen}
                  accessibilityHaspopup
                  text={text}
                  type="submit"
                  color="red"
                />
              )}
            </T>
          </Box>
          <Box paddingY={2}>
            <Link replace to="/join/">
              <Text align="center">
                <T n="noAccount" />
              </Text>
            </Link>
          </Box>
        </form>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  selfUser: state.config.selfUser,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelfAct: configActs.setSelf,
    },
    dispatch
  );

export default graphql(gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      user {
        ...userField
      }
      token
    }
  }
  fragment userField on User {
    id
    name
    avatar
    nick_name
    roles
  }
`)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hiddenFooter(Login))
);
