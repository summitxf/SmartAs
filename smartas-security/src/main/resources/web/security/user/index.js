//# sourceURL=web/security/menu/index.js
+function(Resource, DS) {
	install('web.security.user', function($S) {
		var logger = Log.getLogger('web.security.user');
	});
}(Smart.Resource, Smart.DataSource)