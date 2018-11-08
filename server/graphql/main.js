import formatError from './formatError';
import { ApolloServer } from 'apollo-server-koa';
import schema from './schema';

const server = new ApolloServer({
  schema,
  formatError,
  introspection: true,
  context: ({ ctx }) => ctx,
});
export default server;
