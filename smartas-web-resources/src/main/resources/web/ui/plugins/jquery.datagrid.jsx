+function(Namespace) {
	var EasyUI = Namespace.register("Smart.EasyUI");
	EasyUI.DataGrid = React.createClass({

		getDefaultProps: function() {
			return {
				rownumbers: true,
				singleSelect: true,
				pagination: true
			};
		},
		
		shouldComponentUpdate: function() {
			return false;
		},
		
		getColumns:function(){
			return React.Children.map(this.props.children, function(node) {
				return _.omit(node.props, 'children');
			});
		},
		
		componentDidMount: function() {
			$(ReactDOM.findDOMNode(this)).datagrid(_.extend({
				columns: [this.columns]
			}, _.omit(this.props, 'children')));
		},
		render: function() {
			return <table className="smart easyui-datagrid"></table>;
		}
	});

	EasyUI.DataGrid.Column = React.createClass({
		shouldComponentUpdate: function() {
			return false;
		},
		render: function() {
			return null;
		}
	});
}(Smart.Namespace)