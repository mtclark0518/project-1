


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
var $displayTimeRemaining;
var $shotsFired;

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////  TIMEKEEPING  /////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////


//3 second timer before players round begins
var readySetGo = function(){
	$removeTargets();
	if(round === 1){
		alert("player 2 you're up");
		tm = 3;
		round++;
		setTimeout(countDown, 1000);
	}else{
		alert("player 1 you're up");
		tm = 3;
		round++;
		setTimeout(countDown, 1000);
	}
};
	
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
	$displayTimeRemaining();
	setTimeout(gameClock, 1000);};

var gameClock = function(){
	if(rnd === 0){
		console.log("buzz");
		if(round === 2){
			alert("Nice Game! Lets See Who Won");
			$gameSummary();
		}else{setTimeout(readySetGo, 1500);}
	}else{
		console.log(rnd);
		rnd--;
		$displayTimeRemaining();
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

Target.prototype.birthday = function(){
	var target = document.createElement('div');
	var gameSpace = document.getElementById('gameSpace');
	gameSpace.appendChild(target);
	target.classList.add('target');
	target.classList.add(this.type);
	console.log("spawn is alive");
	target.addEventListener("click", function(){
		console.log("you clicked a target");
		$shotsFired();
	});
};

//target logic

//calls the newSpawn function on an interval at 5 per sec
startSpawning = function(){
	spawnInterval = setInterval(newSpawn, 200); //spawning takes place quickly
};
//stop creating targets
stopSpawning = function(){
	window.clearInterval(spawnInterval);
};
//creates a new target spawn and appends to gamespace
newSpawn = function(){
	var thisLilPiggy =  new Target("standard"); 
	numOfTargets++;

	//set max number per round so players see the same total amount
	if(numOfTargets === 15){
		stopSpawning();
		console.log("all out of spawns");
	}else{
		console.log(numOfTargets);
		//actually appending each instance will take varying lengths of time spaced out much longer
		setTimeout(function(){thisLilPiggy.birthday();}, (((Math.random() * 20) + 1) * 1000));//appending between 1s -20s
	}
};

//removes targets from the gamespace




//////////////////////////////////////////////
//How many targets released per game
//		estimate 15
//		create inerval runs fast as fuck
//			stops when target count reachs 15


//		the random timeout to append newly spawned targets  
		//takes a much larger time interval picks timeout to ren//

		//create conditional sections 
			//such as
			//could be useful to control game flow  
///////////////////
//////////////////////////////////////////////




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
	
	$removeTargets = function(){
		var $allTargets = $(".target");
		$allTargets.remove();
		numOfTargets = 0;
		tm = 3;
};

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
		round = 0;
	};		

	$displayTimeRemaining = function(){
		var $rndTm = rnd;
		var $roundTimeDisplay = $("#round_time_display");
		$roundTimeDisplay.text($rndTm);
	};

	
	$playAgainBtn = function(){
		var $resetBtn = $("button#reset");
		$resetBtn.click(function(){
			$gameSummary();
			$readySetGo();
		});
	};	




});