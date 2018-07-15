// _结尾表示目录  _开头表示文件
var path=require('path')
const alias={
    '@':path.resolve(__dirname,'./src'),
    'act_':path.resolve(__dirname,'./src/actions'),
    'com_':path.resolve(__dirname,'./src/Components'),
    'con_':path.resolve(__dirname,'./src/Containers'),
    '_tools':path.resolve(__dirname,'./src/public/tools.js'),
    '_public':path.resolve(__dirname,'./src/public/public.js'),
    'public_':path.resolve(__dirname,'./src/public'),
    'gql_':path.resolve(__dirname,'./src/graphql'),
}
module.exports=alias