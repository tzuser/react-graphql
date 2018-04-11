const Loadable=require('react-loadable');
const Router = require('koa-router');
const path= require('path')
const staticServer =require('koa-static')
const staticCache = require('koa-static-cache')
const Koa = require('koa')
const render = require('./render.js')
const graphql = require('./graphql/main.js')
const {setUser} = require('./graphql/user.js')
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const app = new Koa()
app.keys=['wysj3910'];//签名

app.use(bodyParser());//解析Json或者form
app.use(cors({credentials:true}));//跨域
app.use(setUser);//设置用户
//接口
app.use(graphql.routes()).use(graphql.allowedMethods());

const router = new Router();
router.get('/', render);
app.use(router.routes()).use(router.allowedMethods());
app.use(staticServer(path.resolve(__dirname, '../files')));
app.use(staticCache(path.resolve(__dirname, '../build'), {maxAge: 365 * 24 * 60 * 60}));
app.use(render);


Loadable.preloadAll().then(() => {
  app.listen(8181, () => {
    console.log('服务启动');
  });
});
