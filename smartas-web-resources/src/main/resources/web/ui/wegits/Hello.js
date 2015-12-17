+(function (Namespace) {
	var NS = Namespace.register("Smart.UI");

	NS.HelloMessage = React.createClass({
		displayName: "HelloMessage",

		render: function () {
			return React.createElement(
				"div",
				null,
				"Hello ",
				this.props.name
			);
		}
	});
})(Smart.Namespace);