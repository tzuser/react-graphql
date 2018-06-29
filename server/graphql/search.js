import {postModel,likeModel,userModel} from '../db';
import APIError from './APIError';
import {getPageType,getPageData,listToPage} from "./public";
export const typeDefs=`
type SearchPage{
  keyword:String!
  first:Int!
  after:ID!
  isEnd:Boolean
  list:[Post]
}
extend type Query{
  search(keyword:String!,first:Int!,after:ID,user:ID):SearchPage
  searchKeyword(keyword:String!):[String]
}

`


export const resolvers={
  Query:{
    async search(_,{keyword,first,after,desc,sort,user}){
      //查询条件
      let find={$or:[
        {tags:keyword},
        {content:{$regex: keyword}}
      ]};
      if(user)find.user=user;
      if(after)find._id={"$gt":after};

      let page=await await getPageData({
        model:postModel,
        find,
        first,
        after,
        desc,
        sort,
        user,
        populate:'user'
      });
      return {...page,keyword};
    },
    async searchKeyword(_,{keyword}){
      return ["测试","数据"]
    }
  },
}


