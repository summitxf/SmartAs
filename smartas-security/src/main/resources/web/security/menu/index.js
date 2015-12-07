//# sourceURL=web/security/menu/index.js
install('web.security.menu', function(pkg, dispatcher, $S) {
	var logger = Log.getLogger('web.security.menu');

	pkg.buildTree = function() {
		var setting = {
			async : {
				enable : true,
				type : 'get',
				url : "services/security/menu/list",
			},

			view : {
				dblClickExpand : false,
				showLine : false
			},
			data : {
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

		function onClick(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("siteMap_tree");
			zTree.expandNode(treeNode);
			$.ajax({
				type : 'get',
				url : "services/security/menu/single/{0}".format(treeNode.id),
				success : function(data) {
					dispatcher.fire('menu.tree', data);
				},
				error : function() {
					dispatcher.fire('menu.tree', {});
				}
			});
		}

		// $(document).ready(function(){
		$.fn.zTree.init($S("#siteMap_tree"), setting);
		// });
	}
});