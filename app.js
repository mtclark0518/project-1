$(function(){

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
	

//Timer keeping track of time remaining in a given players round
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
				}else{
					setTimeout(readySetGo, 1000);}
		
	}else{
		console.log(rnd);
		rnd--;
		setTimeout(gameClock, 1000);
	}
	
};
///////// TARGET OBJECT CONSTRUCTOR //////////
function Target(speed, lifespan,flightPath, alive){
	this.speed = speed;
	this.lifespan = lifespan;
	this.flightPath = flightPath;
	this.alive = alive;
}
Target.prototype.create = function(){	
		var target = document.createElement('div');
		var gameSpace = document.getElementById('gameSpace');
		gameSpace.appendChild(target);
		target.classList.add('target');
		target.addEventListener("click", function(){
			alert("you clicked a target");
		});
};
function randomNum(){
	return Math.random();
}
var thisLilPiggy = new Target(10, 1, 100, true);
///////// PLAYER OBJECT CONSTRUCTOR //////////
//  

///////// BEGINS JQUERY CODING  ////////////





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