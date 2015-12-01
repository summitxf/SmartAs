//格式化字符串
String.prototype.format = function() {
	var args = arguments, length = args.length;
	return this.replace(new RegExp("{([0-9]+)}", "g"), function(str, index) {
		var value = args[index];
		return value !== undefined ? value : "";
	});
}