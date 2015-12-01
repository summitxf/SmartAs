+function() {
	var slice = Array.prototype.slice,format = String.prototype.format;

	var consoleLogger = function(msg, level, obj) {
		if (window.console) {
			window.console.log(level + ": " + msg);
		}
	}

	function Log(level, prefix) {
		var _currentLevel = Log.WARN;
		var _prefix = false;
		var _logger = consoleLogger;

		this.setPrefix = function(pre) {
			_prefix = pre || false;
		}

		this.setLevel = function(level) {
			_currentLevel = typeof level == 'number' ? level
					: (levels[level] !== undefined ? levels[level] : Log.NONE);
		}

		this.getPrefix = function() {
			return _prefix;
		}

		this.getLogger = function() {
			return _logger;
		}

		this.getLevel = function() {
			return _currentLevel;
		}

		level && this.setLevel(level);
		prefix && this.setPrefix(prefix);
	}

	Log.DEBUG = 1;
	Log.INFO = 2;
	Log.WARN = 3;
	Log.ERROR = 4;
	Log.FATAL = 5;
	Log.NONE = 6;

	var levels = {
		'debug' : Log.DEBUG,
		'info' : Log.INFO,
		'warn' : Log.WARN,
		'error' : Log.ERROR,
		'fatal' : Log.FATAL,
		'none' : Log.NONE
	}

	Log.prototype.debug = function(s) {
		if (this.getLevel() <= Log.DEBUG) {
			var args = slice.call(arguments, 1);
			this._log(format.apply(JSON.stringify(s), args), "DEBUG", this);
		}
	}
	Log.prototype.info = function(s) {
		if (this.getLevel() <= Log.INFO) {
			var args = slice.call(arguments, 1);
			this._log(format.apply(JSON.stringify(s), args), "INFO ", this);
		}
	}
	Log.prototype.warn = function(s) {
		if (this.getLevel() <= Log.WARN) {
			var args = slice.call(arguments, 1);
			this._log(format.apply(JSON.stringify(s), args), "WARN ", this);
		}
	}
	Log.prototype.error = function(s) {
		if (this.getLevel() <= Log.ERROR) {
			var args = slice.call(arguments, 1);
			this._log(format.apply(JSON.stringify(s), args), "ERROR", this);
		}
	}
	Log.prototype.fatal = function(s) {
		if (this.getLevel() <= Log.FATAL) {
			var args = slice.call(arguments, 1);
			this._log(format.apply(JSON.stringify(s), args), "FATAL", this);
		}
	}

	Log.prototype._log = function(msg, level, obj) {
		if (this.getPrefix()) {
			this.getLogger()(this.getPrefix() + " - " + msg, level, obj);
		} else {
			this.getLogger()(msg, level, obj);
		}
	}

	var config = {
		root : Log.WARN
	};

	Log.logger = function(pkg, level) {
		config[pkg] = level;
	}
	Log.root = function(level) {
		config.root = level;
	}

	// ///
	var getLevel = function(pkg) {
		do {
			var level = config[pkg];
			if (level) {
				return level;
			}
			pkg = pkg.substr(0, pkg.lastIndexOf("."));
		} while (pkg);
		return config.root;
	};

	Log.getLogger = function(pkg, logger) {
		return new Log(getLevel(pkg), pkg, logger);
	}
	window.Log = Log;
}();
