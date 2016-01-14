+function(Namespace, EventBus, Resource, AT) {
	// Dom mutation watchers
	var NS = Namespace.register("Smart.UI"), name = 'dom.ready';
	lifecycle = EventBus.New(true);

	NS.ready = function(callback) {
		lifecycle.on(name, callback)
	};

	$(document).on('changed.dom', function(e) {
		var element = e.target;
		lifecycle.fire(name, element)
	});

	$(function() {
		// var $body = $('body');
		lifecycle.ready = true;
		// Run default init
		lifecycle.fire(name);
	});

	//
	NS.ready(function(el) {
		$.parser.parse($(el));
	});

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg)
				continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for ( var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}
	window.classNames = classNames;
}(Smart.Namespace, Smart.EventBus, Smart.Resource, Smart.UI.ActionTypes);
