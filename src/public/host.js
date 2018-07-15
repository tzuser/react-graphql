//http://otaku.tangzuo.cc
let hosts={
	HOST:'',
	STATIC_URL:'',
	DB_URL:'/graphql',
}
//使用远程数据
if(process.env.RUN_ENV=='origin'){
	hosts={
		HOST:'otaku.tangzuo.cc',
		STATIC_URL:'//otaku.tangzuo.cc',
		DB_URL:'//otaku.tangzuo.cc/graphql',
	}
}
export default hosts