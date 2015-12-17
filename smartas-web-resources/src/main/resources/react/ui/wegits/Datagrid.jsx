+ function(Namespace) {
	var NS = Namespace.register("Smart.UI"),
		request = Smart.Resource.ajax;

	NS.Hello = React.createClass({
		render: function() {
			return <div>Hello {this.props.name}</div>;
		}
	});

	var PanelTools = React.createClass({
		//shouldComponentUpdate: function() {
		//	return false;
		//collapsible:true,minimizable:true,maximizable:true,closable:true
		//},var
		render: function() {
			var tools = [],
				props = this.props;
			props.collapsible && tools.push('collapse');
			props.minimizable && tools.push('min');
			props.maximizable && tools.push('max');
			props.closable && tools.push('close');
			return (<div className="panel-tool">
						{
							_.map(tools,function(value){
								return (<a href="javascript:void(0)" className={'panel-tool-' + value}/>);
							})
						}
			  		</div>);
		}
	});


	var Panel = NS.Panel = React.createClass({
		//shouldComponentUpdate: function() {
		//	return false;
		//},
		render: function() {
			return (<div className="smart panel">
				 {this.props.children} 
			  </div>);
		}
	});


	Panel.Header = React.createClass({
		//shouldComponentUpdate: function() {
		//	return false;
		//},
		render: function() {
			return (<div className="panel-header">
					<div className="panel-title">{this.props.title}</div>
					<PanelTools {...this.props}/>
				</div>)
		}
	});


	var View1 = React.createClass({

		render: function() {
			var props = this.props;
			if (!props.rownumbers) {
				return null;
			}
			return (
				<div className="datagrid-view1" style={{width: '31px'}}>
					<div className="datagrid-header" style={{width: '31px',height: '25px'}}>
						<table className="datagrid-htable" border="0" cellSpacing="0" cellPadding="0" style={{height: '25px'}}>
							<tbody>
								<tr className="datagrid-header-row">
									<td rowSpan="0"><div className="datagrid-header-rownumber"></div></td>
								</tr>
							</tbody>
						</table>
					</div>
					<View1Body rows={this.props.rows}/>
					<div className="datagrid-footer" style={{width: '31px'}}>
						<div className="datagrid-footer-inner" style={{display: 'none'}}></div>
			  		</div>
				</div>
			);
		}
	});

	var View1Row = React.createClass({

		render: function() {
			return (
				<tr className="datagrid-row" style={{height: '25px'}}>
					<td className="datagrid-td-rownumber">
						<div className="datagrid-cell-rownumber">{this.props.rownumber + 1}</div>
					</td>
				</tr>
			);
		}
	});

	var View1Body = React.createClass({

		render: function() {
			var rows = this.props.rows;
			if (rows == 0) {
				return null;
			}
			return (
				<div className="datagrid-body" style={{width: '31px', marginTop: '0px'}} >						
					<table className="datagrid-btable" cellSpacing="0" cellPadding="0" border="0">
						<tbody>
							{_.times(rows,function(i){return <View1Row key={'view1-row-' + i} rownumber={i}/>})}
						</tbody>
					</table>
				</div>
			);
		}
	});

	var ViewCell = React.createClass({

		render: function() {
			var props = this.props,
				column = props.column;
			return (<td field={column.field}>
						<div style={{width : column.width}} className="datagrid-cell">{props.value}</div>
					</td>);
		}
	});

	var row = function(datas, columns) {
		return _.map(datas, function(data, i) {
			return (
				<tr key={'view-row-' + i} className="datagrid-row" style={{height: '25px'}}>
				<td className="datagrid-td-rownumber" style={{width: '31px'}}>
						<div className="datagrid-cell-rownumber">{i + 1}</div>
				</td>
				{_.map(columns,function(c,j){return <ViewCell key={'view-cell-' + i + '-' + j} column={c} value={data[c.field]}/>})}
				</tr>);
		});
	};

	var ViewBody = React.createClass({
		render: function() {
			return (
				<div className="datagrid-body" style={{marginTop: '0px', overflowX: 'hidden',height: '298px'}}>
				<table className="datagrid-btable table-hover" cellSpacing="0" cellPadding="0" border="0">
					<tbody>
						{row(this.props.datas,this.props.columns)}	
					</tbody>
				</table>
			</div>
			);
		}
	});

	

	var View = React.createClass({

		header: function(children, columns) {
			var list = React.Children.map(children, function(node) {
				columns.push(node.props);
				return node;
			})
			return list;
		},

		render: function() {
			var columns = [];
			return (
				<div className="datagrid-view2" style={{left: '32px'/*width: '860px'*/}}>
					<div className="datagrid-header" style={{/*width: '860px',*/ height: '25px'}}>								 
						<table className="datagrid-htable" border="0" cellSpacing="0" cellPadding="0" style={{height: '25px'}}>
							<tbody>
								<tr className="datagrid-header-row">
								<td style={{width: '31px'}}><div class="datagrid-header-rownumber"></div></td>
									{
										this.header(this.props.children,columns)
									}
								</tr>
							</tbody>
						</table>
					</div>
					<ViewBody columns={columns} datas={this.props.datas}/>
					<div className="datagrid-footer" style={{/*width: '860px'*/}}>
						<div className="datagrid-footer-inner" style={{display: 'none'}}></div>
					</div>
				</div>
			);
		}
	});


	var IGrid = NS.IGrid = React.createClass({

		getDefaultProps: function() {
			return {
				rownumbers: true,
				singleSelect: true,
				pagination: true,
				method: 'get'
			};
		},
		getInitialState: function() {
			return {
				datas: this.props.datas || [],
			};
		},
		componentDidMount: function() {
			var props = this.props,
				context = this;
			if (props.url) {
				request({
					type: props.method,
					url: props.url,
					success: function(data) {
						context.setState({
							datas: data
						});
					},
					error: function() {

					}
				});
			}
			//$(ReactDOM.findDOMNode(this)).datagrid(_.extend({
			//	columns: [this.columns]
			//}, _.omit(this.props, 'children')));
		},
		render: function() {
			var datas = this.state.datas;
			return (
				<div className="datagrid-wrap panel-body" title="" style={{/*width: '893px', height: '298px'*/}}>
					<div className="datagrid-view" style={{/*width: '891px',*/ height: '298px'}}>
						<View1 rownumbers={this.props.rownumbers} rows={datas.length}/>
						<View datas={datas}>
							{this.props.children}
						</View>
					</div>
				</div>
			);
		}
	});

	IGrid.Column = React.createClass({
		//shouldComponentUpdate: function() {
		//	return false;
		//},
		render: function() {
			return (<td field={this.props.field}>
					<div className="datagrid-cell" style={{width : this.props.width}}>
						<span>{this.props.title}</span><span className="datagrid-sort-icon">&nbsp;</span>
					</div></td>);
		}
	});


	//带查询功能列表
	var QGrid = NS.QGrid = React.createClass({
		render: function() {

		}
	});



	NS.Grid = React.createClass({

		getDefaultProps: function() {
			return {
				rownumbers: true,
				singleSelect: true,
				pagination: true
			};
		},
		componentDidMount: function() {
			$(ReactDOM.findDOMNode(this)).datagrid(_.extend({
				columns: [this.columns]
			}, _.omit(this.props, 'children')));
		},
		render: function() {

			this.columns = React.Children.map(this.props.children, function(node) {
				return _.omit(node.props, 'children');
			});
			return <table className="smart easyui-datagrid"></table>;
		}
	});

	NS.Column = React.createClass({
		shouldComponentUpdate: function() {
			return false;
		},
		render: function() {
			return null;
		}
	});
}(Smart.Namespace)