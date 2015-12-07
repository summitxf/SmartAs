+function(Namespace) {
	// Dom mutation watchers
	var NS = Namespace.register("Smart.Event.UI"), DOMWatchers = NS.DOMWatchers = [];
	NS.DOMReady = false;
	NS.ready = function(callback) {
		DOMWatchers.push(callback);
		if (NS.DOMReady) {
			callback(document);
		}
	};
	$(document).on('changed.dom.react', function(e) {
		var element = e.target;
		$.each(DOMWatchers, function(i, watcher) {
			watcher(element);
		});
	});

	$(function() {
		// var $body = $('body');
		NS.DOMReady = true;
		// Run default init
		$.each(DOMWatchers, function(i, watcher) {
			watcher(document);
		});
	});
}(Smart.Namespace);
