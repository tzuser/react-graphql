import { postModel, followModel, userModel, subscribeModel } from '../db';
import APIError from './APIError';
import { getPageType, getPageData, listToPage, getUserIDFormName, exactLogin } from './public';
import { gql } from 'apollo-server-koa';

export const typeDefs = gql`
  extend type Query {
    subscribe(first: Int!, after: ID, desc: Boolean): PostPage
  }

  extend type Mutation {
    subscribePost(post: ID!): Int
  }
`;

export const resolvers = {
  Query: {
    async subscribe(_, { first, after, desc, sort = 'creationDate' }, { user }) {
      exactLogin(user);
      let find = { user: user };
      let page = await getPageData({
        model: subscribeModel,
        find,
        after: after,
        first,
        desc,
        sort,
        populate: { path: 'post', populate: { path: 'user' } },
        format: item => {
          if (item.post) return item.post;
        },
      });
      return page;
    },
  },
  Mutation: {
    async subscribePost(_, { post }) {
      //find user for post
      let { user: postUser } = await postModel
        .findById(post)
        .populate({ path: 'user' })
        .exec();
      let cursor = followModel.find({ follow: postUser }).cursor();
      //follow
      let followDoc;
      let upDateCount = 0;
      while ((followDoc = await cursor.next())) {
        // target User
        let subscribeItem = {
          post: post,
          postUser: postUser,
          user: followDoc.user,
        };
        if (
          (await subscribeModel
            .findOne(subscribeItem)
            .count()
            .exec()) == 0
        ) {
          await subscribeModel(subscribeItem).save();
          upDateCount++;
        }
      }
      return upDateCount;
    },
  },
};
