import crypto from 'crypto';
import {userModel} from '../db';
import APIError from './APIError';

export const md5=(text)=>{
  return crypto.createHash('md5').update(text).digest('hex');
};
//获取页面字段
export const getPageType=(name)=>{
return `
type ${name}Page{
  first:Int!
  after:ID
  isEnd:Boolean
  list:[${name}!]
}`
}
//通过游标获取列表
export const getListFromCursor=async (cursor,first)=>{
  let list=[];
  let doc;
  while(doc = await cursor.next()) {
      doc.id=doc._id;
      list.push(doc)
      if(list.length>=first){
        break;
      }
  }
  return list;
}

//获取分页数据
export const getPageData=async ({model,find,first,after,populate,select,format,sort='_id',desc=true})=>{
  if(after){
    if(find._id){
      find._id={...find._id,[desc?"$lt":"$gt"]:after};
    }else{
      find._id={[desc?"$lt":"$gt"]:after};
    }
  }
  const cursor=model.find(find).sort({[sort]:desc?-1:1}).populate(populate).select(select).cursor();
  let list=await getListFromCursor(cursor,first);
  return listToPage({list,first,format});
}

export const listToPage=async ({list,first,format})=>{
  let last_id=list.length>0?(await list[list.length-1])._id:'';
  if(format)list=list.map(format)
  list=list.filter(item=>!!item);
  let isEnd=list.length!=first;
  return {first,after:last_id,list,isEnd}
}

//通过用户名获取用户ID
export const getUserIDFormName=async (name)=>{
  if(!name)throw new APIError('用户名为空!',1);
  let user=await userModel.findOne({name}).exec()
  if(!user)throw new APIError('未找到用户!',1);;
  return user._id
}

//需要用户登录
export const exactLogin=(user)=>{
  if(!user){
    throw new APIError('用户未登录!',1001);
  }
}

//保留关键词
export const blackList=["admin","user","menu","join","login","find","find","notice","post","comments","system","about","protocol","like",
"abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","false","final","finally","float","for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized","this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield",
"Array","Date","eval","function","hasOwnProperty","Infinity","isFinite","isNaN","isPrototypeOf","length","Math","NaN","name","Number","Object","prototype","String","toString","undefined","valueOf",
"onblur","onclick","onerror","onfocus","onkeydown","onkeypress","onkeyup","onmouseover","onload","onmouseup","onmousedown","onsubmit"]