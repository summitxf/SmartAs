//# sourceURL=web/demo/ztree.js
install('demo.admin.ztree', function(pkg, context) {
	var logger = Log.getLogger('demo.admin.ztree');
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
		name : "文件夹",
		open : true
	}, {
		id : 11,
		pId : 1,
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
		id : 12,
		pId : 1,
		name : "垃圾邮件"
	}, {
		id : 13,
		pId : 1,
		name : "草稿"
	}, {
		id : 14,
		pId : 1,
		name : "已发送邮件"
	}, {
		id : 15,
		pId : 1,
		name : "已删除邮件"
	}, {
		id : 3,
		pId : 0,
		name : "快速视图"
	}, {
		id : 31,
		pId : 3,
		name : "文档"
	}, {
		id : 32,
		pId : 3,
		name : "照片"
	} ];

	function addDiyDom(treeId, treeNode) {
		var spaceWidth = 5;
		var switchObj = $("#" + treeNode.tId + "_switch"), icoObj = $("#"
				+ treeNode.tId + "_ico");
		switchObj.remove();
		icoObj.before(switchObj);

		if (treeNode.level > 1) {
			//var spaceStr = "<span style='display: inline-block;width:"
			//		+ (spaceWidth * treeNode.level) + "px'></span>";
			//switchObj.before(spaceStr);
		}
	}

	function beforeClick(treeId, treeNode) {
		if (treeNode.level == 0) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.expandNode(treeNode);
			return false;
		}
		return true;
	}

	pkg.ready = function() {
		var treeObj = $("#treeDemo");
		$.fn.zTree.init(treeObj, setting, zNodes);
		zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");
		curMenu = zTree_Menu.getNodes()[0].children[0].children[0];
		zTree_Menu.selectNode(curMenu);

		treeObj.hover(function() {
			if (!treeObj.hasClass("showIcon")) {
				treeObj.addClass("showIcon");
			}
		}, function() {
			treeObj.removeClass("showIcon");
		});
	}
});