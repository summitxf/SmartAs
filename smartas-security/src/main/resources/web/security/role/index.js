//# sourceURL=web/security/role/index.js
+function(Resource) {
	install('web.security.role', function($S) {
		var logger = Log.getLogger('web.security.role');
		var eventBus = this.eventBus;
		this.del = function(id) {
			Resource.del('services/security/role/single/{0}'.format(id),
					function() {
						logger.debug("Delete Role {{0}}",id)
						eventBus.fire('role.refresh');
					});
		}
	});
}(Smart.Resource)
