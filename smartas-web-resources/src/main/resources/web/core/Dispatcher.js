+function(Smart, Namespace) {
	var NS = Namespace.register("Smart.Dispatcher");

	NS.New = function(name) {
		return new Dispatcher(name);
	}

	function Dispatcher(name) {
		this.name = name;
		this._callbacks = {};
		this._isDispatching = false;
		this._isHandled = {};
		this._isPending = {};
		this._lastID = 1;
	}

	/**
	 * Registers a callback to be invoked with every dispatched payload. Returns
	 * a token that can be used with `waitFor()`.
	 */

	Dispatcher.prototype.on = function register(name, callback) {
		if (Smart.isFunction(name)) {
			callback = name;
			name = undefined;
		}
		var id = _prefix + this._lastID++;
		this._callbacks[id] = callback;
		return id;
	};

	/**
	 * Removes a callback based on its token.
	 */

	Dispatcher.prototype.off = function unregister(id) {
		!this._callbacks[id] ? true ? invariant(
				false,
				'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
				id)
				: invariant(false)
				: undefined;
		delete this._callbacks[id];
	};

	/**
	 * Waits for the callbacks specified to be invoked before continuing
	 * execution of the current callback. This method should only be used by a
	 * callback in response to a dispatched payload.
	 */

	Dispatcher.prototype.waitFor = function waitFor(ids) {
		!this._isDispatching ? true ? invariant(false,
				'Dispatcher.waitFor(...): Must be invoked while dispatching.')
				: invariant(false) : undefined;
		for (var ii = 0; ii < ids.length; ii++) {
			var id = ids[ii];
			if (this._isPending[id]) {
				!this._isHandled[id] ? true ? invariant(false,
						'Dispatcher.waitFor(...): Circular dependency detected while '
								+ 'waiting for `%s`.', id) : invariant(false)
						: undefined;
				continue;
			}
			!this._callbacks[id] ? true ? invariant(
					false,
					'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
					id)
					: invariant(false)
					: undefined;
			this._invokeCallback(id);
		}
	};

	/**
	 * Dispatches a payload to all registered callbacks.
	 */

	Dispatcher.prototype.fire = Dispatcher.prototype.trigger = function dispatch(type, payload) {
		if (!Smart.isString(type)) {
			payload = type;
			type = undefined;
		}

		!!this._isDispatching ? true ? invariant(false,
				'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.')
				: invariant(false)
				: undefined;
		this._startDispatching(payload);
		try {
			for ( var id in this._callbacks) {
				if (this._isPending[id]) {
					continue;
				}
				this._invokeCallback(id);
			}
		} finally {
			this._stopDispatching();
		}
	};

	/**
	 * Is this Dispatcher currently dispatching.
	 */

	Dispatcher.prototype.isDispatching = function isDispatching() {
		return this._isDispatching;
	};

	/**
	 * Call the callback stored with the given id. Also do some internal
	 * bookkeeping.
	 * 
	 * @internal
	 */

	Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
		this._isPending[id] = true;
		this._callbacks[id](this._pendingPayload);
		this._isHandled[id] = true;
	};

	/**
	 * Set up bookkeeping needed when dispatching.
	 * 
	 * @internal
	 */

	Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
		for ( var id in this._callbacks) {
			this._isPending[id] = false;
			this._isHandled[id] = false;
		}
		this._pendingPayload = payload;
		this._isDispatching = true;
	};

	/**
	 * Clear bookkeeping used for dispatching.
	 * 
	 * @internal
	 */

	Dispatcher.prototype._stopDispatching = function _stopDispatching() {
		delete this._pendingPayload;
		this._isDispatching = false;
	};

	var invariant = function invariant(condition, format, a, b, c, d, e, f) {
		if (true) {
			if (format === undefined) {
				throw new Error('invariant requires an error message argument');
			}
		}

		if (!condition) {
			var error;
			if (format === undefined) {
				error = new Error(
						'Minified exception occurred; use the non-minified dev environment '
								+ 'for the full error message and additional helpful warnings.');
			} else {
				var args = [ a, b, c, d, e, f ];
				var argIndex = 0;
				error = new Error('Invariant Violation: '
						+ format.replace(/%s/g, function() {
							return args[argIndex++];
						}));
			}

			error.framesToPop = 1; // we don't care about invariant's own frame
			throw error;
		}
	};
	var _prefix = 'ID_';
}(Smart, Smart.Namespace);
