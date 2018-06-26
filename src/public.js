//192.168.1.105 otaku.tangzuo.cc
export const HOST='';//http://otaku.tangzuo.cc';
export const IMG_HOST=HOST;
export const DB_URL=`${HOST}/graphql`;
export const imageUrl=(url)=>{
  if(url.startsWith('http'))return url;
  return `${IMG_HOST}${url}`;
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
