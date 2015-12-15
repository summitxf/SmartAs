+function(Namespace, _) {
	var _prefix = 'ID_';

	function EventBus(name, ready) {
		this.name = name;
		this.ready = ready || false;
		this.watchers = {};
	}

	EventBus.prototype.on = function(name, fn) {
		if (fn === undefined) {
			fn = name;
			name = 'defualt';
		}

		var list = this.watchers[name] || (this.watchers[name] = []);
		list.push(fn);
		if (this.ready) {
			fn();
		}
	};

	EventBus.prototype.fire = function(name, payload) {
		name = name || 'defualt';
		_.each(this.watchers[name], function(fn) {
			fn(payload);
		});
	};

	var NS = Namespace.register("Smart.EventBus");
	NS.New = function(name, ready) {
		return new EventBus(name, ready);
	};
}(Smart.Namespace, _);