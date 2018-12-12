let cacheStorageKey='pwa-v1.8';

this.addEventListener('install',(event)=>{
	console.log('install')
	event.waitUntil(
		caches.open(cacheStorageKey).then((cache)=>{
			return cache.addAll([
				'/',
				'/default.jpg',
				'/logo.jpg',
				'/favicon.ico',
			])
		})
	)
})

this.addEventListener('active',()=>{
	console.log('active')
})

this.addEventListener('fetch',(event)=>{
	console.log('fetch')
	event.respondWith(
		caches.match(event.request).then((response)=>{
			if(response)return response;
			let request = event.request.clone();
			return fetch(request).then((httpRes)=>{
				console.log('aaaaaaaa',httpRes,event.request)

				if(
					!httpRes || 
					httpRes.status !==200 ||
					event.request.method=='POST' || //不存post请求
					event.request.destination!='script' //只存脚本文件

				){
					return httpRes;
				}

			

				console.log( event.request.method,'////////////////////')
				let responseClone=httpRes.clone();
				caches.open(cacheStorageKey).then((cache)=>{
					cache.put(event.request,responseClone);
				})
				return httpRes
			})
		})
	)
})


