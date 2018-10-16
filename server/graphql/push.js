import {postModel,followModel,userModel,pushModel} from '../db';
import APIError from './APIError';
import {getPageType,getPageData,listToPage,getUserIDFormName,exactLogin} from "./public";

export const typeDefs=`

extend type Query{
  getPush(first:Int!,after:ID,desc:Boolean):PostPage
}

extend type Mutation{
  pushPost(post:ID!):Int
}

`


export const resolvers={
  Query:{
    async getPush(_,{first,after,desc,sort},{user}){
      exactLogin(user);
      let find={user:user};
      let page=await getPageData({
        model:pushModel,
        find,
        after:after,
        first,
        desc,
        sort,
        populate:{path:"post",populate:{path:"user"}},
        format:(item)=>{
          if(item.post)return item.post;
        },
      })
      return page
    }
  },
  Mutation:{
    async pushPost(_,{post}){
      //find user for post 
      let {user:postUser}=await postModel.findById(post).populate({path:'user'}).exec();
      let cursor=followModel.find({follow:postUser}).cursor();
      //follow
      let followDoc;
      let upDateCount=0;
      while(followDoc=await cursor.next()){
        // target User
        let pushData={
          post:post,
          postUser:postUser,
          user:followDoc.user
        }
        if(await pushModel.findOne(pushData).count().exec()==0){
          await pushModel(pushData).save();
          upDateCount++;
        }
      }
      return upDateCount
    }
  }
}



