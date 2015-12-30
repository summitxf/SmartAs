+function(Namespace) {
	var NS = Namespace.register("Smart.UI");

	NS.HelloMessage = React.createClass({
		render: function() {
			return <div>Hello {this.props.name}</div>;
		}
	});
}(Smart.Namespace)