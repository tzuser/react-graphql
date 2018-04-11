import {getVideo} from './server/graphql/file';
let url=process.argv.splice(2);
console.log(getVideo(url[0],'test'));