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
	var store = finalCreateStore(_.identity, Immutable.fromJS({
		global : {
				user : {
					userName : 'chenjpu'
				}
			}
		})
	);

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
			//Immutable.Iterable.isIterable(result)
            return data.updateIn(action.key.split('.'),function(object){
            	if (action.input === 'radio' || action.input === 'checkbox') {
    				return action.checked ? action.value : ''
    			} else {
    				return action.value
    			};
            });
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

	    /*if (!Immutable.Iterable.isIterable(domain)) {
	        throw new Error('Domain must be an instance of Immutable.Iterable.');
	    }*/
	    newDomain = domain;
	    _.forEach(collection, function(value, domainName) {
	        if (isActionMap(value)) {
	            if (value[action.type]) {
	            	tapper.isActionHandled = true;
	            	
	                /*var result = value[action.type](newDomain[domainName] || {}, action);
	                if(result !== newDomain[domainName]){
	                	newDomain = _.extend({},newDomain);
		                newDomain[domainName] = result;
	                }
	                return newDomain;*/
	                
	            	var result = value[action.type](newDomain.get(domainName) || Immutable.Map({}), action);
	                if (!Immutable.Iterable.isIterable(result)) {
	                    throw new Error('Reducer must return an instance of Immutable.Iterable. "' + domainName + '" domain "' + action.name + '" action handler result is "' + typeof result + '".');
	                }
	                newDomain = newDomain.set(domainName, result);
	            }
	        } else if (isDomainMap(value)) {
	            newDomain = newDomain.set(domainName, iterator(newDomain.get(domainName) || Immutable.Map({}), action, value, tapper));
	        	/*var result = iterator(newDomain[domainName] || {}, action, value, tapper);
	        	if(result !== newDomain[domainName]){
                	newDomain = _.extend({},newDomain);
	                newDomain[domainName] = result;
                }
	        	return newDomain;*/
	        }
	    });

	    return newDomain;
	};
	
	function combineReducers(reducer,namespace){
	    // validateReducer(reducer);
		var collection = {},defaultCollection = {};
		collection['global'] = defaultGlobal;
		collection[namespace] = reducer;
		defaultCollection[namespace] = defaultReducers;
		
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
	        	newState = iterator(newState, action, defaultCollection, tapper);
	        }
	        if (!tapper.isActionHandled && action.type !== 'CONSTRUCT') {
	        	logger.warn("Unhandled action '{0}'.",action.type);
	        }
	        return newState;
	    };
		return function(state, action) {
			
			return reducers(state,action);
			
			/*var localState = Immutable.Map({global:state.global,namespace : state[namespace] || Immutable.Map({})});
			var localState = reducers({global:state.global,namespace : state[namespace] || {}}, action);
			if(localState.global !== state['global'] || localState.namespace !== state[namespace]){
				var result =  _.extend({}, state);
				//_local['global'] = _localState.get('global');
				//_local[namespace] = _localState.get('namespace');
				
				result['global'] = localState.global;
				result[namespace] = localState.namespace;
				return result;
			}
			return state; */
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
			value: Smart.getValue(props,key),
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
				var ns = state.get(namespace), global = state.get('global');
				return _.extend({},ns?ns.toJS():{},{global:global.toJS()});
				/*return {
					local : function(key) {
						//return ns.get(key)
						return Smart.getValue(ns,key);
					},
					global : function(key) {
						//return global.get(key)
						return Smart.getValue(global,key);
					}
				}*/
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