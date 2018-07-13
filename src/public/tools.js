import host from 'public_/host'
let {IMG_URL}=host;
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
  return `${IMG_URL}${url}`;
}
//错误响应
export const errorReply=async ({error,push})=>{
  return new Promise((resolve,reject)=>{
    if(error && error.graphQLErrors){
      let status=error.graphQLErrors[0].status;
      if(status==1001)push('/login');
      reject(error)
    }
    resolve(true);
  })
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
