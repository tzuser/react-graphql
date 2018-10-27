import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import selfQuery from 'gql_/self.gql';

const initSelf = WrapperComponent => {
  return class InitSelf extends PureComponent {
    render() {
      return (
        <Query query={selfQuery}>
          {({ loading, error, data }) => {
            if (error) {
              console.log('未登录或token过期');
              return false;
            }
            if (loading || !data) {
              console.log('获取用户资料中..');
              return false;
            }
            return <WrapperComponent {...this.porps} selfUser={data.self} />;
          }}
        </Query>
      );
    }
  };
};

export default initSelf;
