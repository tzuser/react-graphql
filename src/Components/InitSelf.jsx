import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import selfQuery from 'gql_/self.gql';

const initSelf = WrapperComponent => {
  return class InitSelf extends PureComponent {
    render() {
      let props=this.props
      return (
        <Query query={selfQuery}>
          {({ loading, error, data }) => {
            if (error) {
              console.log('未登录或token过期');
            }
            if (loading || !data) {
              console.log('获取用户资料中..');
            }
            return <WrapperComponent {...props} selfUser={data?data.self:null} />;
          }}
        </Query>
      );
    }
  };
};

export default initSelf;
