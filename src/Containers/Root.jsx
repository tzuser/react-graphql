import React from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import PageLoading from '../Components/PageLoading';
import Footer from '../Components/Footer';
import PropTypes from 'prop-types';
import 'gestalt/dist/gestalt.css';
import * as ConfigAct from 'act_/config';
import { bindActionCreators } from 'redux';
import { filteringJitter } from '_tools';
//
//去抖动
const instanceFillteringJitter = filteringJitter();

const LoadablePost = Loadable({
  loader: () => import(/* webpackChunkName: 'Post' */ './Post'),
  loading: PageLoading,
});

const LoadableComments = Loadable({
  loader: () => import(/* webpackChunkName: 'Comments' */ './Comments'),
  loading: PageLoading,
});
const LoadableLogin = Loadable({
  loader: () => import(/* webpackChunkName: 'Login' */ './Login'),
  loading: PageLoading,
});
const LoadableJoin = Loadable({
  loader: () => import(/* webpackChunkName: 'Join' */ './Join'),
  loading: PageLoading,
});

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ './Home'),
  loading: PageLoading,
});
const LoadableFind = Loadable({
  loader: () => import(/* webpackChunkName: 'Find' */ './Find'),
  loading: PageLoading,
});

const LoadableSubscribe = Loadable({
  loader: () => import(/* webpackChunkName: 'Subscribe' */ './Subscribe'),
  loading: PageLoading,
});

const LoadableNotice = Loadable({
  loader: () => import(/* webpackChunkName: 'Notice' */ './Notice'),
  loading: PageLoading,
});
const LoadableUser = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ './User'),
  loading: PageLoading,
});

const LoadableCreate = Loadable({
  loader: () => import(/* webpackChunkName: 'Create' */ './Create'),
  loading: PageLoading,
});

const LoadableSettings = Loadable({
  loader: () => import(/* webpackChunkName: 'Settings' */ './Settings'),
  loading: PageLoading,
});
const LoadableSearch = Loadable({
  loader: () => import(/* webpackChunkName: 'Search' */ './Search'),
  loading: PageLoading,
});
const LoadableSearchResult = Loadable({
  loader: () => import(/* webpackChunkName: 'SearchResult' */ './SearchResult'),
  loading: PageLoading,
});

const LoadableFollowing = Loadable({
  loader: () => import(/* webpackChunkName: 'Following' */ './Following'),
  loading: PageLoading,
});

const LoadableFollowers = Loadable({
  loader: () => import(/* webpackChunkName: 'Followers' */ './Followers'),
  loading: PageLoading,
});

const LoadableUserList = Loadable({
  loader: () => import(/* webpackChunkName: 'UserList' */ './UserList'),
  loading: PageLoading,
});


@withRouter
class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={LoadableHome} />
          <Route path="/login" component={LoadableLogin} />
          <Route path="/join" component={LoadableJoin} />
          <Route path="/find" component={LoadableFind} />
          <Route path="/subscribe" component={LoadableSubscribe} />
          <Route path="/notice" component={LoadableNotice} />
          <Route path="/create" component={LoadableCreate} />
          <Route path="/settings" component={LoadableSettings} />
          <Route path="/user_list" component={LoadableUserList} />
          <Route path="/search/:type/:keyword?" component={LoadableSearchResult} />
          <Route path="/search_keyword/:keyword" component={LoadableSearch} />
          <Route path="/search_keyword" component={LoadableSearch} />
          <Route path="/post/:id" component={LoadablePost} />
          <Route path="/comments/:id" component={LoadableComments} />
          <Route path="/:name/following" component={LoadableFollowing} />
          <Route path="/:name/followers" component={LoadableFollowers} />
          <Route path="/:name" component={LoadableUser} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Root;
