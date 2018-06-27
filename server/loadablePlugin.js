//因为webpack4和loadable配合的时候有点问题，或者是我没找到更好的解决方案。
//占时自己写了个解决首屏没样式标签，及加载js后闪屏的问题
export default function(bundles,stats,modules){
	let fileList=[];
	modules.map(moduleItem=>{
		const name=moduleItem.substring(moduleItem.lastIndexOf('/')+1,moduleItem.lastIndexOf('.') || undefined);
		Object.values(stats).map(statsList=>{
			statsList.map(statsItem=>{
				if(statsItem.file.includes(`~${name}`)){
					fileList.push(statsItem)
				}
			})
		})
	})
	bundles=bundles.concat(fileList)
	//去重
	let keys={};
	let newBundle=bundles.filter(item=>{
		if(keys[item.file])return false
		keys[item.file]=true;
		return item
	})
	return newBundle
}