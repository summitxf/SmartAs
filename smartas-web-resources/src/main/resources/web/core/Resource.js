(function($, Namespace) {
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
		$.ajax({
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

	$(window).hashchange(function(e) {
		var hash = location.hash;

		context.include(hash.substr(2), function() {
			// 卸载已经加载的资源
			Resource.uninstall();
		});
	});

	// 第一次手动触发
	$(window).hashchange();

	var Resource = (function() {

		var $S = function(selector) {
			return $(selector, context);
		};

		var resources = {};
		// 加载资源
		var install = function(namespace, define) {
			logger.info("install package '{0}'", namespace);
			var pkg = Namespace.register(namespace);

			define(pkg, $S, context[0], pkg.Dispatcher
					|| (pkg.Dispatcher = new Flux.Dispatcher()));
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
		return {
			install : install,
			uninstall : uninstall
		};
	})();
	$.extend(Namespace.register("Resource"), Resource);
	window.install = Resource.install;
})($, Namespace);
