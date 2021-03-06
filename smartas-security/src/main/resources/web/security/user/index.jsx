/*[[
 <script src="web/security/user/index.js"></script>
]]*/
install("web.security.user",function($S){
	var pkg = this,dataSource = pkg.dataSource,eventBus = this.eventBus;
 	this.ready = function(c){
		var UI = Smart.UI,
			Panel = UI.Panel,
			IGrid = UI.IGrid,
			Grid = UI.Grid,
			Column = UI.Column;
		var Node = React.createClass({
			render: function() {
				return <div>
						<Panel>
							<Panel.Header title="用户列表"></Panel.Header>
							<UI.Storage model="security/user">
						 		<IGrid height="256">
									<IGrid.Column field="acount" width="100">账户</IGrid.Column>
									<IGrid.Column field="email" width="100">Emai</IGrid.Column>
									<IGrid.Column field="firstname" width="200">First name</IGrid.Column>
									<IGrid.Column field="lastname" width="200">Last name</IGrid.Column>
									<IGrid.Column field="state" width="50" render={function(value){return value == 1 ? '有效':'锁定'}}>状态</IGrid.Column>
						 		</IGrid>
					 		</UI.Storage>
						</Panel>
					</div>
			}
		});
		return (Node);
	};
});
