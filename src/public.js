//192.168.1.105
export const HOST='http://192.168.56.1:8080';
export const IMG_HOST=HOST;
export const DB_URL=`${HOST}/graphql`;
export const imageUrl=(url)=>{
  if(url.startsWith('http'))return url;
  return `${IMG_HOST}${url}`;
}

export const errorReply=({error,push})=>{
  if(error && error.graphQLErrors){
    let status=error.graphQLErrors[0].status;
    if(status==1001)push('/login');
    return true
  }
  return false
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