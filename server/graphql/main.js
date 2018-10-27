import formatError from './formatError';
import { ApolloServer } from 'apollo-server-koa';
import schema from './schema';

const server = new ApolloServer({ schema, formatError, context: ({ ctx }) => ctx });
export default server;

