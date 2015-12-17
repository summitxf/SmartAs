+(function (Namespace) {
	var NS = Namespace.register("Smart.UI"),
	    request = Smart.Resource.ajax;

	NS.Hello = React.createClass({
		displayName: 'Hello',

		render: function () {
			return React.createElement(
				'div',
				null,
				'Hello ',
				this.props.name
			);
		}
	});

	var PanelTools = React.createClass({
		displayName: 'PanelTools',

		//shouldComponentUpdate: function() {
		//	return false;
		//collapsible:true,minimizable:true,maximizable:true,closable:true
		//},var
		render: function () {
			var tools = [],
			    props = this.props;
			props.collapsible && tools.push('collapse');
			props.minimizable && tools.push('min');
			props.maximizable && tools.push('max');
			props.closable && tools.push('close');
			return React.createElement(
				'div',
				{ className: 'panel-tool' },
				_.map(tools, function (value) {
					return React.createElement('a', { href: 'javascript:void(0)', className: 'panel-tool-' + value });
				})
			);
		}
	});

	var Panel = NS.Panel = React.createClass({
		displayName: 'Panel',

		//shouldComponentUpdate: function() {
		//	return false;
		//},
		render: function () {
			return React.createElement(
				'div',
				{ className: 'smart panel' },
				this.props.children
			);
		}
	});

	Panel.Header = React.createClass({
		displayName: 'Header',

		//shouldComponentUpdate: function() {
		//	return false;
		//},
		render: function () {
			return React.createElement(
				'div',
				{ className: 'panel-header' },
				React.createElement(
					'div',
					{ className: 'panel-title' },
					this.props.title
				),
				React.createElement(PanelTools, this.props)
			);
		}
	});

	var View1 = React.createClass({
		displayName: 'View1',

		render: function () {
			var props = this.props;
			if (!props.rownumbers) {
				return null;
			}
			return React.createElement(
				'div',
				{ className: 'datagrid-view1', style: { width: '31px' } },
				React.createElement(
					'div',
					{ className: 'datagrid-header', style: { width: '31px', height: '25px' } },
					React.createElement(
						'table',
						{ className: 'datagrid-htable', border: '0', cellSpacing: '0', cellPadding: '0', style: { height: '25px' } },
						React.createElement(
							'tbody',
							null,
							React.createElement(
								'tr',
								{ className: 'datagrid-header-row' },
								React.createElement(
									'td',
									{ rowSpan: '0' },
									React.createElement('div', { className: 'datagrid-header-rownumber' })
								)
							)
						)
					)
				),
				React.createElement(View1Body, { rows: this.props.rows }),
				React.createElement(
					'div',
					{ className: 'datagrid-footer', style: { width: '31px' } },
					React.createElement('div', { className: 'datagrid-footer-inner', style: { display: 'none' } })
				)
			);
		}
	});

	var View1Row = React.createClass({
		displayName: 'View1Row',

		render: function () {
			return React.createElement(
				'tr',
				{ className: 'datagrid-row', style: { height: '25px' } },
				React.createElement(
					'td',
					{ className: 'datagrid-td-rownumber' },
					React.createElement(
						'div',
						{ className: 'datagrid-cell-rownumber' },
						this.props.rownumber + 1
					)
				)
			);
		}
	});

	var View1Body = React.createClass({
		displayName: 'View1Body',

		render: function () {
			var rows = this.props.rows;
			if (rows == 0) {
				return null;
			}
			return React.createElement(
				'div',
				{ className: 'datagrid-body', style: { width: '31px', marginTop: '0px' } },
				React.createElement(
					'table',
					{ className: 'datagrid-btable', cellSpacing: '0', cellPadding: '0', border: '0' },
					React.createElement(
						'tbody',
						null,
						_.times(rows, function (i) {
							return React.createElement(View1Row, { key: 'view1-row-' + i, rownumber: i });
						})
					)
				)
			);
		}
	});

	var ViewCell = React.createClass({
		displayName: 'ViewCell',

		render: function () {
			var props = this.props,
			    column = props.column;
			return React.createElement(
				'td',
				{ field: column.field },
				React.createElement(
					'div',
					{ style: { width: column.width }, className: 'datagrid-cell' },
					props.value
				)
			);
		}
	});

	var row = function (datas, columns) {
		return _.map(datas, function (data, i) {
			return React.createElement(
				'tr',
				{ key: 'view-row-' + i, className: 'datagrid-row', style: { height: '25px' } },
				React.createElement(
					'td',
					{ className: 'datagrid-td-rownumber', style: { width: '31px' } },
					React.createElement(
						'div',
						{ className: 'datagrid-cell-rownumber' },
						i + 1
					)
				),
				_.map(columns, function (c, j) {
					return React.createElement(ViewCell, { key: 'view-cell-' + i + '-' + j, column: c, value: data[c.field] });
				})
			);
		});
	};

	var ViewBody = React.createClass({
		displayName: 'ViewBody',

		render: function () {
			return React.createElement(
				'div',
				{ className: 'datagrid-body', style: { marginTop: '0px', overflowX: 'hidden', height: '298px' } },
				React.createElement(
					'table',
					{ className: 'datagrid-btable table-hover', cellSpacing: '0', cellPadding: '0', border: '0' },
					React.createElement(
						'tbody',
						null,
						row(this.props.datas, this.props.columns)
					)
				)
			);
		}
	});

	var View = React.createClass({
		displayName: 'View',

		header: function (children, columns) {
			var list = React.Children.map(children, function (node) {
				columns.push(node.props);
				return node;
			});
			return list;
		},

		render: function () {
			var columns = [];
			return React.createElement(
				'div',
				{ className: 'datagrid-view2', style: { left: '32px' /*width: '860px'*/ } },
				React.createElement(
					'div',
					{ className: 'datagrid-header', style: { /*width: '860px',*/height: '25px' } },
					React.createElement(
						'table',
						{ className: 'datagrid-htable', border: '0', cellSpacing: '0', cellPadding: '0', style: { height: '25px' } },
						React.createElement(
							'tbody',
							null,
							React.createElement(
								'tr',
								{ className: 'datagrid-header-row' },
								React.createElement(
									'td',
									{ style: { width: '31px' } },
									React.createElement('div', { 'class': 'datagrid-header-rownumber' })
								),
								this.header(this.props.children, columns)
							)
						)
					)
				),
				React.createElement(ViewBody, { columns: columns, datas: this.props.datas }),
				React.createElement(
					'div',
					{ className: 'datagrid-footer', style: {/*width: '860px'*/} },
					React.createElement('div', { className: 'datagrid-footer-inner', style: { display: 'none' } })
				)
			);
		}
	});

	var IGrid = NS.IGrid = React.createClass({
		displayName: 'IGrid',

		getDefaultProps: function () {
			return {
				rownumbers: true,
				singleSelect: true,
				pagination: true,
				method: 'get'
			};
		},
		getInitialState: function () {
			return {
				datas: this.props.datas || []
			};
		},
		componentDidMount: function () {
			var props = this.props,
			    context = this;
			if (props.url) {
				request({
					type: props.method,
					url: props.url,
					success: function (data) {
						context.setState({
							datas: data
						});
					},
					error: function () {}
				});
			}
			//$(ReactDOM.findDOMNode(this)).datagrid(_.extend({
			//	columns: [this.columns]
			//}, _.omit(this.props, 'children')));
		},
		render: function () {
			var datas = this.state.datas;
			return React.createElement(
				'div',
				{ className: 'datagrid-wrap panel-body', title: '', style: {/*width: '893px', height: '298px'*/} },
				React.createElement(
					'div',
					{ className: 'datagrid-view', style: { /*width: '891px',*/height: '298px' } },
					React.createElement(View1, { rownumbers: this.props.rownumbers, rows: datas.length }),
					React.createElement(
						View,
						{ datas: datas },
						this.props.children
					)
				)
			);
		}
	});

	IGrid.Column = React.createClass({
		displayName: 'Column',

		//shouldComponentUpdate: function() {
		//	return false;
		//},
		render: function () {
			return React.createElement(
				'td',
				{ field: this.props.field },
				React.createElement(
					'div',
					{ className: 'datagrid-cell', style: { width: this.props.width } },
					React.createElement(
						'span',
						null,
						this.props.title
					),
					React.createElement(
						'span',
						{ className: 'datagrid-sort-icon' },
						' '
					)
				)
			);
		}
	});

	//带查询功能列表
	var QGrid = NS.QGrid = React.createClass({
		displayName: 'QGrid',

		render: function () {}
	});

	NS.Grid = React.createClass({
		displayName: 'Grid',

		getDefaultProps: function () {
			return {
				rownumbers: true,
				singleSelect: true,
				pagination: true
			};
		},
		componentDidMount: function () {
			$(ReactDOM.findDOMNode(this)).datagrid(_.extend({
				columns: [this.columns]
			}, _.omit(this.props, 'children')));
		},
		render: function () {

			this.columns = React.Children.map(this.props.children, function (node) {
				return _.omit(node.props, 'children');
			});
			return React.createElement('table', { className: 'smart easyui-datagrid' });
		}
	});

	NS.Column = React.createClass({
		displayName: 'Column',

		shouldComponentUpdate: function () {
			return false;
		},
		render: function () {
			return null;
		}
	});
})(Smart.Namespace);