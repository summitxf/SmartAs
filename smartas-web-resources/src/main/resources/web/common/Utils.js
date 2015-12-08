+function() {
	// 格式化字符串
	String.prototype.format = function() {
		var args = arguments, length = args.length;
		return this.replace(new RegExp("{([0-9]+)}", "g"),
				function(str, index) {
					var value = args[index];
					return value !== undefined ? value : "";
				});
	}

	window.Smart || +function() {
		function isType(type) {
			return function(obj) {
				return {}.toString.call(obj) == "[object " + type + "]"
			}
		}
		window.Smart = {
			isObject : isType("Object"),
			isString : isType("String"),
			isArray : Array.isArray || isType("Array"),
			isFunction : isType("Function"),
			isUndefined : isType("Undefined")
		}
	}();
	if (!jQuery.__hack__) {
		var parseJSON = jQuery.parseJSON
		jQuery.parseJSON = function(data) {
			if (data === "") {
				return data;
			}
			return parseJSON(data);
		}
		jQuery.__hack__ = true;
	}
}(jQuery);