import {
  postModel,
  likeModel,
  userModel,
  keywordModel,
  followModel,
} from '../db';
import APIError from './APIError';
import {
  getPageType,
  getPageData,
  listToPage,
  getUserIDFormName,
  exactLogin,
} from './public';
import { getThumbnail } from './file';
//import nodejieba from "nodejieba";
import { resolvers as search } from './search';
import { resolvers as subscribe } from './subscribe';

export const typeDefs = `
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

${getPageType(
  'Post',
  `
  keyword:String
  type:String
  `
)}


extend type Query{
  post(id:ID!):Post
  isLike(id:ID!):Boolean
  posts(first:Int!,after:ID,desc:Boolean,userName:String):PostPage
  likes(first:Int!,after:ID,desc:Boolean,userName:String!):PostPage
  moreLikes(id:ID!,first:Int!,after:ID,desc:Boolean):PostPage
  searchPost(type:String,keyword:String,first:Int!,after:ID,user:ID):PostPage
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
  addPostHot(post:ID!):Boolean
  patch:Boolean
}

`;
//获取运行时间
const getRunTime = () => {
  let startTime = +new Date();
  return (msg = '执行时间') => {
    let currentTime = +new Date();
    let time = currentTime - startTime;
    console.log(`${msg} ${time}`);
  };
};

export const resolvers = {
  Query: {
    async post(_, { id }, ctx) {
      let res = await postModel
        .findById(id)
        .populate('user')
        .exec();
      if (res.state == 1) {
        throw new APIError('文章已被删除!', 1015);
      }
      if (!res) {
        throw new APIError('获取文章失败!', 1015);
      }
      let { _doc: post } = res;
      postModel.update({ _id: id }, { $inc: { readNum: +1 } }).exec(); //添加阅读量
      return { ...post, id: post._id };
    },
    async isLike(_, { id }, ctx) {
      let isLike = false;
      if (ctx.user) {
        isLike =
          (await likeModel
            .findOne({ post: id, user: ctx.user, state: 0 })
            .count()
            .exec()) > 0;
      }
      return isLike;
    },
    async posts(_, { first, after, desc, sort = 'creationDate', userName }) {
      let find;
      try {
        let userID = await getUserIDFormName(userName);
        find = { user: userID, state: 0 };
      } catch (err) {
        find = { state: 0 };
      }
      let page = await getPageData({
        model: postModel,
        find,
        after,
        first,
        desc,
        sort,
        populate: 'user',
      });
      return page;
    },

    async searchPost(_, { type, keyword, first, after, desc, sort, user }) {
      let find = {};
      if (keyword) {
        await search.Mutation.addKeyword(_, {
          keyword: keyword,
          increase: true,
        });
        //查询条件
        find = {
          state: 0,
          $or: [{ tags: keyword }, { content: { $regex: keyword } }],
        };
      }
      if (type && type != 'all') find.type = type;
      if (user) find.user = user;
      //if(after)find._id={"$lt":after};
      let page = await await getPageData({
        model: postModel,
        find,
        first,
        after,
        desc,
        sort,
        user,
        populate: 'user',
      });
      return { ...page, keyword, type };
    },

    //喜欢的帖子
    async likes(_, { first, after, desc, sort, userName }) {
      let userID = await getUserIDFormName(userName);
      let find = { user: userID, state: 0 };
      let page = await getPageData({
        model: likeModel,
        find,
        after: after,
        first,
        desc,
        sort,
        populate: { path: 'post', populate: { path: 'user' } },
        format: item => {
          if (item.post) return item.post;
          //错误处理 补删除
          likeModel.remove({ _id: item._id }).exec();
        },
      });
      return page;
    },
    //more like this
    async moreLikes(_, { id, first, after }) {
      //获取原post
      let post = await postModel.findById(id, { content: 1, tags: 1 }).exec();
      let tagsRegex = post.tags.join('|');
      let find = {
        _id: { $ne: post._id },
        state: 0,
        $or: [
          { tags: { $regex: tagsRegex } },
          { content: { $regex: tagsRegex } },
        ],
      };
      let page = await getPageData({
        model: postModel,
        find,
        after,
        first,
        populate: 'user',
      });
      return page;
    },
  },
  Mutation: {
    async addPost(_, { input }, ctx) {
      exactLogin(ctx.user);
      input.creationDate = new Date().valueOf();
      input.updateDate = input.creationDate;
      input.readNum = 0;
      input.likeNum = 0;
      input.hotNum = 0;
      input.commentNum = 0;
      input.user = ctx.user;
      input.thumbnail = input.thumbnail
        ? await getThumbnail(input.thumbnail, ctx.user.name)
        : null;
      let post = await postModel(input).save();
      //发送订阅
      subscribe.Mutation.subscribePost(_, { post: post.id });
      return post.id;
    },
    async editPost(_, { id, input }, ctx) {
      exactLogin(ctx.user);
      input.updateDate = +new Date();
      let res = await postModel.update({ _id: id }, { $set: input }).exec();
      if (!res.ok) throw new APIError('修改失败!', 1);
      return '修改成功';
    },
    async delPost(_, { post }, ctx) {
      exactLogin(ctx.user);
      let doc = await postModel.findById(post).exec();
      let isAdmin = ctx.user.roles.includes('admin');
      if (!isAdmin && doc.user + '' != ctx.user._id + '') {
        throw new APIError('用户无权限!', 1005);
        return;
      }
      await postModel.update({ _id: post }, { $set: { state: 1 } }).exec();
      // await postModel.remove({_id:post}).exec();
      //删除喜欢
      await likeModel.update({ post: post }, { $set: { state: 1 } }).exec();
      //await likeModel.remove({post:post}).exec();
      //通知喜欢的用户
      console.log(`你喜欢的帖子[${doc.content}]已被删除`);
      return '删除成功';
    },
    async like(_, { post, isLike }, ctx) {
      exactLogin(ctx.user);
      let find = { post, user: ctx.user };
      if (isLike) {
        if (
          (await likeModel
            .findOne({ ...find, state: 0 })
            .count()
            .exec()) > 0
        )
          return '你已喜欢';

        await likeModel
          .update(find, { $set: { state: 0 } }, { upsert: true })
          .exec();
        //await likeModel(find).save();
        resolvers.Mutation.addPostHot(_, { post });
        return '喜欢成功';
      } else {
        await likeModel.update(find, { $set: { state: 1 } }).exec();
        //await likeModel.remove(find).exec();
        return '删除成功';
      }
    },
    async addPostHot(_, { post }) {
      let res = await postModel
        .update({ _id: post }, { $inc: { hotNum: +1 } })
        .exec();
      return true;
    },
    async patch(_, {}) {
      await likeModel.update(null, { $set: { state: 0 } }, { multi: true });
      await postModel.update(null, { $set: { state: 0 } }, { multi: true });
      await followModel.update(null, { $set: { state: 0 } }, { multi: true });
    },
  },
};
