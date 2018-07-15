import {postModel,likeModel,userModel,keywordModel} from '../db';
import APIError from './APIError';
import {getPageType,getPageData,listToPage,getUserIDFormName,exactLogin} from "./public";
import {getThumbnail} from './file'
import nodejieba from "nodejieba";
import {resolvers as search} from "./search";
export const typeDefs=`
type Photo{
  url:String
  width:Int
  height:Int
  title:String
}

type Post{
  id:ID!
  type:String!
  content:String
  thumbnail:Photo
  photos:[Photo]
  src:String
  creationDate:String
  updateDate:String
  readNum:Int!
  likeNum:Int!
  hotNum:Int!
  commentNum:Int!
  user:User
  tags:[String!]
}

${getPageType('Post')}

extend type Query{
  post(id:ID!):Post
  isLike(id:ID!):Boolean
  posts(first:Int!,after:ID,desc:Boolean,userName:String):PostPage
  likes(first:Int!,after:ID,desc:Boolean,userName:String!):PostPage
  moreLikes(id:ID!,first:Int!,after:ID,desc:Boolean):PostPage
}

input PhotoInput{
  url:String!
  width:Int!
  height:Int!
  title:String
}

input PostInput{
  type:String!,
  content:String
  thumbnail:String
  photos:[PhotoInput!]
  src:String
  tags:[String!]
}

input PostEditInput{
  content:String
  thumbnail:String
  photos:[PhotoInput]
  src:String
  tags:[String!]
}

extend type Mutation{
  addPost(input:PostInput):ID!
  editPost(id:ID!,input:PostEditInput):String
  delPost(post:ID!):String
  like(post:ID!,isLike:Boolean!):String
}

`
//获取运行时间
const getRunTime=()=>{
  let startTime=+new Date();
  return (msg='执行时间')=>{
    let currentTime=+new Date();
    let time=currentTime-startTime;
    console.log(`${msg} ${time}`)
  }
}

export const resolvers={
  Query:{
    async post(_,{id},ctx){
      let res=await postModel.findById(id).populate('user').exec();
      if(!res){
        throw new APIError('获取文章失败!',1015);
      }
      let {_doc:post}=res;
      postModel.update({_id:id},{$inc:{readNum:+1}}).exec();//添加阅读量
      return {...post,id:post._id}
    },
    async isLike(_,{id},ctx){
      let isLike=false;
      if(ctx.user){
        isLike=await likeModel.findOne({post:id,user:ctx.user}).count().exec()>0;
      }
      return isLike
    },
    async posts(_,{first,after,desc,sort,userName}){
      let find;
      try{
        let userID=await getUserIDFormName(userName);
        find={user:userID};
      }catch(err){
        find={}
      }
      let page=await getPageData({
        model:postModel,
        find,
        after,
        first,
        desc,
        sort,
        populate:'user'
      })
      return page
    },
    //喜欢的帖子
    async likes(_,{first,after,desc,sort,userName}){
      let userID=await getUserIDFormName(userName);
      let find={user:userID};
      let page=await getPageData({
        model:likeModel,
        find,
        after:after,
        first,
        desc,
        sort,
        populate:{path:"post",populate:{path:"user"}},
        format:(item)=>{
          if(item.post)return item.post;
          //错误处理 补删除
          console.log(item._id,'帖子已被删除')
          likeModel.remove({_id:item._id}).exec();
        },
      })
      return page
    },
    //more like this
    async moreLikes(_,{id,first,after}){
      //获取原post
      //let timeLog=getRunTime();
      let post=await postModel.findById(id,{content:1,tags:1}).exec();
      let str=`${post.tags.join(" ")} ${post.content}`;
      //分词
      let participle=nodejieba.extract(str,6);
      let keywords=participle.map(item=>item.word);
      if(keywords.length==0){
        return {first,list:[],isEnd:true}
      }
      let tagsRegex=keywords.join('|')

      let find={
        _id:{$ne:post._id},
        $or:[
          {tags:{$regex:tagsRegex}},
          {content:{$regex:tagsRegex}},
        ]
      }

      let page=await getPageData({
        model:postModel,
        find,
        after,
        first,
        populate:'user'
      })
      return page
    }
  },
  Mutation:{
    async addPost(_,{input},ctx){
      exactLogin(ctx.user);
      input.creationDate=new Date().valueOf();
      input.updateDate=input.creationDate;
      input.readNum=0;
      input.likeNum=0;
      input.hotNum=0;
      input.commentNum=0;
      input.user=ctx.user;
      input.thumbnail=input.thumbnail?await getThumbnail(input.thumbnail,ctx.user.name):null;
      let post=await postModel(input).save();
      return post.id
    },
    async editPost(_,{id,input},ctx){
      exactLogin(ctx.user);
      input.updateDate=+new Date();
      let res=await postModel.update({_id:id},{$set:input}).exec();
      if(!res.ok)throw new APIError('修改失败!',1);
      return '修改成功'
    },
    async delPost(_,{post},ctx){
      exactLogin(ctx.user);
      let doc=await postModel.findById(post).exec();
      let isAdmin=ctx.user.roles.includes('admin');
      if(!isAdmin && doc.user+''!=ctx.user._id+''){
        throw new APIError('用户无权限!',1005);
        return
      }
      await postModel.remove({_id:post}).exec();

      //删除喜欢
      await likeModel.remove({post:post}).exec();
      //通知喜欢的用户
      console.log(`你喜欢的帖子[${doc.content}]已被删除`)
      return "删除成功";
    },
    async like(_,{post,isLike},ctx){
      exactLogin(ctx.user);
      let find={post,user:ctx.user};
      if(isLike){
        if(await likeModel.findOne(find).count().exec()>0)return '你已喜欢'
        await likeModel(find).save();
        return '喜欢成功'
      }else{
        await likeModel.remove(find).exec();
        return '删除成功'
      }
    }
    
  }
}



