import {followModel,userModel} from '../db'
import {getPageType,getUserIDFormName,getUserFormName,getPageData,exactLogin} from "./public";
import APIError from './APIError';
export const typeDefs=`
  extend type Query{
    followers(name:String!,first:Int!,after:ID,desc:Boolean):UserPage
    following(name:String!,first:Int!,after:ID,desc:Boolean):UserPage
    isFollow(name:String!):Boolean
  }
  extend type Mutation{
    follow(name:String!,isFollow:Boolean!):String
  }
`
export const resolvers={
  Query:{
    async followers(_,{name,first,after,desc}){
      let userID=await getUserIDFormName(name);
      let find={follow:userID};
      let page=await getPageData({
        model:followModel,
        find,
        after,
        first,
        desc,
        populate:'user',
        format:(item)=>item.user,
      })
      return page
    },
    async following(_,{name,first,after,desc}){
      let followUserID=await getUserIDFormName(name);
      let find={user:followUserID};
      let page=await getPageData({
        model:followModel,
        find,
        after,
        first,
        desc,
        populate:'follow',
        format:(item)=>item.follow,
      })
      return page
    },
    async isFollow(_,{name},{user}){
      exactLogin(user);
      let followUserID=await getUserIDFormName(name);
      let isFollow=await followModel.findOne({
        user:user,
        follow:followUserID
      }).count().exec()
      return isFollow;
    },
  },
  Mutation:{
    async follow(_,{name,isFollow},{user}){
      exactLogin(user);
      if(user.name==name)throw new APIError('不能关注自己!',1);
      let followUser=await getUserFormName(name);
      let find={
          user:user,
          follow:followUser
        };
      if(isFollow){
        if(await followModel.findOne(find).count().exec()>0)return '你已关注'
        await followModel(find).save();
        followUser.followersCount++;
        await followUser.save();
        user.followingCount++;
        await user.save()
        return '关注成功'
      }else{
        await followModel.remove(find).exec();
        if(followUser.followersCount>0){
          followUser.followersCount--;
          await followUser.save();
        }
        if(user.followingCount>0){
          user.followingCount--;
          await user.save();
        }
        return '删除成功'
      }
    },
  }
}