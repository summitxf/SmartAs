(function($, Namespace, Dispatcher) {
	// Bind an event handler.
	var logger = Log.getLogger("core.resource.control");
	var context = $("#content");

	// context.on()

	$.fn.include = function(url, params, callback) {
		// .处理url中?参数
		var index = url.indexOf('?'), self = this;
		if (index >= 0) {
			url = url.substr(0, index);
		}
		if (!url) {
			logger.warn("request url is emtpy");
			return;
		}
		if ($.isFunction(params)) {
			callback = params;
			params = undefined;
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
	}

	var Resource = (function() {

		var $S = function(selector) {
			return $(selector, context);
		};

		var resources = {};
		// 加载资源
		var install = function(namespace, define) {
			logger.info("install package '{0}'", namespace);
			var pkg = Namespace.register(namespace);
			var dispatcher = pkg.Dispatcher
					|| (pkg.Dispatcher = Dispatcher.New(namespace))
			define(pkg, dispatcher, $S, context[0]);
			pkg.ready && pkg.ready();
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
				logger.info("uninstall package '{0}'", ns);
				if (pkgInfo && pkgInfo.parent) {
					delete pkgInfo.parent[pkgInfo.name];
				}
				delete pkgs[ns];
			});

		};
		// 对外暴露的接口

		var request = function(options) {
			ZENG.msgbox.show('正在加载中，请稍后...', 6);
			var complete  = options.complete;
			options.complete = function(request,code){
				try{
					complete && complete(request,code);
				}finally{
					ZENG.msgbox.hide();
				}
			}
			return $.ajax(options);
		}
		return {
			install : install,
			uninstall : uninstall,
			getCurrentUrl : function() {
				return Resource.hash;
			},
			ajax : request,
			get : null,
			post : null,
			put : null,
			del : null
		};
	})();
	$.extend(Namespace.register("Smart.Resource"), Resource);
	window.install = Resource.install;

	$(window).hashchange(function(e) {
		var hash = location.hash;
		Resource.hash = hash;
		context.include(hash.substr(2), function() {
			// 卸载已经加载的资源
			Resource.uninstall();
		});
	});

	// 第一次手动触发
	$(window).hashchange();
})($, Smart.Namespace, Smart.Dispatcher);
