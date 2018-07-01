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
}

input KeywordInput{
  keyword:String
}

extend type Mutation{
  addKeyword(input:KeywordInput):Boolean!
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
    }
  },
  
  Mutation:{
    async addKeyword(_,{input:{keyword}}){
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

