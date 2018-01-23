$(document).ready(function(){
	var blog = $('.row .left');
	$.ajax({
		url: 'http://demo4842709.mockable.io/users',
		dataType: 'json',  
		type: 'GET',
		cache: false,
		success: function(data, status){
			$.each(data, function(index,item){
				var blogpost = '<div class="leftContainer">'
				  '<img src= "' + this.item.img + '" >'
				  '<p><span class="marginT10">'+ this.item.user +'</span> <span class="timeSpan">06:52pm</span></p>'
				  '<p>Hi There...</p></div>';
		
				blog.append(blogpost);
			});
		},

		error: function(){
			blog.text('We could not load your data, please try again.');
		}
	});
	
});