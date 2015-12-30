+(function (Namespace) {
	var EasyUI = Namespace.register("Smart.EasyUI");
	EasyUI.DataGrid = React.createClass({
		displayName: 'DataGrid',

		getDefaultProps: function () {
			return {
				rownumbers: true,
				singleSelect: true,
				pagination: true
			};
		},

		shouldComponentUpdate: function () {
			return false;
		},

		getColumns: function () {
			return React.Children.map(this.props.children, function (node) {
				return _.omit(node.props, 'children');
			});
		},

		componentDidMount: function () {
			$(ReactDOM.findDOMNode(this)).datagrid(_.extend({
				columns: [this.columns]
			}, _.omit(this.props, 'children')));
		},
		render: function () {
			return React.createElement('table', { className: 'smart easyui-datagrid' });
		}
	});

	EasyUI.DataGrid.Column = React.createClass({
		displayName: 'Column',

		shouldComponentUpdate: function () {
			return false;
		},
		render: function () {
			return null;
		}
	});
})(Smart.Namespace);