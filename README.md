# React+Graphql
* 客户端使用React + ApolloClient + GestaltUI
* 服务端使用Koa2 + GraphQL + Mongoose

### 在线预览
* [在线预览](http://otaku.tangzuo.cc:8181)
* [API](http://otaku.tangzuo.cc:8181/graphql)


![个人](https://github.com/tzuser/react-graphql/blob/master/readmeImages/2.png)
![详情](https://github.com/tzuser/react-graphql/blob/master/readmeImages/3.png)



### 启动
```
cnpm install
npm run start
```

### 默认是连接远程服务器的，以下连接本地的服务
1. 安装mongodb
2. 更改 `server/db.js` 里 `let db=mongoose.connect('mongodb://web:wysj3910@127.0.0.1:27017/web')` 连接地址。
3. 并更改 `src/public.js` 里的 HOST 常量为 `http://localhost:8181`
4. 运行 `npm run server`


### 文件目录
```
├── index.ejs
├── package.json
├── README.md
├── server
│   ├── db.js
│   ├── graphql
│   │   ├── APIError.js
│   │   ├── comment.js
│   │   ├── file.js
│   │   ├── formatError.js
│   │   ├── main.js
│   │   ├── post.js
│   │   ├── public.js
│   │   └── user.js
│   ├── index.js
│   ├── render.js
│   └── server.js
├── src
│   ├── actions
│   │   ├── config.js
│   │   ├── photo.js
│   │   └── public.js
│   ├── Components
│   │   ├── AddPhoto.jsx
│   │   ├── Footer.jsx
│   │   ├── FooterNavLink.jsx
│   │   ├── HeaderContainer.jsx
│   │   ├── Header.jsx
│   │   ├── HiddenFooter.jsx
│   │   ├── IconButton.jsx
│   │   ├── ListButton.jsx
│   │   ├── PageLoading.jsx
│   │   ├── PostList.jsx
│   │   ├── Scroll.jsx
│   │   └── Tabs.jsx
│   ├── constants.js
│   ├── Containers
│   │   ├── App.jsx
│   │   ├── Comments.jsx
│   │   ├── Create.jsx
│   │   ├── Find.jsx
│   │   ├── Home.jsx
│   │   ├── Join.jsx
│   │   ├── Login.jsx
│   │   ├── MoreLikes.jsx
│   │   ├── Notice.jsx
│   │   ├── Post.jsx
│   │   ├── User.jsx
│   │   ├── UserLikes.jsx
│   │   └── UserPosts.jsx
│   ├── index.js
│   ├── Module
│   │   ├── MaterialUIServiceRendering.js
│   │   └── PWS.js
│   ├── public
│   │   ├── Global.js
│   │   ├── Theme.js
│   │   └── tool.js
│   ├── public.js
│   ├── reducers
│   │   ├── config.js
│   │   ├── index.js
│   │   └── loads.js
│   ├── static
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   └── manifest.json
│   └── store.js
├── static
│   ├── default.jpg
│   ├── favicon.ico
│   ├── logo.png
│   └── manifest.json
├── webpack.build.js
└── webpack.dev.js

```
