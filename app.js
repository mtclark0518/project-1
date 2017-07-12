
///////// GLOBAL GAMEPLAY SETTINGS ////////////
var n = 3;
var timer = setInterval(countDown, 1000);

function countDown(){
	n--;
	if(n === 0){
		clearInterval(timer);
	}
	console.log(n);
}


$(function(){


///////// POPUP FUNCTIONALITY ////////////

	$("#triggerInstructions").click(function(){
		$("#instructions").toggleClass("hidden");
	});

	$(".close").click(function(){
		$(this).parent().addClass("hidden");
	});

	$("#triggerPlay").click(function(){
		$("#game_cover").fadeOut('1500ms',function(){
			$(this).addClass("hidden");
			setTimeout(function(){ alert("Player One: You're Up Bitch"); }, 1000);
		});
	});
	


///////// TARGET OBJECTS //////////















});