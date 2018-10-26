import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import selfQuery from 'gql_/self.gql';
import * as configActs from '../actions/config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
 
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelfAct: configActs.setSelf,
    },
    dispatch
  );

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class InitSelf extends PureComponent {
  render() {
    const { setSelfAct } = this.props;
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
          
          if(data.self){
            console.log(data.self)
            setSelfAct({ user: data.self });
          }
          return false;
        }}
      </Query>
    );
  }
}
export default InitSelf;
