import server from './graphql/main.js';
import Loadable from 'react-loadable';
import Router from 'koa-router';
import path from 'path';
import staticServer from 'koa-static';
import staticCache from 'koa-static-cache';
import Koa from 'koa';
import render from './render.js';
import { setUser } from './graphql/user.js';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import gzip from 'koa-compress';
//解决视频播放
import range from 'koa-range';

const app = new Koa();
app.keys = ['abcdefg123']; //签名
app.use(gzip());
app.use(bodyParser()); //解析Json或者form
app.use(range);
app.use(cors({ credentials: true })); //跨域
app.use(setUser); //设置用户
//接口
//app.use(graphql.routes()).use(graphql.allowedMethods());

server.applyMiddleware({ app });

const router = new Router();
router.get('/', render);
app.use(router.routes()).use(router.allowedMethods());
app.use(staticServer(path.resolve(__dirname, '../files'), { maxAge: 365 * 24 * 60 * 60 }));
app.use(staticCache(path.resolve(__dirname, '../build'), { maxAge: 365 * 24 * 60 * 60 }));
app.use(render);

//获取局域网ip 方便手机测试
function getIPAdress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

Loadable.preloadAll().then(() => {
  app.listen(8181, () => {
    console.log(`http://${getIPAdress()}:8181`);
    console.log('服务启动');
  });
});
