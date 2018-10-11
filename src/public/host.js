//http://otaku.tangzuo.cc
let hosts={
	HOST:'',
	STATIC_URL:'',
	DB_URL:'/graphql',
}
//使用远程服务器
if(process.env.RUN_ENV=='origin'){
	hosts={
		HOST:'otaku.tangzuo.cc',
		STATIC_URL:'//otaku.tangzuo.cc',
		DB_URL:'//otaku.tangzuo.cc/graphql',
	}
}

//使用远程数据
if(process.env.RUN_ENV=='odb'){
  hosts={
    HOST:'',
    STATIC_URL:'//otaku.tangzuo.cc',
    DB_URL:'/graphql',
  }
}
export default hosts