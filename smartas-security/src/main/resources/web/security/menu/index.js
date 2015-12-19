//# sourceURL=web/security/menu/index.js
install('web.security.menu', function($S) {
	var logger = Log.getLogger('web.security.menu');
	var request = Smart.Resource.ajax,eventBus = this.eventBus;
	this.create = function(event) {
		eventBus.fire('menu.tree', {
			name : '',
			id : '',
			parentId : this.id
		});
	}

	this.update = function(event) {
		event.preventDefault();
		var zTree = $.fn.zTree.getZTreeObj("siteMap_tree"), 
		node = zTree.getSelectedNodes()[0], 
			data = this, 
			isCreate = !data.id;
		request({
			type : isCreate ? 'post' : 'put',
			url : "services/security/menu/single",
			data : this,
			dataType : "json",
			contentType : "application/json",
			success : function(id) {
				if (isCreate) {
					var nodes = zTree.addNodes(node, [ {
						id : id,
						name : data.name
					}]);
					zTree.selectNode(nodes[0]);
					data.id=id;
					eventBus.fire('menu.tree', data);
				} else {
					node.name = data.name;
					zTree.updateNode(node);
				}

			},
			error : function(data) {
				logger.error('错误响应');
			}
		});
	};

	this.buildTree = function() {
		var setting = {
			async : {
				enable : true,
				type : 'get',
				url : "services/security/menu/list",
				dataFilter : function(treeId, parentNode, responseData) {

					if (responseData) {
						for (var i = 0; i < responseData.length; i++) {
							var data = responseData[i];
							data.id < 3 && (responseData[i].open = true);
						}

						responseData.push({
							name : 'Root',
							id : 0,
							open : true
						})
					}

					return responseData
				}
			},

			view : {
				dblClickExpand : false,
				showLine : false,
				addDiyDom : addDiyDom
			},
			data : {
				key : {
					url : ''
				},
				simpleData : {
					enable : true,
					idKey : "id",
					pIdKey : "parentId",
					rootPId : 0
				}
			},
			callback : {
				onClick : onClick
			}
		};

		function addDiyDom(treeId, treeNode) {
			if (treeNode.level < 2) {
				var id = treeNode.tId;
				var switchObj = $S("#" + id + "_switch");
				switchObj.css({
					visibility : 'hidden',
					width : 1
				});
			}
		}

		function onClick(e, treeId, treeNode) {
			if (treeNode.level < 1) {
				eventBus.fire('menu.tree', {
					id : 0
				});
				return;
			}
			request({
				type : 'get',
				url : "services/security/menu/single/{0}".format(treeNode.id),
				success : function(data) {
					eventBus.fire('menu.tree', data || {
						id : null
					});
				},
				error : function() {
					eventBus.fire('menu.tree', {
						id : null
					});
				}
			});
		}

		// $(document).ready(function(){
		$.fn.zTree.init($S("#siteMap_tree"), setting);
		// });
	}
});