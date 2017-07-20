//////////////////////////////////////////////
///////////  VARIABLE DECLARATIONS  ///////////////

//global game propteries 
var tm;
var numOfTargets;

//solo specific propteries
var numOfTargetsLeft;
var level = 1;
var levelMax;
//timing solo propteries
var readySetSolo;


//vs specific propteries
var rnd; 
var myTurn;
var round = 0;

//timing vs propteries
var readySetGo; 
var countDown;
var playerRound;
var gameClock;


//target spawn methods
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
var $gunShot;
var $game_versus;
var $game_solo;
var $newGameVs;
var $newGameSolo;

//


//////////////////////////////////////////////
///////////  GAME CONSTRUCTOR  ///////////////
function Game(){
	this.tm = tm;
	this.level = level || 1;
	this.numOfTargets = numOfTargets || 0;
	this.round = round || 0;	
	}

//GAME TYPES
function Solo(){
	Game.apply(this, arguments);
	this.levelMax = this.level * 7;
	this.numOfTargetsLeft = this.levelMax - this.numOfTargets;
	}
Solo.prototype = new Game();

function Vs(){
	Game.apply(this, arguments);
	this.myTurn = myTurn;
	this.rnd = rnd || 30;
	}
Vs.prototype = new Game();
Vs.prototype = {
	
	readySetGo : function(){
		$removeTargets(); 
		$updateScore();
		if($newGameVs.round === 1){
		//SET ACTIVE PLAYER = PLAYER2
			$newGameVs.myTurn = "player2";
			player1.isActive = false;
			player2.isActive = true;
			console.log($newGameVs.myTurn + "'s turn");
			$newGameVs.tm = 3;
			$newGameVs.round++;
			setTimeout($newGameVs.countDown, 1000);
		}else if($newGameVs.round >= 2){
			$newGameVs.round = 0;
			console.log("time for a new game. round " + this.round + ". the score is " + player1.score + ":" + player2.score);
			$newGameVs.myTurn = "player1";
			player2.isActive = false;
			player1.isActive = true;
			console.log(this.myTurn + "'s turn");
			$newGameVs.tm = 3;
			$newGameVs.round++;
			setTimeout($newGameVs.countDown, 1000);
	//round currently = 0
		}else{  
		//SET ACTIVE PLAYER = PLAYER1
			$newGameVs.round = 0;
			$newGameVs.myTurn = "player1";
			player1.isActive = true;
			player2.isActive = false;
			console.log($newGameVs.myTurn + "'s turn");
			$newGameVs.tm = 3;
			$newGameVs.round++;
			console.log($newGameVs.round);
			setTimeout($newGameVs.countDown, 1000);
		}
	},
	
	countDown : function(){
		$playerReady();		
		if($newGameVs.tm === 0){
			console.log("start shootin");
			startSpawning();
			$newGameVs.playerRound();
		}else{
			console.log($newGameVs.tm);
			$newGameVs.tm--;
			setTimeout($newGameVs.countDown, 1250);
		}
	},
	
	//Timer keeping track of time remaining in a given players round
	playerRound : function(){
		this.rnd = 30;
		$displayTimeRemaining();//<-----------------
		$displayScore();//<-------------------------
		setTimeout(this.gameClock, 1000);
	},

	gameClock : function(){
		if($newGameVs.rnd === 0){
			console.log("buzz");
			console.log($newGameVs.round);
			if($newGameVs.round === 2){
				$gameSummary();//<-------------------
			}else{
				setTimeout($newGameVs.readySetGo, 1500);//<-------------------
			}
		}else{
			console.log($newGameVs.rnd);
			$newGameVs.rnd--;//<-------------------
			$displayTimeRemaining();//<---------------
			$displayScore();//<-----------------------
			setTimeout($newGameVs.gameClock, 1000);
		}
	}
};

// var game = {
// 	myTurn : myTurn,
// 	round : round,
// 	tm : tm,
// 	rnd : rnd,
// 	numOfTargets : numOfTargets || 0,

// };


function animation(){
	var animate;
	var high = Math.random()*(95-60)+60;
	var low = Math.random()*(45-5)+5;
	var coinflip = Math.floor(Math.random()*(2 - 1 + 1) + 1);
	if (coinflip === 2) {
		animate = high + '%';
	} else {
		animate = low + '%';
	}
	return animate;
}

//////////////////////////////////////////////
///////  PLAYER CONSTRUCTOR Fn /////////////

function Player(name, index, score, level, isActive, shotCount, targetsHit) {
	this.name = name;
	this.index = index;
	this.score = score || 0;
	this.level = level || 1;
	this.isActive = isActive || false;
	this.shotCount = shotCount || 0;
	this.targetsHit = targetsHit || 0;
}


//////////////////////////////////////////////
/////////  TARGET CONSTRUCTOR Fn /////////////

function Target() {
	this.typeIndex = Math.floor(Math.random() * 10) + 1;
	
	this.type = this.typeIndex === 10 ? 'special' : 'standard';
	this.boosted = this.typeIndex >= 8 ? true : false;
	this.trixster = this.typeIndex === 8 ? true : false;
	this.isHit = false;
	this.presented = false;
	
	this.start = Math.floor(Math.random() * (50-10)) + 10;
	this.startHeight = this.start + "%";
	this.originSide = this.start % 2 === 0 ? 'left' : 'right';
	this.speed = this.boosted === true ? 2 : 1;
	this.lifespan = (Math.floor(Math.random() * (9 - 7) + 7) * 1000)/this.speed; 
	this.value = Math.floor( (10 - (this.lifespan/1000)) + (this.typeIndex * this.speed) );
	console.log(this);
}


Target.prototype = {
	birthday : function() {
		$target = $("<div>");
		$sound = $("<audio>").addClass('piggy');
		$sound.attr("src", "sound/wreee.mp3");
		$target.append($sound);
		$gameSpace = $("#gameSpace");
		$gameSpace.append($target);
		$target.addClass('target');
		$target.addClass(this.type);
		$target.presented = true;
		$target.on("click", function() {
			$sound[0].play();
		});
		$target.on("click", $iBeenShot);
		$target.css(this.originSide, 0);
		$target.css("top", this.startHeight);
		$target
			//<------------------------------------------btwn left: 40%-90%
			.animate({
				left : animation(),
				top: "-=" + (this.start/4) + "%"
			}, {
				duration : this.lifespan/4})
			
			//<------------------------------------------btwn left: 40%-90%
			.animate({
				left : animation(),
				top: "+=" + (this.start/4) + "%"
			}, {
				duration : this.lifespan/4})
			
			//<------------------------------------------bwtn left: 20%-30%	
			.animate({
				left : animation()
			},{
				duration : this.lifespan/4})
			
			//<------------------------------------------btwn left: 10%-90%
			.animate({
				left : animation(),
				top : "+=" + (this.start/8) + "%"
			},{
				duration : this.lifespan/4})
			
			//<------------------------------------------btwn left: 5% -95%
			.animate({
				left : animation(),
				//<------------------------------------head up to top of games space
				top : "0%"
			},{
				duration : this.lifespan/4,
				complete : function(){
					$(this).remove();
				} 
		});
	}
};
	
////////////////////////////////////////////
//////////////  TIMEKEEPING  /////////////////

//3 second timer before players round begins

readySetSolo = function(){
	alert('solo game coming soon');
};

	



//////////////////////////////////////////////
//////////////  TARGET SPAWN  /////////////////

//calls the newSpawn function on an interval at 2 per sec
startSpawning = function() {
	spawnInterval = setInterval(newSpawn, 100); //spawning takes place quickly
};
//stop creating targets
stopSpawning = function() {
	window.clearInterval(spawnInterval);
};
//creates a new target spawn and appends to gamespace
newSpawn = function() {
	var thisLilPiggy =  new Target(); 
	Game.numOfTargets++;

	//set max number per round so players see the same total amount
	if(Game.numOfTargets === 11) {
		stopSpawning();
		console.log("all out of spawns");
	} else {
		console.log(Game.numOfTargets);
		
		//actually appending each instance will take varying lengths of time spaced out much longer
		setTimeout(function() {
		thisLilPiggy.birthday();
		//appending between 1s -20s
		}, (((Math.random() * 20) + 1) * 1000));
	}
};

var player1 = new Player("Player1", 0);
var player2 = new Player("Player2", 1);


/////////  JQUERY DOC READY CODING  ////////////


$(function() {

	$gunShot = $('<audio>').addClass("miss");
	$gunShot.attr('src', 'sound/bullet1.mp3');
	$gameSpace = $("#gameSpace");
	$gameSpace.append($gunShot);
	$gameSpace.click(function() {
		$gunShot[0].play();
	});


//POPUP FUNCTIONALITY //

	$(".triggerInstructions").click(function() {
		$("#instructions").fadeIn("500ms");
	});

	$(".close").click(function() {
		$(this).parent().fadeOut("1500ms");
	});

	$(".vs").click(function() {
		$("#game_cover").fadeOut('1500ms',function() {
			$(this).addClass("hidden");
				$game_versus();	
		});
	});
	$(".solo").click(function() {
		$("#game_cover").fadeOut('1500ms',function() {
			$(this).addClass("hidden");
				$game_solo();	
		});
	});

	$("#instructions_play").click(function() {
		$(this).parent().parent().fadeOut("1500ms");
	});
	
	$(".reset").click(function() {
		$gameSummary();
	});


	
///////// VARIOUS FUNCTIONALITY ////////////
	$game_versus = function() {
		$newGameVs = new Vs();
		console.log(this);
		console.log($newGameVs);
		$newGameVs.readySetGo();
	};

	$game_solo = function() {
		$newGameSolo = new Solo();
		console.log(this);
		console.log($newGameSolo);
		$newGameSolo.readySetSolo();
	};

	//removes targets from gamespace
	$removeTargets = function() {
		$allTargets = $(".target");
		$allTargets.remove();
		Game.numOfTargets = 0;
	};

	//initiates the between round countdown
	$playerReady = function() {
		console.log($newGameVs);
		var $time = $newGameVs.tm;
		var $clock = $('<div>').appendTo("body");
		$clock.addClass("clock");
		$clock.text($time);
		if($time === 0){
			$(".clock").remove();
		}else{
			$updatePlayerReady();
		}
	};
	
	//updates round countdown
	$updatePlayerReady = function() {
		$(".clock").fadeOut(1500).text(" ");
		$(".clock").text($newGameVs.tm);
	};
	
	//triggers the game summary to appear (checks win condition)
	$gameSummary = function() {
		var $summary = $("#game_recap");
		$summary.toggleClass("hidden");
		$("h1").addClass("summary").appendTo($summary);
		if(player1.score === player2.score) {
			$(".summary").text("Its a Tie");	
		} else if (player1.score > player2.score) {
			$(".summary").text("Player 1 Wins");
		} else {
			$(".summary").text("Player 2 Wins");
		}
		player1.score = 0;
		player2.score = 0;
	};		


	
	//displays time remaining in scoreboard
	$displayTimeRemaining = function() {
		var $rndTm = $newGameVs.rnd;
		var $roundTimeDisplay = $("#round_time_display");
		$roundTimeDisplay.text($rndTm);
	};

	//displays player(s) level/scores in scoreboard
	$displayScore = function() {
		$('#p1Sc').text(player1.score);
		$('#p2Sc').text(player2.score);
			// $('#p2Sc').text(player1.level);	
	};
	
	//updates player scores in scoreboard
	$updateScore = function() {
		$("#p1Sc").text(" ");
		$("#p2Sc").text(" ");
		$("#p1Sc").text(player1.score);
		$("#p2Sc").text(player2.score);
		// $("#p2Sc").text(player1.level);
	};

///////// PLAYER/TARGET INTERACTIONS ////////////

	$iBeenShot = function() {
		console.log(this);
		this.isHit = true;
		this.lifespan = 0;
		if(this.isHit === true) {
			this.remove();
		}
		console.log("target removed");
		if($newGameVs.myTurn === "player1") {
			player1.score++;
			$updateScore();
			player1.shotCount++;
			console.log("Player1 Score: " + player1.score);
		} else if ($newGameVs.myTurn === "player2") {
			player2.score++;
			$updateScore();
			player2.shotCount++;
			console.log("Player2 Score: " + player2.score);
		}	
	};


});





