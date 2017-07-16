//////////////////////////////////////////////
///////////  VARIABLE DECLARATIONS  ///////////////

//game variables
var myTurn; 
var round = 0; 
var tm;
var rnd; 
var numOfTargets;


//timing variables
var readySetGo; 
var countDown;
var playerRound;
var gameClock;


//target spawn variables
var startSpawning;
var stopSpawning; 
var spawnInterval;
var newSpawn;


//jquery variables
var $iBeenShot;
var $targetMovement;
var $escape;
var $playerReady;
var $updatePlayerReady;
var $displayTimeRemaining;
var $displayScore;
var $updateScore;
var $gameSummary;
var $resetBoard;
var $allTargets;
var $gameSpace;
var $target;


//////////////////////////////////////////////
///////////  GAME CONSTRUCTOR  ///////////////

var game = {
	myTurn : myTurn,
	round : round,
	tm : tm,
	rnd : rnd,
	numOfTargets : numOfTargets || 0
};


//////////////////////////////////////////////
///////  PLAYER CONSTRUCTOR Fn /////////////

function Player(name, index, score, isActive, shotCount, targetsHit) {
	this.name = name;
	this.index = index;
	this.score = score || 0;
	this.isActive = isActive || false;
	this.shotCount = shotCount || 0;
	this.targetsHit = targetsHit || 0;
}


//////////////////////////////////////////////
/////////  TARGET CONSTRUCTOR Fn /////////////

//object constructor
function Target(){
	this.isHit = false;
	this.presented = false;
	
	this.start = Math.floor(Math.random() * (60-10)) + 10;
	this.startHeight = this.start + "%";
	this.originSide = this.start % 2 === 0 ? "left" : "right";
	
	this.typeIndex = Math.floor(Math.random() * 5) + 1;
	this.type = this.typeIndex === 5 ? "special" : "standard";
	
	this.lifespan = this.type === "standard" ? (Math.floor(Math.random() * 6) + 5) * 2000 : (Math.floor(Math.random() * 6) + 5) * 1000;
	this.speed = 5000 / this.typeIndex;
	this.value = Math.floor( (10 - (this.lifespan/2000)) + (this.typeIndex * 2));
}


Target.prototype = {
	birthday : function(){
		$target = $("<div>");
		$gameSpace = $("#gameSpace");
		$gameSpace.append($target);
		$target.addClass('target');
		$target.addClass(this.type);
		$target.presented = true;
		$target.on("click", $iBeenShot);
		$target.css("top", this.startHeight);
		$target
			.animate({
				left : "+=" + (Math.random()*(85-75)+75) + "%",
				top: "-=" + (this.start/4) + "%"}, 
				this.lifespan/4)
			.animate({
				left : "-=" + (Math.random()*(75-35)+35) + "%",
				}, this.lifespan/4)
			.animate({
				left : "+=" + (Math.random()*(35-30)+30) + "%",
				top: "+=" + (this.start/8) + "%"}, 
				this.lifespan/8)
			.animate({
				left : "-=" + (Math.random()*(30-15) + 15) + "%",
				top: "+=" + (this.start/8) + "%"}, 
				this.lifespan/8)
			.animate({
				left : "+=" + (Math.random()*(15 - 5)+ 5) + "%",
				top: "0%"}, 
				{
				duration : this.lifespan/8, 
				complete: function(){
				this.remove();
				} 
		});	
	

	}

};
////////////////////////////////////////////
//////////////  TIMEKEEPING  /////////////////

//3 second timer before players round begins
readySetGo = function(){
	$removeTargets(); //<----------------
	$updateScore();//<-------------------
	if(game.round === 1){
		game.myTurn = "player2";//<----------SET ACTIVE PLAYER = PLAYER2
		player1.isActive = false;
		player2.isActive = true;
		console.log(game.myTurn + "'s turn");
		game.tm = 3;
		game.round++;
		setTimeout(countDown, 1000);
	}else if(game.round >= 2){
		game.round = 0;
		console.log("time for a new game. round " + round + ". the score is " + player1.score + ":" + player2.score);
		game.myTurn = "player1";
		player2.isActive = false;
		player1.isActive = true;
		console.log(game.myTurn + "'s turn");
		game.tm = 3;
		game.round++;
		setTimeout(countDown, 1000);
	}else{  //round currently = 0
		game.myTurn = "player1";//<----------SET ACTIVE PLAYER = PLAYER1
		player1.isActive = true;
		player2.isActive = false;
		console.log(game.myTurn + "'s turn");
		game.tm = 3;
		game.round++;
		console.log(game.round);
		setTimeout(countDown, 1000);
	}
};

countDown = function(){
	$playerReady();		//<-------------------- line 237
	if(game.tm === 0){
		console.log("start shootin");
		startSpawning();//<--------------------
		playerRound();//<----------------------
	}else{
		console.log(game.tm);
		game.tm--;
		setTimeout(countDown, 1250);}};	

//Timer keeping track of time remaining in a given players round// Starts spawning targets
playerRound = function(){
	game.rnd = 30;
	$displayTimeRemaining();//<-----------------
	$displayScore();//<-------------------------
	setTimeout(gameClock, 1000);};

gameClock = function(){
	if(game.rnd === 0){
		console.log("buzz");
		if(game.round === 2){
			$gameSummary();//<-------------------
		}else{setTimeout(readySetGo, 1500);}
	}else{
		console.log(game.rnd);
		game.rnd--;
		$displayTimeRemaining();//<---------------
		$displayScore();//<-----------------------
		setTimeout(gameClock, 1000);
	}
};

//////////////////////////////////////////////
//////////////  TARGET SPAWN  /////////////////

//calls the newSpawn function on an interval at 2 per sec
startSpawning = function(){
	spawnInterval = setInterval(newSpawn, 100); //spawning takes place quickly
};
//stop creating targets
stopSpawning = function(){
	window.clearInterval(spawnInterval);
};
//creates a new target spawn and appends to gamespace
newSpawn = function(){
	var thisLilPiggy =  new Target(); 
	game.numOfTargets++;

	//set max number per round so players see the same total amount
	if(game.numOfTargets === 16){
		stopSpawning();
		
		console.log("all out of spawns");
	}else{
		console.log(game.numOfTargets);
		
		//actually appending each instance will take varying lengths of time spaced out much longer
		setTimeout(function(){thisLilPiggy.birthday();}, (((Math.random() * 20) + 1) * 1000));//appending between 1s -20s
	}
};

var player1 = new Player("Player1", 0);
var player2 = new Player("Player2", 1);


/////////  JQUERY DOC READY CODING  ////////////




$(function(){

//POPUP FUNCTIONALITY //

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

	
///////// VARIOUS FUNCTIONALITY ////////////
	$removeTargets = function(){
		$allTargets = $(".target");
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
		}else{
			$updatePlayerReady();
		}
	};

	$updatePlayerReady = function(){
		$(".clock").text(" ");
		$(".clock").text(game.tm);
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
		player1.score = 0;
		player2.score = 0;
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
	// $targetLifespan = function(){

	// };
	$iBeenShot = function(){
		console.log(this.value + " is my value and " + this.type + " is my type");
		console.log(this);
		this.isHit = true;
		this.lifespan = 0;
		if(this.isHit === true){
			this.remove();
		}
		console.log("target removed");
		if(game.myTurn === "player1"){
			player1.score++;
			$updateScore();
			player1.shotCount++;
			console.log("Player1 Score: " + player1.score);
		}else if(game.myTurn === "player2"){
			player2.score++;
			$updateScore();
			player2.shotCount++;
			console.log("Player2 Score: " + player2.score);
		}	
	};



});





