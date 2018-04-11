import {postModel,likeModel,userModel} from '../db';
import APIError from './APIError';
import {getPageType,getPageData,listToPage} from "./public";
import {getThumbnail} from './file'
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
  isLike:Boolean
}

${getPageType('Post')}

extend type Query{
  post(id:ID!):Post
  posts(first:Int!,after:ID,desc:Boolean,user:ID):PostPage
  likes(first:Int!,after:ID,desc:Boolean,user:ID!):PostPage
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
export const resolvers={
  Query:{
    async post(_,{id},ctx){
      let {_doc:post}=await postModel.findById(id).populate('user').exec();
      postModel.update({_id:id},{$inc:{readNum:+1}}).exec();//添加阅读量
      if(!post)throw new APIError('获取文章失败!',1);
      let isLike=false;
      if(ctx.user){
        isLike=await likeModel.findOne({post:post._id,user:ctx.user}).count().exec()>0;
      }
      return {...post,id:post._id,isLike}
    },
    async posts(_,{first,after,desc,sort,user}){
      let find=user?{user:user}:{};
      return await getPageData({
        model:postModel,
        find,
        after,
        first,
        desc,
        sort,
        populate:'user'
      })
    },
    async likes(_,{first,after,desc,sort,user}){
      //likeModel.find({"$lt":after})
      let find={user};
      return await getPageData({
        model:likeModel,
        find,
        after:after,
        first,
        desc,
        sort,
        populate:{path:"post",populate:{path:"user"}},
        format:(item)=>item.post,
      })
    },
    async moreLikes(_,{first}){
        let list=await postModel.aggregate([{$sample:{size:20}}]);
        list=list.map(async (item)=>{
          let user=await userModel.findById(item.user).exec();
          item.user=user;
          item.id=item._id;
          return item;
        })
        return listToPage({list,first:21})
    }
  },
  Mutation:{
    async addPost(_,{input},ctx){
      if(!ctx.user){
        throw new APIError('用户未登录!',1001);
        return
      }
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
      if(!ctx.user){
        throw new APIError('用户未登录!',1001);
        return
      }
      input.updateDate=+new Date();
      let res=await postModel.update({_id:id},{$set:input}).exec();
      if(!res.ok){
        throw new APIError('修改失败!',1);
      }
      return '修改成功'
    },
    async delPost(_,{post},ctx){
      if(!ctx.user){
        throw new APIError('用户未登录!',1001);
        return
      }
      let doc=await postModel.findById(post).exec();
      console.log(doc.user+''!=ctx.user._id+'')
      if(doc.user+''!=ctx.user._id+''){
        throw new APIError('用户无权限!',1011);
        return
      }
      await postModel.remove({_id:post}).exec();
      return "删除成功";
    },
    async like(_,{post,isLike},ctx){
      if(!ctx.user){
        throw new APIError('用户未登录!',1001);
        return
      }
      if(isLike){
        let like=await likeModel.findOne({post,user:ctx.user}).exec();
        console.log(like)
        likeModel({post,user:ctx.user}).save();
        return '喜欢成功'
      }else{
        await likeModel.remove({post,user:ctx.user}).exec();
        return '删除成功'
      }
    }
    
  }
}


