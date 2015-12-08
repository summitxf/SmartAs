$(function() {
	var curMenu = null, zTree_Menu = null;

	var setting = {
		async : {
			enable : true,
			type : 'get',
			url : "services/security/menu/navbar",
			dataFilter : function(treeId, parentNode, responseData) {
				var url = Smart.Resource.getCurrentUrl(), currentNode = null,list = [];
				var buildTree = function(data, parent) {
					var result = [], id = (parent ? parent.id : 0);
					$.each(data, function(i, menu) {
						if (menu.parentId == id) {
							list.push(menu);
							var node = {
								id : menu.id,
								node : menu,
								parent : parent
							}
							if (menu.url == url) {
								currentNode = node;
							}
							menu.target = '_self';
							result.push(node);
						}
					});
					$.each(result, function(i, node) {
						node.child = buildTree(data, node)
					});
					return result;
				};
				var root = buildTree(responseData);
				
				while (currentNode) {
					currentNode.node.open = true;
					currentNode = currentNode.parent;
				}
				return list;
			}
		},
		view : {
			expandSpeed : 'normal',
			showLine : false,
			showIcon : false,
			selectedMulti : false,
			dblClickExpand : false,
			addDiyDom : addDiyDom
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
			beforeClick : beforeClick,
			onNodeCreated: onMenuCreated
		}
	};

	function onMenuCreated(event, treeId, treeNode) {
		if(treeNode.url === Smart.Resource.getCurrentUrl()){
			zTree_Menu.selectNode(treeNode);
		}
	}

	function addDiyDom(treeId, treeNode) {
		var spaceWidth = 14, id = treeNode.tId;
		var switchObj = $("#" + id + "_switch"), spanObj = $("#" + id + "_span");
		switchObj.remove();
		switchObj.before("<i class='fa fa-home'></i>")

		spanObj.before(switchObj);
		if (treeNode.level > 0) {
			spanObj.parent().css('padding-left',
					10 + (spaceWidth * treeNode.level) + 'px');
		}
		// treeNode.iconClass && $("#" + id + "_ico").before("<i class='" +
		// treeNode.iconClass +"'></i>");;
	}

	function beforeClick(treeId, treeNode) {
		zTree_Menu.expandNode(treeNode);
		return true;
	}

	var treeObj = $("#main_menu");
	$.fn.zTree.init(treeObj, setting);
	zTree_Menu = $.fn.zTree.getZTreeObj("main_menu");

	$("#navbar-fullscreen").click(function() {
		$("[fullscreen]").each(function() {
			var self = $(this);
			if (self.hasClass("container")) {
				self.removeClass("container");
			} else {
				self.addClass("container");
			}
		});
	});
});
