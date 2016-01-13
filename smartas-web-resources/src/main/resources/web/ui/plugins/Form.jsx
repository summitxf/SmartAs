+ function(Namespace) {
	var UI = Namespace.register("Smart.UI"),
		AT = Smart.UI.ActionTypes;
	UI.Form = React.createClass({
		propTypes: {
			name: React.PropTypes.string.isRequired
		},
		// 返回底层的dom节点
		getDom: function() {
			return this.refs.form;
		},

		getInitialState: function() {
			return {
			};
		},
		render: function() {
			var p = this.props,
				s = this.state;
			return <form>
				 {this.props.children}
			</form>;
		}
	});
}(Smart.Namespace)