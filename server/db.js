import mongoose,{Schema} from 'mongoose';
let db=mongoose.connect('mongodb://web:wysj3910@127.0.0.1:27017/web')
//用户
const userSchema=new Schema({
  name:{type:String,index:true},
  password:String,
  nick_name:{type:String,index:true},
  age:Number,
  creationDate:Date,
  sex:Number,
  avatar:String,
  //posts:[{ type: Schema.Types.ObjectId, ref: 'Post' }],
  roles:[String],
})

//帖子
const postSchema=new Schema({
  type:String,//类型
  user:{type:Schema.Types.ObjectId,ref:'User'},//作者
  content:String,//内容
  thumbnail:{
    url:String,
    width:Number,
    height:Number
  },//缩略图
  photos:[{
    url:String,
    width:Number,
    height:Number,
    title:String
  }],//图片集合
  tags:[{type:String,index:true}],//标签
  src:String,//视频 音频 等地址
  creationDate:Date,//创建日期
  updateDate:Date,//修改日期
  readNum:Number,//阅读量
  likeNum:Number,//喜欢人数
  hotNum:Number,//热度
  commentNum:Number,//评论量
  comments:[{type:Schema.Types.ObjectId,ref:'Comment'}]
})

//评论
const commentSchema=new Schema({
  reply:{type:Schema.Types.ObjectId,ref:'User'},//回复用户
  post:{type:Schema.Types.ObjectId,ref:'Post'},
  content:String,//内容
  creationDate:Date,//评论日期
  user:{type:Schema.Types.ObjectId,ref:'User'},//用户
})

//喜欢
const likeSchema=new Schema({
  user:{type:Schema.Types.ObjectId,ref:'User'},//用户
  post:{type:Schema.Types.ObjectId,ref:'Post'},//帖子
})

//搜索
const keywordSchema=new Schema({
  name:{type:String,index:true},//搜索关键字
  pinyin:{type:String,index:true},
  count:Number//搜索次数
})

export const userModel=mongoose.model('User',userSchema)
export const postModel=mongoose.model('Post',postSchema)
export const likeModel=mongoose.model('Like',likeSchema)
export const commentModel=mongoose.model('Comment',commentSchema)
export const keywordModel=mongoose.model('Keyword',keywordSchema)