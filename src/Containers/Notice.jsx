import React, { Component } from 'react';
//import PageLoading from '../Components/PageLoading';
import HeaderContainer from 'com_/HeaderContainer';
import { Box, Text } from 'gestalt';
import { withTheme } from 'styled-components';
@withTheme
class Notice extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <Box padding={4}>
          <Text color="gray" align="center">
            空空如也~
          </Text>
        </Box>
      </div>
    );
  }
}

export default Notice;
