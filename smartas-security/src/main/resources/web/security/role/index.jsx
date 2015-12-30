/**[[
 
 <script src="web/security/role/role.js"></script>
 
]]**/

install("web.security.role",function($S){
	var pkg = this,dataSource = pkg.dataSource,eventBus = this.eventBus;
	var logger = Log.getLogger('web.security.role');
	var Edit = React.createClass({
			getInitialState: function() {
				return {
				};
			},
			componentWillReceiveProps : function(nextProps){
				//dataSource.get(nextProps.id)();
			},
			componentWillUnmount : function(){
				 logger.debug('Destroy Permission Tree');
				 $.fn.zTree.destroy("PermissionTree");
			},
			componentDidMount: function() {
				var context = this;
				pkg.buildTree();
				//dataSource.onGet(function(data) {
				//	context.setState(data);
				//});
			},

			render: function() {
				return <div className="panel panel-default" style={{marginTop : '5px'}}>
  						<div className="panel-heading">{this.props.name}</div>
  						<div className="panel-body" style={{padding:0,borderWidth:0,borderRightWidth:'1px',overflow:'auto',height:'380px',width:'50%'}}>
							<div className="btn-group" role="group" aria-label="..." style={{float : 'right'}}>
 	 							<button type="button" className="btn btn-default" onClick={_.bind(pkg.savePermissions,pkg,this.props.id)}>保存</button>
 	 							<button type="button" className="btn btn-default" onClick={_.bind(pkg.returnRoleList,pkg,this.props.id)}>返回</button>
							</div>
							<ul className="ztree" id="PermissionTree"></ul>
  						</div>
					</div>
			}
		}
	);
	
   	//API
   	this.reducers = function(){
		return {
			securityRole : function(role,action){
				if(action.type === 'securityRole'){
					window.console.info(action);
					return role || {securityRole : {}};
				}
				return {securityRole : {}};
			}
		}
   	};
	
	this.connect = function(createSelector){
		return {
			selector : this.selector(createSelector),
			action : this.action()
		}
	};
	//API
	//根组件
 	this.root = function(){

		var UI = Smart.UI,
			Panel = UI.Panel,
			IGrid = UI.IGrid,
			Grid = UI.Grid,
			Dialog = UI.Dialog,
			Column = UI.Column;
		var Node = React.createClass({
			getInitialState: function() {
				return {
				};
			},
			componentDidMount: function() {
				var context = this;
				eventBus.on('role.settings',function(data) {
			 		context.setState(data);
				});
			},

			render: function() {
				var context = this;
				return (<div>
  						<ul id="myTabs" className="nav nav-tabs" role="tablist">
    						<li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">列表</a></li>
    						<li role="presentation" style={{display:'none'}}><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">权限设置</a></li>
  						</ul>

  						<div className="tab-content">
    						<div role="tabpanel" className="tab-pane fade in  active" id="home">
							<Panel>
							<Panel.Header title="角色列表"></Panel.Header>
					 		<IGrid dataSource={dataSource} height="256">
								<IGrid.Column width="20" render={function(value){return <input type="checkbox"></input>}}>
									<input type="checkbox"/>
								</IGrid.Column>
								<IGrid.Column width="80" render={
									function(value){
										return (<div className="smart-btn">
												<span title="权限设置" onClick={_.bind(pkg.roleSetting,pkg,this.id,this.name)}>&nbsp;<i className="fa fa-cog"></i>&nbsp;</span>
												<span title="用户管理">&nbsp;<i className="fa fa-users" onClick={_.bind(pkg.roleUserList,context,this.id,this.name)}></i>&nbsp;</span>
												{this.defaultIn == false?<span onClick={_.bind(pkg.del,pkg,this.id)} title="删除">&nbsp;<i className="fa fa-trash-o"></i>&nbsp;</span> : null}
												</div>
												)
									}}>操作
								</IGrid.Column>
								<IGrid.Column field="name" width="150">名称</IGrid.Column>
								<IGrid.Column field="desc" width="250">描述</IGrid.Column>
								<IGrid.Column field="status" width="50" render={function(value){return value == 1 ? <div>有效</div>:'锁定'}}>状态</IGrid.Column>
					 		</IGrid>
							</Panel>
							</div>
   							<div role="tabpanel" className="tab-pane fade full-height" id="settings">
							  <Edit id={this.state.id} name={this.state.name}/>
							</div>
  						</div>
						<Dialog ref="roleUserList" />
					</div>
					);
			}
		});
		return Node;
	};

	//组件内部状态改变触发器
	this.action = function(){
		return {
		   	add : function(name){
				return {type:'add',name:name}
			},
			asyn : function(url){
				return function(dispatch){ };
			},
		}
	};
	//组件关注的状态数据
	this.selector = function(createSelector){
		function select(state) {
  			return state.securityRole
		}
    	//return createSelector(function(state){},function(state){},function(arg1,arg2){});
	};
});
