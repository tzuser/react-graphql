import React from 'react';
import Loadable from 'react-loadable';
import { renderToString } from 'react-dom/server';
import App from '../src/Containers/App.jsx';
import { Router } from 'react-router-dom';

import reducers from '../src/reducers/index';
import { getCreateStore } from '../src/store';
import { Provider } from 'react-redux';
import path from 'path';
import fs from 'fs';
import Helmet from 'react-helmet';
import { getBundles } from 'react-loadable/webpack';
import stats from '../build/react-loadable.json';

import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import 'isomorphic-fetch';

//Apollo
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import schema from './graphql/schema';

const prepHTML = (data, { html, head, style, body, script, styleTags, state, apollo_state }) => {
	data = data.replace('<html', `<html ${html}`);
	data = data.replace('</head>', `${head}${style}</head>`);
	data = data.replace(
		'<body>',
		`<body><script>
		window._INIT_STATE_ = ${JSON.stringify(state)};
		window.__APOLLO_STATE__ = ${JSON.stringify(apollo_state).replace(/</g, '\\u003c')};
		</script>`
	);
	data = data.replace('<div id="root"></div>', `<div id="root">${body}</div>${styleTags}`);
	data = data.replace('</body>', `${script}</body>`);
	return data;
};

const render = async (ctx, next) => {
	const client = new ApolloClient({
		ssrMode: true,
		/*link: new HttpLink({
			uri: 'http://localhost:8181/graphql',
			credentials: 'include',
			headers: {
				cookie: ctx.headers['cookie'],
			},
		}),*/
		link: new SchemaLink({ schema }),
		cache: new InMemoryCache(),
	});

	const filePath = path.resolve(__dirname, '../build/index.html');

	let htmlData = fs.readFileSync(filePath, 'utf8');

	const { store, history } = getCreateStore(reducers, ctx.req.url);

	const sheet = new ServerStyleSheet();

	//初始请求数据
	//await initalActions(store,ctx.req.url,initialRequestConfig)
	/*<StyleSheetManager sheet={sheet.instance}>*/
	/*</StyleSheetManager>*/
	let modules = [];
	const AppRender = (
		<ApolloProvider client={client}>
			<Loadable.Capture report={moduleName => modules.push(moduleName)}>
				<Provider store={store}>
					<Router history={history}>
							<App />
					</Router>
				</Provider>
			</Loadable.Capture>
		</ApolloProvider>
	);

	await getDataFromTree(AppRender);
	let routeMarkup = renderToString(AppRender);
	const apollo_state = client.extract();
	const initialState = store.getState();
	//console.log(store.getState())
	//let state=initialState;//store.getState();

	let bundles = getBundles(stats, modules);

	const styleTags = sheet.getStyleTags();
	let styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
	let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

	// link 样式转内联样式
	let styleTagStr = '';
	styles
		.map(style => {
			styleTagStr += fs.readFileSync(path.join(__dirname, '../build', `/${style.file}`), 'utf8');
		})
		.join('\n');
	styleTagStr = `<style id="jss-server-side" type="text/css">${styleTagStr}</style>`;

	let scriptTagStr = scripts
		.map(bundle => {
			return `<script src="/${bundle.file}"></script>`;
		})
		.join('\n');

	const helmet = Helmet.renderStatic();
	const html = prepHTML(htmlData, {
		html: helmet.htmlAttributes.toString(),
		head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
		style: styleTagStr,
		body: routeMarkup,
		script: scriptTagStr,
		styleTags,
		state: initialState,
		apollo_state,
	});
	ctx.body = html;
};

export default render;
