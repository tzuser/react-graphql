//共用方法

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

//通过属性名获取分页数据 queryName请求名称 condition条件
export const loadItems=function({props,queryName,condition={}}){
      let { data: {refetch ,fetchMore,loading} }=props
      let itemData=props.data[queryName];
      if(!itemData)return;
      let {first,after,totalCount,isEnd}=itemData;
      if(!isEnd && !loading){
          props.data.fetchMore({
            variables:{after,first,...condition},
            updateQuery: (previousResult, { fetchMoreResult }) => {
              if(previousResult[queryName].list){
                fetchMoreResult[queryName].list=previousResult[queryName].list.concat(fetchMoreResult[queryName].list)
              }
              return fetchMoreResult;
            }
          })
      }
  }
