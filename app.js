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
		$sound = $("<audio>").addClass("piggy");
		$sound.attr("src", "sound/wreee.mp3");
		$target.append($sound);
		$gameSpace = $("#gameSpace");

		$gameSpace.append($target);
		$target.addClass('target');
		$target.addClass(this.type);
		$target.presented = true;
		$target.on("click", function(){
			$sound[0].play();
		});
		$target.on("click", $iBeenShot);
		$target.css("top", this.startHeight);
		$target
			.animate({//<------------------------------------------btwn left: 40%-90%
				left : (Math.random()*(90-40)+40) + "%",
				top: "-=" + (this.start/4) + "%"}, {
				duration : this.lifespan/4})
			.animate({//<------------------------------------------bwtn left: 20%-30%
				left : (Math.random()*(30-20)+20) + "%"},{
				duration : this.lifespan/4})
			.animate({//<------------------------------------------btwn left: 10%-90%
				left : Math.random()*(90-10)+10 + "%",
				top: "+=" + (this.start/8) + "%"},{
				duration : this.lifespan/4})
			.animate({//<------------------------------------------btwn left: 5% -95%
				left : Math.random()*(95 - 5) + 5 + "%",
				top: "0%"},{//<------------------------------------head up to top of games space
				duration : this.lifespan/4,
				complete: function(){
					$(this).remove();
				} 
			});}};
	
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
	if(game.numOfTargets === 9){
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

	$(".triggerInstructions").click(function(){
		$("#instructions").fadeIn("500ms");
	});

	$(".close").click(function(){
		$(this).parent().fadeOut("1500ms");
	});

	$(".triggerPlay").click(function(){
		$("#game_cover").fadeOut('1500ms',function(){
			$(this).addClass("hidden");
			readySetGo();
		});
	});
	$("#instructions_play").click(function(){
		$(this).parent().parent().fadeOut("1500ms");
	});
	
	$(".reset").click(function(){
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
		$(".clock").fadeOut(1250).text(" ");
		$(".clock").text(game.tm);
	};
	$gameSummary = function(){
		var $summary = $("#game_recap");
		$summary.toggleClass("hidden");
		$("h1").addClass("summary").appendTo($summary);
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

	$iBeenShot = function(){
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





