+function(Namespace, EventBus,Resource) {
	// Dom mutation watchers
	var NS = Namespace.register("Smart.UI"), 
		name = 'dom.ready';
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
	NS.ready(function(el){
		$.parser.parse($(el));
	});
	
	
}(Smart.Namespace, Smart.EventBus,Smart.Resource);
