




///////// TIMEKEEPING LOGIC ---VANILLA JS  ////////////
var tm;
var rnd;
var round = 0;


//3 second timer before players round begins//
var readySetGo = function(){
	tm = 3;
	alert("Ready?");
	round++;
	setTimeout(countDown, 1000);};
	
var countDown = function(){
	if(tm === 0){
		console.log("start shootin");
		playerRound();
	}else{
		console.log(tm);
		tm--;
		setTimeout(countDown, 1250);}};
	

//Timer keeping track of time remaining in a given players round// Starts spawning targets
var playerRound = function(){
	rnd = 30;
	setTimeout(gameClock, 1000);};

var gameClock = function(){
	if(rnd === 0){
		console.log("buzz");
		if(round === 2){
			alert("game over");
			gameSummary();
			return;
		}else{setTimeout(readySetGo, 1000);}
	}else{
		console.log(rnd);
		rnd--;
		setTimeout(gameClock, 1000);
	}
};

///////// TARGET OBJECT CONSTRUCTOR //////////
function Target(type){
	this.type = type;
	this.isHit = false;
	this.speed = Math.floor(Math.random() * 3) + 1;
	this.lifespan = (Math.floor(Math.random() * 9) + 5) * 1000;
	this.value = Math.floor(this.speed * 2 );



}
Target.prototype.create = function(){
	var reset;
	var target = document.createElement('div');
	var gameSpace = document.getElementById('gameSpace');
	gameSpace.appendChild(target);
	target.classList.add('target');
	target.classList.add(this.type);
	target.addEventListener("click", function(){
	alert("you clicked a target");
	});
};

///////// TARGET FUNCTIONALITY ////////////
//creates a new target and appends to gamespace between 3 - 6 seconds
var spawn = function(){
	var thisLilPiggy =  new Target("standard");
	var birthRate = (Math.floor(Math.random() * 4) + 3) * 1000;
	setTimeout(function(){thisLilPiggy.create();}, birthRate);
	console.log(birthRate);

}; 

///////// PLAYER OBJECT CONSTRUCTOR //////////





/////////  JQUERY READY FUNCTIO CODING  ////////////
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
			readySetGo();
		});
	});

	var gameSummary = function(){
		$("#game_recap").toggleClass("hidden");
	};		

});