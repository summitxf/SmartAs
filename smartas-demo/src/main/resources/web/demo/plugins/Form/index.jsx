/*[[
 <script src="web/demo/plugins/Form/form.js"></script>
]]*/
install("web.demo.plugins.form",function($S){
	var logger = Log.getLogger('web.demo.plugins.form'),pkg = this,U = Smart.UI;
	var Node = React.createClass({
			render: function() {
				var linkState = _.bind(Smart.Store.linkState,this);
				return <U.Form name="test"><div className="panel panel-default" style={{marginTop : '5px'}}>
  						<div className="panel-heading" onClick={this.props.add}>Form表单元素{this.props.test}</div>
  						<div className="panel-body" style={{padding:0,borderWidth:0,borderRightWidth:'1px',overflow:'auto',height:'380px'}}>
  						<U.Radio checkedLink={linkState('test2')} readOnly={false} value='1'></U.Radio>是否发布30 <U.Radio checkedLink={linkState('test2')} readOnly={false} value='2'></U.Radio>是否发布31
  						<U.Radio checkedLink={linkState('model.test3')} uncheckable={true} readOnly={false} value='1'></U.Radio>支持取消选中
  						
  						
  						<U.Checkbox checkedLink={linkState('model.test4')} uncheckable={true} readOnly={false} value='1'></U.Checkbox>支持取消选中4
  						<U.Button onClick={function(){alert(this.value)}} disabled={false} value='支持取消选中'></U.Button>
  						</div>
					</div></U.Form>
			}
		}
	);
	
	// 组件内部状态改变触发器
	//API
	this.actions = {
	   	add : function(name){
			return {type:'DATE_CLICK',name:name}
		},
		asyn : function(url){
			return function(dispatch){ };
		}
	};
	// API
	this.ready = function(connect){
		//return connect(this.actions)(Node);
		return Node;
	};
   	// API
   	this.reducers = function(){
   		return {
   			DATE_CLICK : function(data,action){
   				return data.set('test',Date.now());
   			}
   		}
   	};
});
