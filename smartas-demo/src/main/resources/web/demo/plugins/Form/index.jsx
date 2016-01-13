/*[[
 <script src="web/demo/plugins/Form/form.js"></script>
]]*/
install("web.demo.plugins.form",function($S){
	var logger = Log.getLogger('web.demo.plugins.form'),pkg = this,U = Smart.UI;
	var Node = React.createClass({
			getInitialState: function() {
				return {
				};
			},
			componentWillReceiveProps : function(nextProps){
				// dataSource.get(nextProps.id)();
			},
			componentWillUnmount : function(){
				 logger.debug('Destroy Permission Tree');
				 $.fn.zTree.destroy("PermissionTree");
			},
			componentDidMount: function() {
				var context = this;
				pkg.buildTree();
				// dataSource.onGet(function(data) {
				// context.setState(data);
				// });
			},

			render: function() {
				return <U.Form name="test"><div className="panel panel-default" style={{marginTop : '5px'}}>
  						<div className="panel-heading" onClick={this.props.add}>Form表单元素{this.props.test}</div>
  						<div className="panel-body" style={{padding:0,borderWidth:0,borderRightWidth:'1px',overflow:'auto',height:'380px'}}>
  						<U.Radio name='test2' readonly={false} value='1'></U.Radio>是否发布30 <U.Radio name='test2' readonly={false} value='2'></U.Radio>是否发布31
  						<U.Radio name='test3' uncheckable={true} readonly={false} value='1'></U.Radio>支持取消选中
  						</div>
					</div></U.Form>
			}
		}
	);
	
	// 组件内部状态改变触发器
	var actions = {
	   	add : function(name){
			return {type:'add',name:name}
		},
		asyn : function(url){
			return function(dispatch){ };
		}
	};
	// API
	this.ready = function(connect){
		return connect(actions)(Node);
		// return Node;
	};
   	// API
   	this.reducers = function(){
		return function(data,action){
				if(action.type === 'securityRole'){
					window.console.info(action);
					return data || {securityRole : {}};
				}
				if(action.type === 'add'){
					return _.extend({},data,{test : Date.now()});
				}
				return data;
			}
   	};
});
