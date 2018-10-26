//import Router from 'koa-router';
//import graphqlHTTP from 'koa-graphql';
import formatError from './formatError';
// import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServer } from 'apollo-server-koa';
import schema from './schema';

/*typeDefAll=gql`
  ${typeDefAll}
`*/

const server = new ApolloServer({ schema, formatError, context: ({ ctx }) => ctx });
export default server;
/*//路由处理
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
export default router*/
