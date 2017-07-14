


var myTurn;
var round = 0;
var tm;
var rnd;
var numOfTargets;


var startSpawning;
var stopSpawning;
var spawnInterval;
var newSpawn;


var $iBeenShot;
var $playerReady;
var $displayTimeRemaining;
var $displayScore;
var $resetBoard;
var $gameSummary;


//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////  TIMEKEEPING  /////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////,

//3 second timer before players round begins
var game = {
	myTurn : myTurn,
	round : round,
	tm : tm,
	rnd : rnd,
	numOfTargets : numOfTargets || 0
};

var readySetGo = function(){
	$removeTargets();
	if(game.round === 1){
		game.myTurn = "player2"; ////////SET ACTIVE PLAYER = PLAYER2
		player1.isActive = false;
		player2.isActive = true;
		console.log(game.myTurn + "'s turn");
		alert("player 2 you're up");
		game.tm = 3;
		game.round++;
		setTimeout(countDown, 1000);
	}else if(game.round >= 2){

		game.round = 0;
		player1.score = 0;
		player2.score = 0;
		console.log("time for a new game. round " + round + ". the score is " + $p1Score + ":" + $p2Score);
		

		game.myTurn = "player1";
		player2.isActive = false;
		player1.isActive = true;
		console.log(game.myTurn + "'s turn");
		alert("player 1 you're up");
		game.tm = 3;
		game.round++;
		setTimeout(countDown, 1000);
	}else{  //round currently = 0
		game.myTurn = "player1";////////SET ACTIVE PLAYER = PLAYER1
		player1.isActive = true;
		player2.isActive = false;
		console.log(game.myTurn + "'s turn");
		alert("player 1 you're up");
		game.tm = 3;
		game.round++;
		console.log(game.round);
		setTimeout(countDown, 1000);
	}
};
	
var countDown = function(){
	$playerReady();
	if(game.tm === 0){
		console.log("start shootin");
		startSpawning();
		playerRound();
	}else{
		console.log(game.tm);
		game.tm--;
		setTimeout(countDown, 1250);}};
	

//Timer keeping track of time remaining in a given players round// Starts spawning targets
var playerRound = function(){
	game.rnd = 30;
	$displayTimeRemaining();
	$displayScore();
	setTimeout(gameClock, 1000);};

var gameClock = function(){
	if(game.rnd === 0){
		console.log("buzz");
		if(game.round === 2){
			alert("Nice Game! Lets See Who Won");
			$gameSummary();
		}else{setTimeout(readySetGo, 1500);}
	}else{
		console.log(game.rnd);
		game.rnd--;
		$displayTimeRemaining();
		$displayScore();
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
	target.addEventListener("click", $iBeenShot);
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
	game.numOfTargets++;

	//set max number per round so players see the same total amount
	if(game.numOfTargets === 15){
		stopSpawning();
		console.log("all out of spawns");
	}else{
		console.log(game.numOfTargets);
		//actually appending each instance will take varying lengths of time spaced out much longer
		setTimeout(function(){thisLilPiggy.birthday();}, (((Math.random() * 20) + 1) * 1000));//appending between 1s -20s
	}
};

	//create conditional sections 
			//such as
			//could be useful to control game flow 

//////////////////////////////////////////////
//////////////////////////////////////////////
////////////////  PLAYERS  ///////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////

//object constructor
function Player(name, index, score, isActive, shotCount, targetsHit) {
	this.name = name;
	this.index = index;
	this.score = score || 0;
	this.isActive = isActive || false;
	this.shotCount = shotCount || 0;
	this.targetsHit = targetsHit || 0;
}
var player1 = new Player("Player1", 0);
var player2 = new Player("Player2", 1);

//player logic
//player score updates with clicks on targets


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
	
	$("#reset").click(function(){
			$gameSummary();
			readySetGo();
		});
	
	$removeTargets = function(){
		var $allTargets = $(".target");
		$allTargets.remove();
		game.numOfTargets = 0;
	};

	$playerReady = function(){
		var $time = game.tm;
		var $clock = $('<div>').appendTo("body");
		$clock.addClass("clock");
		
		$clock.text($time);
		if($time === 0){
			$(".clock").remove();
		}
	};
	
	$gameSummary = function(){
		var $summary = $("#game_recap");
		$summary.toggleClass("hidden");
		$("<p>").addClass("summary").appendTo($summary);
		if(player1.score === player2.score){
			$(".summary").text("Its a Tie");
		}else if (player1.score > player2.score){
			$(".summary").text("Player 1 Wins");
		}else{
			$(".summary").text("Player 2 Wins");
		}
	};		

	$displayTimeRemaining = function(){
		var $rndTm = game.rnd;
		var $roundTimeDisplay = $("#round_time_display");
		$roundTimeDisplay.text($rndTm);
	};
	$displayScore = function(){
		$('#p1Sc').text(player1.score);
		$('#p2Sc').text(player2.score);
	};
	$updateScore = function(){
		$("#p1Sc").text(" ");
		$("#p2Sc").text(" ");
		$("#p1Sc").text(player1.score);
		$("#p2Sc").text(player2.score);
	};
///////// PLAYER/TARGET INTERACTIONS ////////////
	$iBeenShot = function(){
		console.log(this);
		this.isHit = true;
		this.lifespan = 0;
		this.remove();
		console.log("target removed");
		if(game.myTurn === "player1"){
			player1.score++;
			$updateScore();
			player1.shotCount++;
			console.log("Player1 Score: " + player1.score);
		} else if(game.myTurn === "player2"){
			player2.score++;
			updateScore();
			player2.shotCount++;
			console.log("Player2 Score: " + player2.score);
		}
		
	};

	

});