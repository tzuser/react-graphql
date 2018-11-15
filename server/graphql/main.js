import formatError from './formatError';
import { ApolloServer } from 'apollo-server-koa';
import schema from './schema';

const server = new ApolloServer({
  schema,
  formatError,
  introspection: true,
  playground: {
    settings: {
        "request.credentials": "same-origin",
    },
  },
  context: ({ ctx }) => ctx,
});

export default server;
