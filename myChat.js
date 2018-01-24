$(document).ready(function(){
	var blog = $('.row > .left');
	$.ajax({
		url: 'http://demo4842709.mockable.io/users',
		dataType: 'html', 
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		cache: false,
		success: function(data, status){
			data = data.replace(/\s+/g, ' ').toLowerCase();
			data = JSON.parse(data);
			$.each(data, function(index,item){
				var user = getUser(item)
				$('#myId').append(user);
			});
		},

		error: function(pp){
			alert("error");
			console.log(pp);
			blog.text('We could not load your data, please try again.');
		}
	});
	
	function getUser(item){
		var blogpost = "<div class='leftContainer'>" 
		   + "<img src= '" + item.img + "' >"
		   + "<p><span class='marginT10'>"+ item.user +"</span> <span class='timeSpan'>06:52pm</span></p>" 
		   + "<p>Hi There...</p></div>";
		return blogpost;
	}
	
	function getMessages(item){
		var messageList = "<div class='container'>"
		 + "<img src='mypic1.jpg' alt='Avatar'>"
		 + "<p><span class='rightSpanMsg'>Hello. How are you today?</span></p>"
		 + "<p><span class='time'>11:00 am</span></p></div>"
		return messageList;
	}
	
});