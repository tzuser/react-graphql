import React from 'react'
import Loadable from 'react-loadable';
import { renderToString } from 'react-dom/server';
import App from '../src/Containers/App.jsx';
import {ConnectedRouter,routerMiddleware} from 'react-router-redux';
import { StaticRouter } from 'react-router-dom'
import reducers from '../src/reducers/index';
import {getCreateStore} from '../src/store'
import {Provider} from 'react-redux';
import path from 'path';
import fs from 'fs';
import Helmet from 'react-helmet';
import { getBundles } from 'react-loadable/webpack'
import stats from '../build/react-loadable.json';

import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import theme from '../src/public/Theme';
import 'isomorphic-fetch'

//Apollo
import { ApolloProvider,getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

//import initialRequestConfig from '../build/router-config.json';
//import initalActions from 'react-ssr-request/server';

const prepHTML=(data,{html,head,style,body,script,styleTags,state})=>{
	data=data.replace('<html',`<html ${html}`);
	data=data.replace('</head>',`${head}${style}</head>`);
	data=data.replace('<body>',`<body><script>window._INIT_STATE_ = ${JSON.stringify(state)}</script>`);
	data=data.replace('<div id="root"></div>',`<div id="root">${body}</div>${styleTags}`);
	data=data.replace('</body>',`${script}</body>`);
	return data;
}



const render=async (ctx,next)=>{

		const client = new ApolloClient({
			ssrMode: true,
		  link: new HttpLink({uri:'http://localhost:8181/graphql'}),
		  cache: new InMemoryCache(),
		});

		const filePath=path.resolve(__dirname,'../build/index.html')
	
		let htmlData=fs.readFileSync(filePath,'utf8');

		const { store, history } = getCreateStore(reducers,ctx.req.url);

		const sheet = new ServerStyleSheet()

		

		//初始请求数据
		//await initalActions(store,ctx.req.url,initialRequestConfig)
		let state=initialState;//store.getState();

		let modules=[];
		const AppRender=(
			<Loadable.Capture report={moduleName => modules.push(moduleName)}>
				<StyleSheetManager sheet={sheet.instance}>
					<ApolloProvider client={client}>
						<Provider store={store}>
							<ConnectedRouter history={history}>
								<App/>
							</ConnectedRouter>
						</Provider>
					</ApolloProvider>
				</StyleSheetManager>
			</Loadable.Capture>
		)
		await getDataFromTree(AppRender);
		let routeMarkup =renderToString(AppRender);
		const initialState = client.extract();

		let bundles = getBundles(stats, modules);
		const styleTags = sheet.getStyleTags();
		let styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
		let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

		let styleStr=styles.map(style => {
			        	return `<link href="/dist/${style.file}" rel="stylesheet"/>`
			      	}).join('\n')

		let scriptStr=scripts.map(bundle => {
			        	return `<script src="/${bundle.file}"></script>`
			      	}).join('\n')

		const helmet=Helmet.renderStatic();
		const html=prepHTML(htmlData,{
			html:helmet.htmlAttributes.toString(),
			head:helmet.title.toString()+helmet.meta.toString()+helmet.link.toString(),
			style:styleStr,
			body:routeMarkup,
			script:scriptStr,
			styleTags,
			state,
		})
		ctx.body=html
}

export default render;