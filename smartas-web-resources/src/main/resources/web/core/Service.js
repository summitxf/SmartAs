(function($, Namespace, Resource, AT) {

	var NS = Namespace.register("Smart.Service");

	function compose(type) {
		var fns = _.slice(arguments, 1);
		return function(arg1, arg2, arg3) {
			_.each(fns, function(fn) {
				if (fn) {
					return fn(arg1, arg2, arg3)
				}
			});
		}
	}
	
	NS.New = function(model) {
		var listeners = [], services = {
			create : 'services/' + model + '/single',
			update : 'services/' + model + '/single',
			get : 'services/' + model + '/single/{0}',
			find : 'services/' + model + '/single/{0}',
			remove : 'services/' + model + '/single/{0}',
			list : 'services/' + model + '/list',
			listPage : 'services/' + model + '/list/{0}/{1}',
		};

		function subscribe(listener) {
			listeners.push(listener);
			var isSubscribed = true;

			return function unsubscribe() {
				if (!isSubscribed) {
					return;
				}
				isSubscribed = false
				var index = listeners.indexOf(listener);
				listeners.splice(index, 1);
			}
		}

		function _dispatch(action) {
			_.each(listeners, function(listener) {
				listener(action);
			});
		}


		var method = function(method, type, url, data, success, error) {
			return Resource.method(type, url, data, compose(type, function(data) {
				_dispatch({
					type : AT.SERVICE.SUCCESS,
					method : method,
					model : model,
					data : data
				});
			}, success), error);
		}

		function create(data, sucess, error) {
			return method('create', 'post', services.create, data, sucess, error);
		}
		function update(data, sucess, error) {
			return method('update', 'put', services.update, data, sucess, error);
		}
		function get(id, sucess, error) {
			return method('get', 'get', services.get.format(id), sucess, error);
		}
		function find(id, sucess, error) {
			return method('find', 'get', services.find.format(id), sucess, error);
		}
		function remove(id, sucess, error) {
			return method('remove', 'delete', services.remove.format(id), sucess, error);
		}
		function list(q, sucess, error) {
			return method('list', 'get', services.list, q, sucess, error);
		}
		function listPage(page, pageSize, q, sucess, error) {
			return method('listPage', 'get', services.listPage.format(page, pageSize), q, sucess, error);
		}
		function ready() {
			dispatch(AT.SERVICE.READY);
		}
		function init() {
			dispatch(AT.SERVICE.INIT);
		}
		function refresh() {
			dispatch(AT.SERVICE.INIT);
		}
		function dispatch(type, data) {
			_dispatch({
				type : type,
				data : data
			});
		}
		return {
			create : create,
			update : update,
			get : get,
			find : find,
			remove : remove,
			list : list,
			listPage : listPage,
			dispatch : dispatch,
			ready : ready,
			init : init,
			refresh : refresh,
			subscribe : subscribe
		};
	}
})($, Smart.Namespace, Smart.Resource, Smart.ActionTypes);