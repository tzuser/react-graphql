import React from 'react';
import {Route,Redirect,withRouter,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import PageLoading from '../Components/PageLoading';
import Footer from '../Components/Footer';
import PropTypes from 'prop-types';
import 'gestalt/dist/gestalt.css';

const LoadablePost = Loadable({
  loader: () => import(/* webpackChunkName: 'Post' */ './Post'),
  loading:PageLoading
});

const LoadableComments = Loadable({
  loader: () => import(/* webpackChunkName: 'Comments' */ './Comments'),
  loading:PageLoading
});
const LoadableLogin = Loadable({
  loader: () => import(/* webpackChunkName: 'Login' */ './Login'),
  loading:PageLoading
});
const LoadableJoin = Loadable({
  loader: () => import(/* webpackChunkName: 'Join' */ './Join'),
  loading:PageLoading
});

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ './Home'),
  loading:PageLoading
});
const LoadableFind = Loadable({
  loader: () => import(/* webpackChunkName: 'Find' */ './Find'),
  loading:PageLoading
});
const LoadableNotice = Loadable({
  loader: () => import(/* webpackChunkName: 'Notice' */ './Notice'),
  loading:PageLoading
});
const LoadableUser = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ './User'),
  loading:PageLoading
});

const LoadableCreate = Loadable({
  loader: () => import(/* webpackChunkName: 'Create' */ './Create'),
  loading:PageLoading
});


class App extends React.Component{
  state={footer:true}
  getChildContext() {
     return {
      isFooter:(show)=>{this.setState({footer:show})},//隐藏或显示底部
    };
  }
	render(){
		return(
			<div>
        <Switch>
          <Route exact path="/" component={LoadableHome}/>
          <Route path='/login' component={LoadableLogin} />
          <Route path='/join' component={LoadableJoin} />
          <Route path="/find" component={LoadableFind}/>
          <Route path="/notice" component={LoadableNotice}/>
          <Route path='/create' component={LoadableCreate} />
          <Route path='/post/:id' component={LoadablePost} />
          <Route path='/comments/:id' component={LoadableComments} />
          <Route path='/:name' component={LoadableUser} />
        </Switch>
        <Footer show={this.state.footer}/>
			</div>
			)
	}
};
App.childContextTypes = {
  isFooter: PropTypes.func
};

export default withRouter(App);