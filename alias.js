
var path=require('path')
const alias={
    '@':path.resolve(__dirname,'./src/'),
    'act_':path.resolve(__dirname,'./src/actions/'),
    'com_':path.resolve(__dirname,'./src/Components/'),
    'con_':path.resolve(__dirname,'./src/Containers/'),
    'tools_':path.resolve(__dirname,'./src/public/tools.js'),
}
module.exports=alias