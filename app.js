


var tm;
var rnd;
var numOfTargets = 0;
var round = 0;
var startSpawning;
var stopSpawning;
var spawnInterval;
var $resetBoard;
var $gameSummary;
var newSpawn;
var $playerReady;

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////  TIMEKEEPING  /////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////


//3 second timer before players round begins
var readySetGo = function(){
	tm = 3;
	alert("Ready?");
	round++;
	setTimeout(countDown, 1000);};
	
var countDown = function(){
	$playerReady();
	if(tm === 0){
		console.log("start shootin");
		startSpawning();
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
		stopSpawning();
		console.log("buzz");
		if(round === 2){
			alert("game over");
			$gameSummary();
			return;
		}else{setTimeout(readySetGo, 1000);}
	}else{
		console.log(rnd);
		rnd--;
		setTimeout(gameClock, 1000);
	}
};

//////////////////////////////////////////////
//////////////////////////////////////////////
////////////////  TARGETS  ///////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

//object constructor
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

//target logic
//creates a new target spawn and appends to gamespace after 3-6 seconds
newSpawn = function(){
	var thisLilPiggy =  new Target("standard"); 
	numOfTargets++;
	console.log(numOfTargets);
	setTimeout(function(){thisLilPiggy.create();}, (((Math.random() * 4) + 3) * 1000));
};

//calls the newSpawn function on an interval every 2.5 seconds
startSpawning = function(){
	spawnInterval = setInterval(newSpawn, 2500);
};
//stop creating targets
stopSpawning = function(){
	window.clearInterval(spawnInterval);
	$resetBoard();
};
//removes targets from the gamespace
$resetBoard = function(){
	var $allTargets = $(".target");
	$allTargets.remove();
};

//////////////////////////////////////////////
//////////////////////////////////////////////
////////////////  PLAYERS  ///////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

//object constructor
function Player() {
	this.score = score;
	this.shotCount = shotCount;
	this.myTurn = myTurn;
}



/////////  JQUERY DOC READY CODING  ////////////
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
	$playerReady = function(){
		var $time = tm;
		var $clock = $('<div>').appendTo("body");
		$clock.addClass("clock");
		$clock.text($time);
		if($time === 0){
			$(".clock").remove();
		}
	};
	
	$gameSummary = function(){
		$("#game_recap").toggleClass("hidden");
	};		

});