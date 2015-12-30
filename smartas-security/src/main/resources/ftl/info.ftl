+function(Namespace) {
	var ns = Namespace.register("Smart.Env"),env={
		profile:"${profile}"
	};
	env.user = {
		//你大号
	}
	ns.getInfo=function(){
		return env;
	}
}(Smart.Namespace)