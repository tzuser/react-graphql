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

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
//import { jssPreset } from 'material-ui/styles';
import preset from 'jss-preset-default';
import { create } from 'jss';

//import { MuiThemeProvider} from 'material-ui/styles';
//import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

import theme from '../src/public/Theme';
import 'isomorphic-fetch'

//Apollo
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
const client = new ApolloClient({
  link: new HttpLink({uri:'http://localhost:8080/graphql'}),
  cache: new InMemoryCache(),
});

//import initialRequestConfig from '../build/router-config.json';
//import initalActions from 'react-ssr-request/server';

const prepHTML=(data,{html,head,style,body,script,css,state})=>{
	data=data.replace('<html',`<html ${html}`);
	data=data.replace('</head>',`${head}${style}</head>`);
	data=data.replace('<body>',`<body><script>window._INIT_STATE_ = ${JSON.stringify(state)}</script>`);
	data=data.replace('<div id="root"></div>',`<div id="root">${body}</div><style id="jss-server-side">${css}</style>`);
	data=data.replace('</body>',`${script}</body>`);
	return data;
}



const render=async (ctx,next)=>{
		const filePath=path.resolve(__dirname,'../build/index.html')
		//material处理
		const sheetsRegistry = new SheetsRegistry();
		const jss = create(preset());
		//jss.options.createGenerateClassName = createGenerateClassName;

		let htmlData=fs.readFileSync(filePath,'utf8');

		const { store, history } = getCreateStore(reducers,ctx.req.url);

		//初始请求数据
		//await initalActions(store,ctx.req.url,initialRequestConfig)
		let state=store.getState();

		let modules=[];
		let routeMarkup =renderToString(
			<Loadable.Capture report={moduleName => modules.push(moduleName)}>
			<ApolloProvider client={client}>
				<Provider store={store}>
					<ConnectedRouter history={history}>
						<JssProvider registry={sheetsRegistry} jss={jss}>
							<App/>
						</JssProvider>
					</ConnectedRouter>
				</Provider>
			</ApolloProvider>
			</Loadable.Capture>
			)
		const css = sheetsRegistry.toString()
		let bundles = getBundles(stats, modules);

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
			css:css,
			state,
		})
		ctx.body=html
}

export default render;