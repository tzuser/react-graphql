import React from 'react';
//import 'babel-polyfill';
import ReactDOM from 'react-dom';
//import {RemoveServerSideCss} from './Module/MaterialUIServiceRendering';
import Loadable from 'react-loadable';
import App from './Containers/App';
import { Provider } from 'react-redux';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { getCreateStore } from './store';
import { Router } from 'react-router-dom';

import reducers from './reducers/index';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BatchHttpLink } from 'apollo-link-batch-http';
import host from 'public_/host.js';
let { DB_URL } = host;

const link = new BatchHttpLink({
	uri: DB_URL,
	credentials: 'include',
	batchInterval: 10,
	batchMax:60,
});
const client = new ApolloClient({
	link,
	cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

let { store, history } = getCreateStore(reducers); //获取store

let persistor = persistStore(store);

if (process.env.NODE_ENV == 'development') {
	//热加载配置
	if (module.hot) {
		module.hot.accept('./reducers/index.js', () => {
			import('./reducers/index.js').then(({ default: nextRootReducer }) => {
				store.replaceReducer(nextRootReducer);
			});
		});

		module.hot.accept('./Containers/App.jsx', () => {
			import('./Containers/App.jsx').then(({ default: AppCom }) => {
				render(AppCom);
			});
		});
	}
}
//是否是服务器渲染
const renderDOM = process.env.NODE_ENV == 'production' ? ReactDOM.hydrate : ReactDOM.render;
const render = (AppCom = App) => {
	renderDOM(
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ApolloProvider client={client}>
					<Router history={history}>
						<AppCom />
					</Router>
				</ApolloProvider>
			</PersistGate>
		</Provider>,
		document.getElementById('root')
	);
};
//为了确保loadable加载完成
window.main = () => {
	Loadable.preloadReady().then(() => {
		render();
	});
};
