import {postModel,likeModel,userModel} from '../db';
import APIError from './APIError';
import {listToPage} from './public';
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

const getFirstList=async (cursor,first)=>{
  let list=[];
  let doc;
  while(doc = await cursor.next()) {
      doc.id=doc._id;
      list.push(doc)
      if(list.length>=first){
        break;
      }
  }
  return list;
}
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

      let cursor=postModel.find(find).populate('user').cursor()
      let list=await getFirstList(cursor,first);
      let page=await listToPage({list,first});
      return {...page,keyword};
    },
    async searchKeyword(_,{keyword}){
      return ["美女","萝莉"]
    }
  },
}


