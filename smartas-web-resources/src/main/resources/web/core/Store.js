(function($, Namespace, AT) {
	'use strict';
	var logger = Log.getLogger("core.store");
	function thunkMiddleware(_ref) {
		var dispatch = _ref.dispatch;
		var getState = _ref.getState;

		return function(next) {
			return function(action) {
				return typeof action === 'function' ? action(dispatch, getState) : next(action);
			};
		};
	}
	// ReactRedux
	var finalCreateStore = Redux.applyMiddleware(thunkMiddleware)(Redux.createStore);

	var store = finalCreateStore(_.identity, {
		global : Immutable.fromJS({
			user : {
				userName : 'chenjpu'
			}
		})
	});

	/*var compose = function() {
		var fns = arguments;
		return function(state, action) {
			_.each(fns, function(fn) {
				state = fn(state, action)
			});
			return state;
		}
	};*/

	var defaultReducers = {
		$$LINK_INPUT_CHANGE : function(data, action) {
			if (action.input === 'radio' || action.input === 'checkbox') {
				return Smart.set(data, action.key, action.checked ? action.value : '')
			} else {
				return Smart.set(data, action.key, action.value)
			}
		}
	};

	var defaultGlobal = function(global, action) {
		return global;
	};
	
	function isDomainMap(map) {
	    return _.every(map, _.isPlainObject);
	};
	function isActionMap(map) {
		return _.every(map, _.isFunction);
	};

	function getStore() {
		return store;
	}
	function getState() {
		return store.getState();
	}
	
	/**
	 * @param {Object}
	 *            domain
	 * @param {Object}
	 *            action
	 * @param {string}
	 *            action.name
	 * @param {Object}
	 *            collection
	 * @param {Object}
	 *            tapper
	 * @return {Object}
	 */
	var iterator = function(domain, action, collection, tapper){
	    var newDomain;

	    if (!Immutable.Iterable.isIterable(domain)) {
	        throw new Error('Domain must be an instance of Immutable.Iterable.');
	    }
	    newDomain = domain;
	    _.forEach(collection, function(value, domainName) {
	        if (isActionMap(value)) {
	            if (value[action.type]) {
	                var result;
	                tapper.isActionHandled = true;
	                result = value[action.type](newDomain.get(domainName) || Immutable.Map({}), action);
	                if (!Immutable.Iterable.isIterable(result)) {
	                    throw new Error('Reducer must return an instance of Immutable.Iterable. "' + domainName + '" domain "' + action.name + '" action handler result is "' + typeof result + '".');
	                }
	                newDomain = newDomain.set(domainName, result);
	            }
	        } else if (isDomainMap(value)) {
	            newDomain = newDomain.set(domainName, iterator(newDomain.get(domainName) || Immutable.Map(), action, value, tapper));
	        }
	    });

	    return newDomain;
	};
	
	function combineReducers(reducer,namespace){
	    // validateReducer(reducer);
		var collection = {};
		collection['global'] = defaultGlobal;
		collection['namespace'] = reducer;
		
	    /**
		 * @param {Immutable.Iterable}
		 *            state
		 * @param {Object}
		 *            action
		 * @return {Immutable.Iterable}
		 */
	    function reducers(state, action) {
	        var newState,
	            tapper;

	        if (!action) {
	            throw new Error('Action parameter value must be an object.');
	        }
	        if (action.type && action.type.indexOf('@@') === 0) {
	            return state;
	        }

	        // validateAction(action);

	        // Tapper is an object that tracks execution of the action.
	        // @todo Make this an opt-in.
	        tapper = {
	            isActionHandled: false
	        };
	        newState = iterator(state, action, collection, tapper);
	        //如果自定义reducers没有处理
	        if(!tapper.isActionHandled && action.type && action.type.indexOf('$$') === 0){
	        	newState = iterator(newState, action, {namespace : defaultReducers}, tapper);
	        }
	        if (!tapper.isActionHandled && action.type !== 'CONSTRUCT') {
	        	logger.warn("Unhandled action '{0}'.",action.type);
	        }
	        return newState;
	    };
	    var _localState,_local;
		return function(state, action) {
			var localState = Immutable.Map({global:state.global,namespace : state[namespace] || Immutable.Map({})});
			var localState = reducers(localState, action);
			if(_localState !== localState){
				_localState = localState;
				_local =  _.extend({}, state);
				_local['global'] = _localState.get('global');
				_local[namespace] = _localState.get('namespace');
			}
			return _local; 
		}
	};

	/*
	 * function combineReducers(reducers, namespace) { reducers =
	 * compose(defaultReducers, reducers); var _global,_ns,_local; return
	 * function(state, action) { var global = defaultGlobal(state.global,
	 * action); var ns = reducers(state[namespace] || Immutable.Map({}),
	 * action); if(_global !== global || _ns !== ns){ _global = global; _ns =
	 * ns; _local = _.extend({}, state); _local['global'] = _global;
	 * _local[namespace] = _ns; } return _local; } }
	 */

	function replaceReducer(reducers, ns) {
		store.replaceReducer(combineReducers(reducers, ns));
		return store;
	};
	
	function linkState(key){
		var props = this.props;
		return {
			value: Smart.get(props,key),
			requestChange: function(value,checked,input) {
				store.dispatch({
					type : AT.LINK.INPUT_CHANGE,
					key : key,
					value : value,
					input : input || 'input',
					checked,checked
			})}
		};
	};
	
	function connect(namespace) {
		return function(actions) {
			return ReactRedux.connect(function(state) {
				var ns = state[namespace], global = state.global;
				return {
					get : function(key) {
						return ns.get(key)
					},
					getIn : function(key) {
						return ns.getIn(key)
					},
					global : {
						get : function(key) {
							return global.get(key)
						},
						getIn : function(key) {
							return global.getIn(key)
						},
					}
				}
			}, actions, null, {
				withRef : true
			});
		}
	};

	_.extend(Namespace.register("Smart.Store"), {
		getStore : getStore,
		getState : getState,
		replaceReducer : replaceReducer,
		linkState : linkState,
		connect : connect
	});

})($, Smart.Namespace, Smart.UI.ActionTypes);