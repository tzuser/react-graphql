import React, { Component } from 'react';
import { Spinner, Box } from 'gestalt';

class PageLoading extends Component {
  render() {
    return (
      <Box
        direction="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flex="grow"
        height="100%"
      >
        <Box>
          <Spinner show={true} accessibilityLabel="Example spinner" />
        </Box>
      </Box>
    );
  }
}
export default PageLoading;
