if(typeof window=="object"){//浏览器环境
	if('serviceWorker' in navigator){
		window.addEventListener('load',async ()=>{
			let registration;
			try{
				registration=await navigator.serviceWorker.register('./sw.js',{scope:'/'})
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
			}catch(err){
				 console.log('ServiceWorker registration failed: ', err);
			}
		})
	}	
}