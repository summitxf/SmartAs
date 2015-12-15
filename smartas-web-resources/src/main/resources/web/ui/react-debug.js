+function(UI) {
	var runScripts = function runScripts(target) {
		var context = $(target);
		var scripts = [];
		var index = 0;

		/**
		 * Transform and execute script. Ensures correct load order.
		 */

		var exec = function exec() {
			var param = scripts[index];
			if (param instanceof Array) {
				babel.run.apply(babel, param);
				index++;
				exec();
			}
		};

		/**
		 * Load, transform, and execute all scripts.
		 */

		var run = function run(script, i) {
			var opts = {};

			if (script.src) {
				babel.load(script.src, function(param) {
					scripts[i] = param;
					exec();
				}, opts, true);
			} else {
				opts.filename = "embedded";
				scripts[i] = [ script.innerHTML, opts ];
			}
		};

		// Collect scripts with Babel `types`.

		context.find("script[type='text/babel']").each(function(i, script) {
			scripts.push(script);
		});
		for (i in scripts) {
			run(scripts[i], i);
		}
		exec();
	};
	UI.ready(runScripts);

	var Content = React.createClass({
		displayName : "Content",
		componentDidMount : function() {
			//this.interval = setInterval(this.tick, 1000);
		},
		componentWillUnmount : function() {
			//clearInterval(this.interval);
		},
		render : function render() {
			return React.createElement("div", null, "Seconds Elapsed: ",this.state.secondsElapsed);
		}
	});

}(Smart.UI);
