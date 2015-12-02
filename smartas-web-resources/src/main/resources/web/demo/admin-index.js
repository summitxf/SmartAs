
//# sourceURL=web/demo/admin-index.js
install('demo.admin.index',function(pkg,context){
	var logger = Log.getLogger('demo.admin.index');
	
	pkg.ready = function(){
		logger.info(pkg);
	}
});