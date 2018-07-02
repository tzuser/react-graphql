import {postModel,likeModel,userModel,keywordModel} from '../db';
import APIError from './APIError';
import {getPageType,getPageData,listToPage} from "./public";
//import pinyinlite from 'pinyinlite';
export const typeDefs=`
type SearchPage{
  keyword:String!
  first:Int!
  after:ID!
  isEnd:Boolean
  list:[Post]
}
type keyword{
  name:String!
  count:Int
}
extend type Query{
  search(keyword:String!,first:Int!,after:ID,user:ID):SearchPage
  searchKeyword(keyword:String):[keyword]
  updateKeyword:Boolean!
}

extend type Mutation{
  addKeyword(keyword:String!):Boolean!
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
      if(!keyword)return [];
      let list = await keywordModel.find({
        name:{$regex:`^${keyword}`}
      },{name:1}).limit(10)
      return list
    },
    async updateKeyword(_,{}){
      let cursor=await postModel.find(null,{tags:1}).cursor()
      let post;
      while(post=await cursor.next()){
        for(let tag of post.tags){
          await resolvers.Mutation.addKeyword(_,{keyword:tag});
        }
      }
      return true;
    }
  },
  
  Mutation:{
    async addKeyword(_,{keyword}){
      /*
      var reg=/^[\u4e00-\u9fa5]{0,}$/;
      if(reg.test(keyword)){//中文
        
      }*/
      let exist=await keywordModel.findOne({name:keyword}).exec();
      if(exist)return false;
      await keywordModel({
        name:keyword
      }).save();
      return true
    },
  }
};

