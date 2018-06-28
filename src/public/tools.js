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

