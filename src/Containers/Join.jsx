import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Label, Tooltip, Box, Spinner, Text, Button, Icon, TextField, RadioButton } from 'gestalt';
import HeaderContainer from '../Components/HeaderContainer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import hiddenFooter from '../Components/HiddenFooter';
import selfQuery from 'gql_/self.gql';

class Join extends Component {
  state = {
    nick_name: '',
    name: '',
    password: '',
    verify_password: '',
    name_message: '',
    password_message: '',
    nick_name_message: '',
  };
  render() {
    let {
      mutate,
      history: { goBack, replace },
    } = this.props;

    return (
      <Box paddingX={4} paddingY={10}>
        <form
          onSubmit={e => {
            this.setState({
              name_message: '',
              password_message: '',
              nick_name_message: '',
            });
            let { name, nick_name, verify_password, password } = this.state;
            e.preventDefault();
            mutate({
              variables: {
                nick_name,
                name,
                password,
                verify_password,
              },
              refetchQueries: [
                {
                  query: selfQuery,
                },
              ],
            })
              .then(data => {
                replace('/login/');
              })
              .catch(err => {
                let errCode = {
                  1003: 'name_message',
                  1002: 'nick_name_message',
                  1004: 'password_message',
                };
                let { status, message } = err.graphQLErrors[0];
                this.setState({
                  [errCode[status]]: message,
                });
              });
          }}
        >
          <Box paddingY={2}>
            <Label htmlFor="nick_name">
              <Text>昵称</Text>
            </Label>
            <TextField
              id="nick_name"
              onChange={({ value }) => this.setState({ nick_name: value })}
              type="text"
              value={this.state.nick_name}
              errorMessage={this.state.nick_name_message}
              placeholder="请输入昵称"
            />
          </Box>

          <Box paddingY={2}>
            <Label htmlFor="name">
              <Text>账号</Text>
            </Label>
            <TextField
              id="name"
              onChange={({ value }) => this.setState({ name: value })}
              type="text"
              value={this.state.name}
              errorMessage={this.state.name_message}
              placeholder="请输入账号"
            />
          </Box>
          <Box paddingY={2}>
            <Label htmlFor="password">
              <Text>密码</Text>
            </Label>
            <TextField
              id="password"
              onChange={({ value }) => this.setState({ password: value })}
              type="password"
              value={this.state.password}
              errorMessage={this.state.password_message}
              placeholder="请输入密码"
            />
          </Box>
          <Box paddingY={2}>
            <Label htmlFor="verify_password">
              <Text>确认密码</Text>
            </Label>
            <TextField
              id="verify_password"
              onChange={({ value }) => this.setState({ verify_password: value })}
              type="password"
              value={this.state.verify_password}
              placeholder="再次请输入密码"
            />
          </Box>
          <Box paddingY={2}>
            <Button text="注册" type="submit" color="red" />
          </Box>
          <Box paddingY={2}>
            <Link replace to="/login/">
              <Text align="center">已有账号？</Text>
            </Link>
          </Box>
        </form>
      </Box>
    );
  }
}

export default graphql(gql`
  mutation join(
    $nick_name: String!
    $name: String!
    $password: String!
    $verify_password: String!
  ) {
    join(
      input: {
        nick_name: $nick_name
        name: $name
        password: $password
        verify_password: $verify_password
      }
    ) {
      name
    }
  }
`)(hiddenFooter(Join));
