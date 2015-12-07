$(function() {
	var curMenu = null, zTree_Menu = null;
	var setting = {
		view : {
			showLine : false,
			showIcon : false,
			selectedMulti : false,
			dblClickExpand : false,
			addDiyDom : addDiyDom
		},
		data : {
			simpleData : {
				enable : true
			}
		},
		callback : {
			beforeClick : beforeClick
		}
	};

	var zNodes = [ {
		id : 1,
		pId : 0,
		url : '#!web/demo/Dashboard.html',
		target : "_self",
		iconClass : 'fa fa-home',
		name : "首页"
	}, {
		id : 2,
		pId : 0,
		name : "页面模块"
	}, {
		id : 13,
		pId : 2,
		name : "个人资料"
	}, {
		id : 14,
		pId : 2,
		name : "帮助页面"
	}, {
		id : 15,
		pId : 2,
		name : "相册页面"
	}, {
		id : 16,
		pId : 2,
		name : "系统日志"
	}, {
		id : 17,
		pId : 2,
		name : "404"
	}, {
		id : 11,
		pId : 2,
		name : "收件箱"
	}, {
		id : 111,
		pId : 11,
		name : "收件箱1"
	}, {
		id : 112,
		pId : 111,
		name : "收件箱2"
	}, {
		id : 113,
		pId : 112,
		name : "收件箱3"
	}, {
		id : 114,
		pId : 113,
		name : "收件箱4"
	}, {
		id : 3,
		pId : 0,
		name : "系统管理"
	}, {
		id : 31,
		pId : 3,
		target : "_self",
		url : '#!web/security/menu/index.html',
		name : "菜单管理"
	}, {
		id : 32,
		pId : 3,
		name : "照片"
	}, {
		id : 4,
		pId : 2,
		name : "开发",
	}, {
		id : 41,
		pId : 4,
		name : "Demo",
	}, {
		id : 411,
		pId : 41,
		name : "Grid",
		target : "_self",
		url : '#!web/demo/bootstrap/grid/index.html'
	} ];

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
	$.fn.zTree.init(treeObj, setting, zNodes);
	zTree_Menu = $.fn.zTree.getZTreeObj("main_menu");
	
	
	
	
	$("#navbar-fullscreen").click(function(){
		$("[fullscreen]").each(function(){
			var self = $(this);
			if(self.hasClass("container")){
				self.removeClass("container");
			}else{
				self.addClass("container");
			}
		});
	});
});
