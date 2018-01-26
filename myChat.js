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
				//setting each user
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
	var time = "";
	var lastMsg = "";
	if(item.messages.length != 0){
		time = noOfdays(item.messages[0].created);
		lastMsg = item.messages[item.messages.length-1].text;
	}
	
	var blogpost = "<div class='leftContainer' id='user_" +item.id+ "' >" 
	   + "<img src= '" + item.img + "' >"
	   + "<p class='marginT10'><span>"+ item.user +"</span> <span class='timeSpan'>"+time+"</span></p>" 
	   + "<p class='msgContent'>"+lastMsg+"</p></div>";
	return blogpost;
}

function noOfdays(time){
	var oneDay = 24*60*60*1000;
	var firstDate = new Date();
	var secondDate = new Date(time);
	var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
	return diffDays+" 	days";
}
	
function getMessages(item){
	var messagesBlock = "<div class='messageBlock' id='messages_user_"+item.id+"' style='display:none'>";
	if(item.messages.length != 0){
		$.each(item.messages, function(index, msg){
			
			console.log(msg); 
			var floatBlock = "";
			var msgBlock = "";
			if(msg.createdBy == 0){
				floatBlock = "rightFloat";
				msgBlock = "msgColorRight";
			}else{
				floatBlock = "leftFloat";
				msgBlock = "msgColorLeft";
			}
			var userImg = getImage(msg.createdBy);
			var time = formatAMPM(new Date(msg.created));
			messagesBlock = messagesBlock + getMessage(userImg, msg.text, time, floatBlock, msgBlock);
		});
	}
	messagesBlock = messagesBlock + "</div>"
	return messagesBlock;
}
	
function getMessage(img, msg, time, floatBlock, msgBlock){
	return "<div class='container "+floatBlock+"'>"
		 + "<img src='"+ img +"' alt='Avatar' class='imgMargin'>"
		 + "<span><p class='rightSpanMsg "+msgBlock+"'>"+msg+"</p>"
		 + "<p class='timing'>"+time+"</p></span></div>";
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
	var today = formatAMPM(new Date());
	$("div.messageBlock:visible").append(getMessage(getImage(0), $('#newMsg').val(), today, "rightFloat", "msgColorRight"));
	$('#newMsg').val("");
}

function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}