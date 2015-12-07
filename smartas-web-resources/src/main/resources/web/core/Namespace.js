+function() {

	// 1、命名空间注册工具类
	var Namespace = {
		register : function(path) {
			if (!path) {
				return window;
			}
			var packages = path.split(".");
			var root = window;
			for (var i = 0, length = packages.length; i < length; i++) {
				root = root[packages[i]] || (root[packages[i]] = {});
			}
			return root;
		},

		pkg : function(path) {
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
		}
	}

	$.extend(Namespace.register("Namespace"), Namespace);
	
}();
