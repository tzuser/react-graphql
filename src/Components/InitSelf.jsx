import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import selfQuery from 'gql_/self.gql';
import { Box } from 'gestalt';
import { withRouter } from 'react-router-dom';
import PageLoading from 'com_/PageLoading';

const initSelf = (required = false) => WrapperComponent => {
  @withRouter
  class InitSelf extends PureComponent {
    render() {
      let props = this.props;
      let {
        history: { push },
      } = props;
      return (
        <Query query={selfQuery}>
          {({ loading, error, data }) => {
            if (required) {
              if (error) {
                push('/login');
                return false;
              }
              if (loading || !data) {
                return <PageLoading />;
              }
              if (!data.self) {
                push('/login');
                return false;
              }
            }
            return <WrapperComponent {...props} selfUser={data ? data.self : null} />;
          }}
        </Query>
      );
    }
  }
  return InitSelf;
};

export default initSelf;
