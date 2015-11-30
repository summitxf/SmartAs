$(function(){
	$.ajaxSetup({
		dataType: "json",
		contentType: "application/json",
	});
	$("#login_bnt").click(function(){
		var data = $("#login_form").form2json();
		$.post("services/security/login",JSON.stringify(data),function(data){
			if(data.status == 200){
				window.location = data.context + "/#!" + data.home;
			}
		});
	})
});