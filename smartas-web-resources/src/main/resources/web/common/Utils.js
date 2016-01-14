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
		
		function setValue(object, path, value) {
            var paths = path.split('.');
            //Immutable.Iterable.isIterable(result)
            return object.updateIn(paths,function(object){
            	return value;
            });
            /*var o = object;
            for (var i = 0; i < a.length - 1; i++) {
                var n = a[i];
                if (n in o) {
                    o = o[n];
                } else {
                    o[n] = {};
                    o = o[n];
                }
            }
            o[a[a.length - 1]] = value;*/
        }

        function getValue(object, path,def) {
        	var paths = path.split('.');
        	return object.getIn(paths);
        	
            /*var o = object;
            var a = path.split('.');
            while (a.length) {
                var n = a.shift();
                o = o[n];
                if(o === undefined){
                   return def;
                }
            }
            return o;*/
        }
		
        window.Smart = {
    			isObject : isType("Object"),
    			isString : isType("String"),
    			isArray : Array.isArray || isType("Array"),
    			isFunction : isType("Function"),
    			isUndefined : isType("Undefined"),
    			set : setValue,
    			get : getValue
    		}
		
	}();
}(jQuery);