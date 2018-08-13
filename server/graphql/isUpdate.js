import {followModel,userModel} from '../db'
import {getPageType,getUserIDFormName,getUserFormName,getPageData,exactLogin} from "./public";
import APIError from './APIError';
export const typeDefs=`
  extend type Query{
    isUpdate(name:String!):Boolean
  }
  extend type Mutation{
    setUpdate(name:String!,isUpdate:Boolean!):Boolean
  }
`
export const resolvers={
  Query:{
    async isUpdate(_,{name},{user}){
      exactLogin(user);
      let target=await getUserFormName(name);
      console.log(target)
      return target['_doc'].isUpdate;
    },
  },
  Mutation:{
    async setUpdate(_,{name,isUpdate},{user}){
      exactLogin(user);
      await userModel.update({name:name},{$set:{isUpdate:isUpdate}}).exec()
      return isUpdate
    },
  }
}