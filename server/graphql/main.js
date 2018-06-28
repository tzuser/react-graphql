import Router  from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import formatError from './formatError';
import {makeExecutableSchema} from 'graphql-tools';
import * as post from './post';
import * as user from './user';
import * as comment from './comment';
import * as file from './file';
import * as search from './search';


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

const mySchema = makeExecutableSchema({typeDefs,resolvers})

//路由处理
const router = new Router();
router.all('/graphql', graphqlHTTP({
    schema: mySchema,
    graphiql: true,
    formatError,
    
}))
export default router