import {postModel,likeModel} from '../db';
import APIError from './APIError';
import {getPageType,getPageData} from "./public";
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
      if(!ctx.user){
        throw new APIError('用户未登录!',1001);
        return ;
      }
      return getImage(url,ctx.user.name);
    },    
  }
};
//创建目录
const createDir=()=>{
  if(!fs.existsSync('files'))fs.mkdirSync('files');
  if(!fs.existsSync('files/thumbnail'))fs.mkdirSync('files/thumbnail');
}
//获取远程图片
export const getImage=async (url,user_name)=>{
  createDir();
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

  let dir=`files/${user_name}`;
  if(!fs.existsSync(`./${dir}`))fs.mkdirSync(`./${dir}`);
  let fileName=getName(ext);
  let filePath=`./${dir}/${fileName}`;
  return new Promise((resolve,reject)=>{
      request({url}).on('end',()=>{
        resolve(Object.assign({},sizeOf(filePath),{url:`/${user_name}/${fileName}`}))
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
export const getThumbnail=async (photoPath,user_name)=>{
  //如果图片是远程 先下载
  if(photoPath.startsWith('http')){
    let loadImage=await getImage(photoPath,user_name);
    photoPath=loadImage.url;
  }
  let fileName=getName('.jpg');
  let dirPath=path.resolve(__dirname,`../../files/thumbnail/${user_name}`);
  let filePath=path.resolve(dirPath,`./${fileName}`);
  photoPath=path.resolve(__dirname,`../../files/${photoPath}`);
  if(!fs.existsSync(dirPath))fs.mkdirSync(dirPath);
  /*let size=await new Promise((resolve,reject)=>{
    sharp(photoPath).resize(400).jpeg({quality:70}).toFile(filePath, (err, info) =>{
      err && reject(err);
      resolve(info);
    });
  })*/
  let size=sizeOf(photoPath)
  return {...size,url:`/thumbnail/${user_name}/${fileName}`};
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
