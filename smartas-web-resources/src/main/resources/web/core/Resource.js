(function($, Namespace, Env, EventBus, Store) {
	// Bind an event handler.
	var logger = Log.getLogger("core.resource.control");
	var context = $("#content"), lifecycle = EventBus.New(true), qs = {}, info = Env.getInfo();

	function $S(selector) {
		return $(selector, context);
	}

	$.fn.include = function(url, params, callback) {
		// .处理url中?参数
		var index = url.indexOf('?'), self = this;
		if (index >= 0) {
			url = url.substr(0, index);
		}
		if ($.isFunction(params)) {
			callback = params;
			params = undefined;
		}

		if (!url) {
			logger.warn("request url is emtpy");
			callback && callback();
			return;
		}

		logger.debug("request url '{0}'", url);
		Resource.ajax({
			type : 'get',
			url : url,
			dataType : 'html',
			data : params,
			success : function(data) {
				// 1.回调
				callback && callback();
				var start = data.indexOf('/*[['), end = data.indexOf(']]*/');
				// 处理资源
				if (start >= 0 && end > 0) {
					var html = [];
					html.push(data.substring(start + 4, end));
					html.push('<script type="text/{0}">'.format(info.profile == 'dev' ? 'babel' : 'javascript'))
					html.push(data.substr(end + 4));
					html.push('</script>');
					data = html.join("");
				}
				// 2.加载资源
				var page = $(data);
				logger.info("apply html segment to dom ");
				self.html(page);
				// .3初始化
				self.trigger('changed.dom');
			},
			error : function() {

			}
		});
	};

	var Resource = (function() {
		var resources = {};
		// 加载资源
		var install = function(namespace, define) {
			var pkg = Namespace.register(namespace);
			logger.info("install package '{0}({1})'", namespace, pkg.__sn__);
			var eventBus = pkg.eventBus || (pkg.eventBus = EventBus.New(namespace));
			define.call(pkg, $S, context[0]);

			var node = pkg.ready && pkg.ready(Store.connect(namespace));
			if (node) {
				if (!node.WrappedComponent) {
					node = Store.connect(namespace)(pkg.actions)(node);
				}
				var reducers = pkg.reducers && pkg.reducers();
				var store = Store.replaceReducer(reducers, namespace);
				ReactDOM.render(React.createElement(ReactRedux.Provider, {
					store : store
				}, React.createElement(node, {
					qs : Resource.getQs()
				})), context[0]);
			}
			resources[namespace] = pkg;
		};
		// 卸载资源
		var uninstall = function(namespace) {
			var pkgs = namespace ? {
				namespace : null
			} : resources;
			$.each(pkgs, function(ns) {
				var pkgInfo = Namespace.pkg(ns);
				// 命名空间
				if (pkgInfo && pkgInfo.parent) {
					logger.info("uninstall package '{0}({1})'", ns, pkgInfo.pkg.__sn__);
					delete pkgInfo.parent[pkgInfo.name];
				}
				delete pkgs[ns];
			});

		};
		// 对外暴露的接口

		var request = function(options) {
			lifecycle.fire('before');
			options.contentType = "application/json";
			if (options.data && !_.isString(options.data)) {
				options.data = JSON.stringify(options.data)
			}
			var complete = options.complete;
			options.complete = function(request, code) {
				try {
					complete && complete(request, code);
				} finally {
					lifecycle.fire('after');
				}
			}
			return $.ajax(options);
		}

		var method = function(type, url, data, success, error) {
			if (_.isFunction(data)) {
				error = success;
				success = data;
				data = undefined;
			}
			var options = {
				type : type,
				url : url,
				data : data,
				success : success,
				error : error
			};
			return request(options);
		}

		return {
			before : function(fn) {
				lifecycle.on('before', fn);
			},
			after : function(fn) {
				lifecycle.on('after', fn);
			},
			getQs : function(reqs) {
				if (reqs) {
					var hash = location.hash;
					return Qs.parse(hash.substr(hash.indexOf('?') + 1))
				}
				return qs;
			},
			install : install,
			uninstall : uninstall,
			getCurrentUrl : function() {
				return Resource.hash;
			},
			ajax : request,
			get : function(url, data, success, error) {
				return method('get', url, data, success, error);
			},
			post : function(url, data, success, error) {
				return method('post', url, data, success, error);
			},
			put : function(url, data, success, error) {
				return method('put', url, data, success, error);
			},
			del : function(url, data, success, error) {
				return method('delete', url, data, success, error);
			}
		};
	})();

	$.extend(Namespace.register("Smart.Resource"), Resource);

	window.install = Resource.install;

	Resource.before(function() {
		ZENG.msgbox.show('正在加载中，请稍后...', 6);
	});
	Resource.after(function() {
		ZENG.msgbox.hide();
	});

	$(window).hashchange(function(e) {
		var hash = location.hash;
		Resource.hash = hash;
		qs = Qs.parse(hash.substr(hash.indexOf('?') + 1));
		// TODO：处理请求参数
		context.include(hash.substr(2), function() {
			// 卸载已经加载的资源
			ReactDOM.unmountComponentAtNode(context[0]);
			Resource.uninstall();
		});
	});
})($, Smart.Namespace, Smart.Env, Smart.EventBus, Smart.Store);
