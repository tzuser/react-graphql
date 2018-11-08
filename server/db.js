import mongoose from 'mongoose'; //127.0.0.1
let Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
/*ObjectId.prototype.valueOf = function() {
  return this.toString();
};*/

let db_url = 'mongodb://web:wysj3910@127.0.0.1:27017/web';
//使用远程数据
if (process.env.RUN_ENV == 'server-odb') {
  db_url = 'mongodb://web:wysj3910@192.168.1.107:27017/web';
}

// state 通用定义 0 可用 1 禁止

let db = mongoose.connect(
  db_url,
  { useNewUrlParser: true, connectTimeoutMS: 120000 }
);
//用户
const userSchema = new Schema({
  name: { type: String, index: true },
  password: String,
  nick_name: { type: String, index: true }, //因采用驼峰
  age: Number,
  creationDate: Date,
  sex: Number,
  avatar: String,
  followingCount: { type: Number, default: 0 },
  followersCount: { type: Number, default: 0 },
  //posts:[{ type: ObjectId, ref: 'Post' }],
  roles: [String],
  isUpdate: { type: Boolean, default: false },
});

//帖子
const postSchema = new Schema({
  type: String, //类型
  user: { type: ObjectId, ref: 'User' }, //作者
  content: String, //内容
  thumbnail: {
    url: String,
    width: Number,
    height: Number,
  }, //缩略图
  photos: [
    {
      url: String,
      width: Number,
      height: Number,
      title: String,
    },
  ], //图片集合
  tags: [{ type: String, index: true }], //标签
  src: String, //视频 音频 等地址
  creationDate: { type: Date, index: true }, //创建日期
  updateDate: Date, //修改日期
  readNum: Number, //阅读量
  likeNum: Number, //喜欢人数
  hotNum: Number, //热度
  commentNum: Number, //评论量
  rootUser: { type: ObjectId, ref: 'User' }, //发帖人
  fromUser: { type: ObjectId, ref: 'User' }, //被转帖人
  comments: [{ type: ObjectId, ref: 'Comment' }],
  state: { type: Number, default: 0 }, //状态
});

//评论
const commentSchema = new Schema({
  reply: { type: ObjectId, ref: 'User' }, //回复用户
  post: { type: ObjectId, ref: 'Post' },
  content: String, //内容
  creationDate: Date, //评论日期
  user: { type: ObjectId, ref: 'User' }, //用户
  state: { type: Number, default: 0 }, //状态
});

//喜欢
const likeSchema = new Schema({
  user: { type: ObjectId, ref: 'User' }, //用户
  post: { type: ObjectId, ref: 'Post' }, //帖子
  state: { type: Number, default: 0 }, //状态
});

//搜索
const keywordSchema = new Schema({
  name: { type: String, index: true }, //搜索关键字
  pinyin: { type: String, index: true },
  count: { type: Number, default: 1 }, //搜索次数
});

//查看记录
const readRecord = new Schema({
  user: { type: ObjectId, ref: 'User' }, //用户
  post: { type: ObjectId, ref: 'Post' }, //帖子
  date: Date, //日期
});

//关注
const followSchema = new Schema({
  user: { type: ObjectId, ref: 'User' }, //用户
  follow: { type: ObjectId, ref: 'User' }, //关注用户
  state: { type: Number, default: 0 }, //状态
});

// subscribe
const subscribeSchema = new Schema({
  user: { type: ObjectId, ref: 'User' }, //用户
  postUser: { type: ObjectId, ref: 'User' },
  post: { type: ObjectId, ref: 'Post' },
  state: { type: Number, default: 0 }, //状态
});

export const userModel = mongoose.model('User', userSchema);
export const postModel = mongoose.model('Post', postSchema);
export const likeModel = mongoose.model('Like', likeSchema);
export const commentModel = mongoose.model('Comment', commentSchema);
export const keywordModel = mongoose.model('Keyword', keywordSchema);
export const followModel = mongoose.model('Follow', followSchema);
export const subscribeModel = mongoose.model('Subscribe', subscribeSchema);
export const readModel = mongoose.model('ReadRecord', readRecord);
