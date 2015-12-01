(function($){
	
	//寻找开源的方案
	// Bind an event handler.
	$(window).hashchange(function(e) {
	  var hash = location.hash;
	  //console.log(hash);
	  hash&&(function(url){
		  url && $.ajax({
				type : 'get',
				url : url,
				dataType:'html',
				success : function(data) {
					 $("#content").html(data)
				},
				error : function() {
					 
				}
			});
	  })(hash.substr(2));
	});
	
	$(window).hashchange();
})($);
