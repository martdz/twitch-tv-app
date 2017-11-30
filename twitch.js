$(document).ready(function(){

	var channels = ["freecodecamp", "esl_sc2", "cretetion"];
	var urls = ["https://www.twitch.tv/freecodecamp", "https://www.twitch.tv/esl_sc2", "https://www.twitch.tv/cretetion"];
	var logos = ["https://avatars0.githubusercontent.com/u/9892522?s=400&v=4", "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_overwatch-profile_image-dc68066c0548ab54-300x300.jpeg", "https://i-cdn.phonearena.com/images/article/95477-image/Game-streaming-service-Twitch-launches-new-Android-and-iOS-apps.jpg"];

	twitch();
	status();
	
	function twitch(){
		channels.forEach(function(channel) {
			function url(channel){
				return "https://wind-bow.glitch.me/twitch-api/streams/" + channel + "?callback=?"
			}
			$.getJSON(url(channel), function(json) {
				var index =  channels.indexOf(channel);
				var cond = (json.stream !== null);
				var url = (cond) ? json.stream.channel.url : urls[index];
				var logo = (cond) ? json.stream.channel.logo : logos[index];
				var name = (cond) ? json.stream.channel.display_name : channel;
				var game = (cond) ? json.stream.game : "Offline";
				var status = (cond) ? json.stream.channel.status : "";
				var on_off_status = (cond) ? "online" : "offline";
 	
				$("body > div").append("<div class='channel " + on_off_status + "'><a href="+ url +" target='_blank'><img src=" + logo + " alt='logo'><h3 class='display_name'>" + name + "</h3><p><span class='game'>" + game + ": " + "</span><span class='status'>" + status + "</span></p></a></div>");
			});
		});
	}

	function status(){
			$("button#online").click(function(){
				$("div.offline").hide();
				$("div.online").show();
			});
			$("button#offline").click(function(){
				$("div.online").hide();
				$("div.offline").show();
			});
			$("button#all").click(function(){
				$("div.channel").show();
			});
		}
});