//工具不牵扯逻辑及项目
import host from 'public_/host'
let {STATIC_URL}=host;
//过滤抖动
export const filteringJitter=(space=200)=>{
    let timer,previousReject;
    return ()=>{
      return new Promise((resolve,reject)=>{
        if(timer){
            clearTimeout(timer);
        }
        if(previousReject){
            previousReject()
            previousReject=null;
        }
        timer=setTimeout(resolve,space)
        previousReject=reject;
      })
    }
}


export const imageUrl=(url)=>{
  if(url.startsWith('http'))return url;
  return `${STATIC_URL}${url}`;
}

export const vidoeUrl=(url)=>{
  if(url.startsWith('http'))return url;
  return `${STATIC_URL}${url}`;
}


//取消promise
export const makeCancelable = (promise) => {
  let hasCanceled_ = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

//计算列数
export const countColumn=({minCols,defaultWidth})=>{
  let newMinCols=minCols;
  if(defaultWidth>640)newMinCols=2;
  if(defaultWidth>860)newMinCols=3;
  if(defaultWidth>1080)newMinCols=4;
  if(defaultWidth>1400)newMinCols=6;
  let listWidth=defaultWidth-16
  let columnWidth=listWidth/newMinCols;
  return {
    column:newMinCols,
    width:columnWidth,
    listWidth
  }
}