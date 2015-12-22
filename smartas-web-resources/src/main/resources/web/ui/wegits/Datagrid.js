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
						'div',
						{ className: 'datagrid-header-inner' },
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
					)
				),
				React.createElement(View1Body, { rows: this.props.rows, height: this.props.height }),
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
				{ className: 'datagrid-body', style: { width: '31px', marginTop: '0px', height: this.props.height - 26 } },
				React.createElement(
					'div',
					{ className: 'datagrid-body-inner' },
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
				_.map(columns, function (c, j) {
					var value = c.render.call(data, data[c.field]);
					return React.createElement(ViewCell, { key: 'view-cell-' + i + '-' + j, column: c, value: value });
				})
			);
		});
	};

	var ViewBody = React.createClass({
		displayName: 'ViewBody',

		render: function () {
			return React.createElement(
				'div',
				{ className: 'datagrid-body', onScroll: this.props.bodyScroll, style: { marginTop: '0px', overflowX: 'auto', height: this.props.height - 26 } },
				React.createElement(
					'table',
					{ className: 'datagrid-btable table-hover', cellSpacing: '0', cellPadding: '0', border: '0' },
					React.createElement(
						'tbody',
						null,
						row(this.props.data, this.props.columns)
					)
				)
			);
		}
	});

	var View = React.createClass({
		displayName: 'View',

		getColumnsInfo: function (list) {
			var cl = IGrid.Column;
			return React.Children.map(list, function (node) {
				return _.chain(node.props).pick(cl.props).defaults(cl.defaults).value();
			});
		},

		getInitialState: function () {
			return {
				columns: this.getColumnsInfo(this.props.children)
			};
		},

		render: function () {
			var columns = [];
			return React.createElement(
				'div',
				{ className: 'datagrid-view2', style: { left: '32px', right: 0 } },
				React.createElement(
					'div',
					{ className: 'datagrid-header', style: { height: '25px' } },
					React.createElement(
						'div',
						{ className: 'datagrid-header-inner' },
						React.createElement(
							'table',
							{ className: 'datagrid-htable', border: '0', cellSpacing: '0', cellPadding: '0', style: { height: '25px' } },
							React.createElement(
								'tbody',
								null,
								React.createElement(
									'tr',
									{ className: 'datagrid-header-row' },
									this.props.children
								)
							)
						)
					)
				),
				React.createElement(ViewBody, { bodyScroll: this.props.bodyScroll, columns: this.state.columns, data: this.props.data, height: this.props.height }),
				React.createElement(
					'div',
					{ className: 'datagrid-footer', style: {/*width: '860px'*/} },
					React.createElement('div', { className: 'datagrid-footer-inner', style: { display: 'none' } })
				)
			);
		}
	});

	var Pagination = React.createClass({
		displayName: 'Pagination',

		refresh: function () {
			this.props.dataSource.refresh();
		},

		render: function () {
			var props = this.props,
			    length = props.length,
			    page = props.page,
			    pageSize = props.pageSize;
			size = Math.ceil(length / pageSize) || 1;
			return React.createElement(
				'div',
				{ className: 'datagrid-pager pagination' },
				React.createElement(
					'table',
					{ cellSpacing: '0', cellPadding: '0', border: '0' },
					React.createElement(
						'tbody',
						null,
						React.createElement(
							'tr',
							null,
							React.createElement(
								'td',
								null,
								React.createElement(
									'select',
									{ className: 'pagination-page-list', onChange: this.refresh },
									React.createElement(
										'option',
										null,
										'10'
									),
									React.createElement(
										'option',
										null,
										'20'
									),
									React.createElement(
										'option',
										null,
										'30'
									),
									React.createElement(
										'option',
										null,
										'40'
									),
									React.createElement(
										'option',
										null,
										'50'
									)
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement('div', { className: 'pagination-btn-separator' })
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'a',
									{ href: 'javascript:void(0)', className: 'l-btn l-btn-small l-btn-plain l-btn-disabled l-btn-plain-disabled' },
									React.createElement(
										'span',
										{
											className: 'l-btn-left l-btn-icon-left' },
										React.createElement(
											'span',
											{ className: 'l-btn-text l-btn-empty' },
											' '
										),
										' ',
										React.createElement(
											'span',
											{
												className: 'l-btn-icon pagination-first' },
											' '
										)
									)
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'a',
									{ href: 'javascript:void(0)', className: 'l-btn l-btn-small l-btn-plain l-btn-disabled l-btn-plain-disabled' },
									React.createElement(
										'span',
										{
											className: 'l-btn-left l-btn-icon-left' },
										React.createElement(
											'span',
											{ className: 'l-btn-text l-btn-empty' },
											' '
										),
										React.createElement(
											'span',
											{
												className: 'l-btn-icon pagination-prev' },
											' '
										)
									)
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement('div', { className: 'pagination-btn-separator' })
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'span',
									{ style: { paddingLeft: '6px' } },
									'第'
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement('input', { className: 'pagination-num', type: 'text', value: page, onChange: this.refresh, size: '2' })
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'span',
									{ style: { paddingRight: '6px' } },
									'共',
									size,
									'页'
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement('div', { className: 'pagination-btn-separator' })
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'a',
									{ href: 'javascript:void(0)', className: 'l-btn l-btn-small l-btn-plain' },
									React.createElement(
										'span',
										{
											className: 'l-btn-left l-btn-icon-left' },
										React.createElement(
											'span',
											{ className: 'l-btn-text l-btn-empty' },
											' '
										),
										React.createElement(
											'span',
											{
												className: 'l-btn-icon pagination-next' },
											' '
										)
									)
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'a',
									{ href: 'javascript:void(0)', className: 'l-btn l-btn-small l-btn-plain' },
									React.createElement(
										'span',
										{
											className: 'l-btn-left l-btn-icon-left' },
										React.createElement(
											'span',
											{ className: 'l-btn-text l-btn-empty' },
											' '
										),
										React.createElement(
											'span',
											{
												className: 'l-btn-icon pagination-last' },
											' '
										)
									)
								)
							),
							React.createElement(
								'td',
								null,
								React.createElement('div', { className: 'pagination-btn-separator' })
							),
							React.createElement(
								'td',
								null,
								React.createElement(
									'a',
									{ href: 'javascript:void(0)', onClick: this.refresh, className: 'l-btn l-btn-small l-btn-plain' },
									React.createElement(
										'span',
										{
											className: 'l-btn-left l-btn-icon-left' },
										React.createElement(
											'span',
											{ className: 'l-btn-text l-btn-empty' },
											' '
										),
										React.createElement(
											'span',
											{
												className: 'l-btn-icon pagination-load' },
											' '
										)
									)
								)
							)
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'pagination-info' },
					'显示',
					(page - 1) * pageSize + 1,
					'到',
					page * pageSize,
					',共',
					length,
					'记录'
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
				method: 'get',
				height: 298
			};
		},
		getInitialState: function () {
			return {
				page: 1,
				pageSize: 10,
				length: 0,
				data: this.props.data || []
			};
		},

		load: function () {
			var props = this.props,
			    dataSource = this.props.dataSource,
			    context = this,
			    url = props.url;

			var list = !props.pagination ? dataSource.listAll() : dataSource.listPage(this.state.page, this.state.pageSize);

			list();
		},

		componentDidMount: function () {
			var props = this.props,
			    dataSource = this.props.dataSource,
			    context = this;
			dataSource.onRefresh(function (data) {
				context.load();
			}).onList(function (data) {
				var pageable = data;
				if (!props.pagination) {
					pageable = {
						data: data
					};
				}
				context.setState(pageable);
			});
			context.load();
		},
		bodyScroll: function () {

			var iGrid = $(ReactDOM.findDOMNode(this)),
			    view1 = iGrid.find("div.datagrid-view1"),
			    view2 = iGrid.find("div.datagrid-view2"),
			    body1 = view1.find("div.datagrid-body"),
			    body2 = view2.find("div.datagrid-body");

			body1.scrollTop(body2.scrollTop());
			var c1 = body1.children(":first");
			var c2 = body2.children(":first");
			if (c1.length && c2.length) {
				var _85 = c1.offset().top;
				var _86 = c2.offset().top;
				if (_85 != _86) {
					body1.scrollTop(body1.scrollTop() + _85 - _86);
				}
			}
			view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft(body2._scrollLeft());
			body2.children("table.datagrid-btable-frozen").css("left", -body2._scrollLeft());
		},
		render: function () {
			var data = this.state.data,
			    height = this.props.height,
			    viewHeight = height - (this.props.pagination ? 31 : 0);
			return React.createElement(
				'div',
				{ className: 'datagrid-wrap panel-body', style: { height: height } },
				React.createElement(
					'div',
					{ className: 'datagrid-view', style: { height: viewHeight } },
					React.createElement(View1, { rownumbers: this.props.rownumbers, rows: data.length, height: viewHeight }),
					React.createElement(
						View,
						{ data: data, height: viewHeight, bodyScroll: this.bodyScroll },
						this.props.children
					)
				),
				React.createElement(Pagination, { dataSource: this.props.dataSource, page: this.state.page, pageSize: this.state.pageSize, length: this.state.length })
			);
		}
	});

	IGrid.Column = React.createClass({
		displayName: 'Column',

		statics: {
			props: ['field', 'render', 'width', 'operation'],
			defaults: {
				render: _.identity
			}
		},
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
						this.props.children
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