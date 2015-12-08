//# sourceURL=web/security/menu/index.js
install('web.security.menu', function(pkg, dispatcher, $S) {
	var logger = Log.getLogger('web.security.menu');
	var request = Smart.Resource.ajax;
	pkg.create = function(event) {

		dispatcher.fire('menu.tree', {
			name : '',
			id : '',
			parentId : this.id
		});
	}

	pkg.update = function(event) {
		event.preventDefault();
		var zTree = $.fn.zTree.getZTreeObj("siteMap_tree");
		var node = zTree.getSelectedNodes()[0];
		node.name = this.name;
		request({
			type : this.id ? 'put' : 'post',
			url : "services/security/menu/single",
			data : JSON.stringify(this),
			dataType : "json",
			contentType : "application/json",
			success : function(data) {
				zTree.updateNode(node);
				//alert('成功');
			},
			error : function(data) {
				alert('失败');
			}
		});
	};

	pkg.buildTree = function() {
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
			if (treeNode.level == 0) {
				var id = treeNode.tId;
				var switchObj = $S("#" + id + "_switch");
				switchObj.css({
					visibility : 'hidden',
					width : 1
				});
				var ulObj = $S("#" + id + "_ul");
				ulObj.css({
					padding : 0,
					background : 'none'
				});
			}
		}

		function onClick(e, treeId, treeNode) {
			if (treeNode.level < 1) {
				dispatcher.fire('menu.tree', {
					id : 0
				});
				return;
			}
			request({
				type : 'get',
				url : "services/security/menu/single/{0}".format(treeNode.id),
				success : function(data) {
					dispatcher.fire('menu.tree', data || {
						id : null
					});
				},
				error : function() {
					dispatcher.fire('menu.tree', {
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