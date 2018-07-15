import Router  from 'koa-router';
//import graphqlHTTP from 'koa-graphql';
import formatError from './formatError';
import {makeExecutableSchema} from 'graphql-tools';
import * as post from './post';
import * as user from './user';
import * as comment from './comment';
import * as file from './file';
import * as search from './search';
import * as follow from './follow';

import { graphqlKoa,graphiqlKoa } from 'apollo-server-koa';

const typeDefs=[`
  type Query {
    hello: String
  }
  type Mutation{
    hello: String
  }
  schema {
    query: Query
    mutation: Mutation
  }
`];

const resolvers=[{
  Query:{
    hello:()=>{
      return "hello world"
    }
  }
}];

const addSchema=(data)=>{
  typeDefs.push(data.typeDefs)
  resolvers.push(data.resolvers)
}

addSchema(post);
addSchema(user);
addSchema(comment);
addSchema(file);
addSchema(search);
addSchema(follow);

const mySchema = makeExecutableSchema({typeDefs,resolvers})

//路由处理
const router = new Router();
router.all('/graphql', async (ctx, next) =>{
  await graphqlKoa({
    schema: mySchema,
    formatError,
    context:ctx
  })(ctx)
})
router.get('/graphiql', async (ctx, next) =>{
  graphiqlKoa({ endpointURL: '/graphql' })(ctx)
});
export default router