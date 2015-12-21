(function($, Namespace, Resource) {

	var NS = Namespace.register("Smart.DataSource");

	NS.New = function(model, eventBus, options) {
		return new DataSource(model, eventBus, options);
	}

	var DataSource = function(model, eventBus, options) {
		this.model = model;
		this.eventBus = eventBus;
		this.options = options || {
			services : {
				create : 'services/' + model + '/single',
				update : 'services/' + model + '/single',
				get : 'services/' + model + '/single/{0}',
				del : 'services/' + model + '/single/{0}',
				listAll : 'services/' + model + '/list',
				listPage : 'services/' + model + '/list/{0}/{1}',
			}
		};

		if (this.options.services) {

		}
	}

	DataSource.prototype.get = function(id) {
		var services = this.options.services, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource.get(services.get.format(id));

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});
		return qwest
	};

	DataSource.prototype.del = function(id) {
		var services = this.options.services, eventBus = this.eventBus, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource.del(services.del.format(id));

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});

		qwest.then(function(data) {
			eventBus.fire('refresh',data);
		});
		return qwest
	};

	DataSource.prototype.create = function(data) {
		var services = this.options.services, eventBus = this.eventBus, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource.post(services.create, data);

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});
		qwest.then(function(data) {
			eventBus.fire('refresh',data);
		});
		return qwest
	};

	DataSource.prototype.update = function(data) {
		var services = this.options.services, eventBus = this.eventBus, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource.put(services.update, data);

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});
		qwest.then(function(data) {
			eventBus.fire('refresh',data);
		});
		return qwest
	};

	DataSource.prototype.listPage = function(page, pageSize, params) {
		var services = this.options.services, eventBus = this.eventBus, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource
					.get(services.listPage.format(page, pageSize), params);

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});
		qwest.then(function(data) {
			eventBus.fire('data',data);
		});
		return qwest
	}

	DataSource.prototype.listAll = function(params) {
		var services = this.options.services, eventBus = this.eventBus, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource.get(services.listAll, params);

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});
		qwest.then(function(data) {
			eventBus.fire('data',data);
		});
		return qwest
	};
	
	DataSource.prototype.refresh = function(func) {
		this.eventBus.fire('refresh');
		return this;
	};

	DataSource.prototype.onRefresh = function(func) {
		this.eventBus.on('refresh', func);
		return this;
	};
	
	DataSource.prototype.onData = function(func) {
		this.eventBus.on('data', func);
		return this;
	};

})($, Smart.Namespace, Smart.Resource);