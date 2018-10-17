import {userType} from './user';
import {commentModel,postModel,userModel} from '../db';
import {getPageType,getPageData,exactLogin} from './public';
import APIError from './APIError';
import {resolvers as post} from "./post";

export const typeDefs=`
type Comment{
  id:ID!
  content:String!
  creationDate:String!
  user:User!
  reply:User
}
${getPageType('Comment')}
input CommentInput{
  post:ID!
  content:String!
  reply:ID
}

extend type Query{
  comments(postId:ID!,first:Int!,after:ID,desc:Boolean):CommentPage
}
extend type Mutation{
  comment(input:CommentInput):String
}
`
export const resolvers={
  Query:{
    async comments(_,{postId,first,after,desc=true,sort='_id'}){
      let where={post:postId};
      return await getPageData({
        find:where,
        after,
        first,
        desc,
        sort,
        model:commentModel,
        populate:'reply user'
      })
    }
  },
  Mutation:{
    async comment(_,{input},ctx){
      if(!input.content.trim())throw new APIError('内容不能为空!',1002);
      exactLogin(ctx.user);
      input.user=ctx.user;
      if(!input.reply){
        let {user}=await postModel.findOne({_id:input.post},{user:1}).exec()
        input.reply=user;
      }
      input.creationDate=+new Date();
      commentModel(input).save();

      await post.Mutation.addPostComment(_,{post:input.post})
    },
  }
}