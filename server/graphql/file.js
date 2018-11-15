import {postModel,likeModel} from '../db';
import APIError from './APIError';
import {getPageType,getPageData,exactLogin} from "./public";
import request from 'request';
import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
//import gm from 'gm';
//import sharp from 'sharp';
export const typeDefs=`
extend type Mutation{
  urlToPhoto(url:String!):Photo
}

`
export const resolvers={
  Mutation:{
    async urlToPhoto(_,{url},ctx){
      exactLogin(ctx.user);
      return getImage(url,ctx.user.name);
    },    
  }
};

function mkdirs(dirpath) {
  if (!fs.existsSync(dirpath)) {
    if (!fs.existsSync(path.dirname(dirpath))) {
      mkdirs(path.dirname(dirpath));
    }
    fs.mkdirSync(dirpath);
  }
}

export const getPath=(type,name)=>{
  let filesDir=path.resolve(__dirname,"../../files",);
  let saveUrl=path.join('/',type,name.substr(0, 3));
  let fileUrl=path.join(saveUrl,name);
  let saveDir=path.join(filesDir,saveUrl);
  mkdirs(saveDir);
  let filePath=path.join(filesDir,fileUrl);
  return {filePath:filePath,fileUrl:fileUrl};
}
//获取远程图片
export const getImage=async (type,url)=>{
  if(url.startsWith('/'))return url;//如果是本地图片
  const types={
    'image/jpeg':'.jpg',
    'image/jpg':'.jpg',
    'image/gif':'.gif',
    'image/png':'.png',
  }
  let ext='.jpg';
  ext=await new Promise((resolve,reject)=>{
    request({url,method:"HEAD"}).on('response', (response)=>{
      let key=response.headers['content-type'];
      resolve(types[key] || ext)
    }).on('error', function(err) {
      reject(err)
    })
  })
  let fileName=getName(ext);

  let {filePath,fileUrl}=getPath(type,fileName);

  return new Promise((resolve,reject)=>{
      request({url}).on('end',()=>{
        resolve(Object.assign({},sizeOf(filePath),{url:fileUrl}))
      }).on('error', function(err) {
        reject(err)
      }).pipe(fs.createWriteStream(filePath));
  })
}

//获取随机名称
export const getName=(ext)=>{
  return `${+new Date()}_${parseInt(Math.random()*100000)}${ext}`
}

//获取头像 
export const getThumbnail=async (type,photoPath)=>{
  //如果图片是远程 先下载
  if(photoPath.startsWith('http')){
    let loadImage=await getImage(type,photoPath);
      console.log(loadImage)
    photoPath=loadImage.url;
    console.log(loadImage)
    return loadImage
  }
  return false
}


//获取远程视频
export const getVideo=async (url,user_name)=>{
  if(url.startsWith('/'))return url;//如果是本地视频
  const types={
    'video/mp4':'.mp4',
  }
  let ext='.mp4';
  ext=await new Promise((resolve,reject)=>{
    request({url,method:"HEAD"}).on('response', (response)=>{
      let key=response.headers['content-type'];
      resolve(types[key] || ext)
    }).on('error', function(err) {
      reject(err)
    })
  })

  let dir=`files/${user_name}`;
  if(!fs.existsSync(`./${dir}`))fs.mkdirSync(`./${dir}`);
  let fileName=getName(ext);
  let filePath=`./${dir}/${fileName}`;
  return new Promise((resolve,reject)=>{
      request({url}).on('end',()=>{
        resolve({url:`/${user_name}/${fileName}`})
      }).on('error', function(err) {
        reject(err)
      }).pipe(fs.createWriteStream(filePath));
  })
}
