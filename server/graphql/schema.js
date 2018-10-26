import * as post from './post';
import * as user from './user';
import * as comment from './comment';
import * as file from './file';
import * as search from './search';
import * as follow from './follow';
import * as isUpdate from './isUpdate';
import * as subscribe from './subscribe';
import {makeExecutableSchema} from 'graphql-tools';
import { gql } from 'apollo-server-koa';

const typeDefs = [
  gql`
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
`,
];

const resolvers = [
  {
    Query: {
      hello: () => {
        return 'hello world';
      },
    },
  },
];

const addSchema = data => {
  typeDefs.push(data.typeDefs);
  resolvers.push(data.resolvers);
};

addSchema(post);
addSchema(user);
addSchema(comment);
addSchema(file);
addSchema(search);
addSchema(follow);
addSchema(isUpdate);
addSchema(subscribe);

const schema = makeExecutableSchema({typeDefs,resolvers})
export default schema