//# sourceURL=web/security/menu/index.js
+function(Resource, DS) {
	install('web.security.user', function($S) {
		var logger = Log.getLogger('web.security.user');
		var request = Resource.ajax, eventBus = this.eventBus;
		var dataSource = this.dataSource = DS.New('security/user',eventBus);
	});
}(Smart.Resource, Smart.DataSource)