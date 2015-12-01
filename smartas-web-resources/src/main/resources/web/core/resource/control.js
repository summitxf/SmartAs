(function($) {
	// Bind an event handler.
	var logger = Log.getLogger("core.resource.control");
	var context = $("#content");
	$(window).hashchange(function(e) {
		var hash = location.hash;
		// console.log(hash);
		hash && (function(url) {
			if (!url) {
				return;
			}
			$.ajax({
				type : 'get',
				url : url,
				dataType : 'html',
				success : function(data) {
					// .1卸载已经加载的资源
					Namespace.uninstall();
					// .2初始化
					var page = $(data);
					context.html(page);
				},
				error : function() {

				}
			});
		})(hash.substr(2));
	});

	// 第一次手动触发
	$(window).hashchange();

	// 1、命名空间注册工具类
	var Namespace = (function() {
		// 祖册packge
		var register = function(path) {
			if (!path) {
				return window;
			}
			var packages = path.split(".");
			var root = window;
			for (var i = 0, length = packages.length; i < length; i++) {
				root = root[packages[i]] || (root[packages[i]] = {});
			}
			return root;
		};

		var __package = function(path) {
			if (!path) {
				return null;
			}
			var packages = path.split(".");
			var root = window, parent = null;
			for (var i = 0, length = packages.length; i < length; i++) {
				parent = root;
				root = root[packages[i]];
				if (!root) {
					return null;
				}
			}
			return {
				pkg : root,
				parent : parent,
				name : packages[packages.length - 1]
			};
		};

		var resources = {};
		// 加载资源
		var install = function(namespace, define) {
			logger.info("install resource {0}", namespace);
			var pkg = register(namespace);
			define(pkg, context);
			pkg.ready && pkg.ready();
			resources[namespace] = pkg;
		};
		// 卸载资源
		var uninstall = function(namespace) {
			var pkgs = namespace ? {
				namespace : null
			} : resources;
			$.each(pkgs, function(ns) {
				var pkg = __package(ns);
				// 命名空间
				logger.info("uninstall resource {0}", ns);
				if (pkg && pkg.parent) {
					delete pkg.parent[pkg.name];
				}
				delete pkgs[ns];
			});

		};
		// 对外暴露的接口
		return {
			register : register,
			install : install,
			uninstall : uninstall
		};
	})();
	$.extend(Namespace.register("Namespace"), Namespace);
	window.install = Namespace.install;
})($);
