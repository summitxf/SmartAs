$(function() {
	$.ajaxSetup({
		dataType : "json",
		contentType : "application/json",
	});

	var context = "";

	$("#logout").click(function() {
		$.ajax({
			type : 'post',
			url : "services/security/logout",
			success : function(data) {
				location.reload();
			},
			error : function() {
				location.reload();
			}
		});
	});

	$("#login_bnt").click(function() {
		var data = $("#login_form").form2json();
		// $("#info").hide();
		$.ajax({
			type : 'post',
			url : "services/security/login",
			data : JSON.stringify(data),
			success : function(data) {
				if (data.status == 200) {// 登录成功
					context = data.context;
					window.location = data.context + "/#!" + data.home;
				} else if (data.status == 400) {// 账号密码错误
					$("#info").text("账号不存在或密码错误").show();
				} else {// 其他情况
					$("#info").text("服务器忙,稍后再试").show();
				}
			},
			error : function() {
				$("#info").text("服务器忙,稍后再试").show();
			}
		});
	});
});