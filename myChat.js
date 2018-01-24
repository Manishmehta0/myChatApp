$(document).ready(function(){	
	$.ajax({
		url: 'http://demo4842709.mockable.io/users',
		dataType: 'html', 
		type: 'GET',
		cache: false,
		success: function(data, status){
			data = data.replace(/\s+/g, ' ');
			data = JSON.parse(data);
			users = data;
			$.each(data, function(index,item){
				// setting each user
				var user = getUser(item)
				$('#myId').append(user);
				
				//setting msg for each user
				$('#messages').append(getMessages(item));
				
			});
			
			// bind click event
			bindUserMessageClickEvent();
			
			// on start click first user
			$("div.leftContainer").eq(0).click();
		},

		error: function(){
			blog.text('We could not load your data, please try again.');
		}
	});
});

var users;

function getUser(item){
	var blogpost = "<div class='leftContainer' id='user_" +item.id+ "' >" 
	   + "<img src= '" + item.img + "' >"
	   + "<p><span class='marginT10'>"+ item.user +"</span> <span class='timeSpan'>06:52pm</span></p>" 
	   + "<p>Hi There...</p></div>";
	return blogpost;
}
	
function getMessages(item){
	var messagesBlock = "<div class='messageBlock' id='messages_user_"+item.id+"' style='display:none'>";
	if(item.messages.length != 0){
		$.each(item.messages, function(index, msg){
			
			console.log(msg); 
			var floatRight = "";
			if(msg.createdBy == 0){
				floatRight = "floatRight";
			}
			var userImg = getImage(msg.createdBy);
			console.log(userImg);
			messagesBlock = messagesBlock + getMessage(userImg, msg.text, msg.created, floatRight);
		});
	}
	messagesBlock = messagesBlock + "</div>"
	return messagesBlock;
}
	
function getMessage(img, msg, time, floatRight){
	return "<div class='container "+floatRight+"'>"
		 + "<img src='"+ img +"' alt='Avatar'>"
		 + "<p><span class='rightSpanMsg'>"+msg+"</span></p>"
		 + "<p><span class='time'>"+time+"</span></p></div>";
}
	
function getImage(id){
	
	console.log("user id " + id);
	var imgSrc = "";;
	//In case of current user, 0 indiates current user
	
	if(id == 0){
		imgSrc = "mypic1.jpg";
	}
	$.each(users, function(index, item){
		if(item.id == id){
			imgSrc = item.img;
		}
	});
	
	if( imgSrc != ""){
		return imgSrc;
	}else{
		//In case user Id not found
		return "Nun.jpg";
	}
}
	
function bindUserMessageClickEvent(){
	$("div.leftContainer").each(function(){
		var curDiv = $(this);
		$(this).click(function(){
			
			//close all messages block before open current block
			$("#messages").find("div.messageBlock").slideUp();
			
			var divId = $(curDiv).attr("id");
			var msgBlockId = "messages_" + divId;
			$("#"+msgBlockId).slideDown();
		});
		
	});
	
}
	
function sendMessage(){
		
	// check for empty string in message
	if($.trim($('#newMsg').val()) == ""){
		return;
	}
	$("div.messageBlock:visible").append(getMessage(getImage(0), $('#newMsg').val(), "12:12", "floatRight"));
	$('#newMsg').val("");
}