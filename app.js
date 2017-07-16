//////////////////////////////////////////////
///////////  VARIABLE DECLARATIONS  ///////////////

//game variables
var myTurn, round = 0, tm, rnd, numOfTargets;


//timing variables
var readySetGo, countDown, playerRound, gameClock, start, presented;


//target spawn variables
var startSpawning, stopSpawning, spawnInterval, newSpawn;


//jquery variables
var $iBeenShot, $playerReady, $displayTimeRemaining, $displayScore, $resetBoard;
var $gameSummary, $updatePlayerReady, $allTargets, $Player, $gameSpace, $target;


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
$target = $("<div>");
//object constructor
function Target(){
	this.typeIndex = Math.floor(Math.random() * 5) + 1;
	this.start = Math.floor(Math.random() * (60-10)) + 10;
	this.height = this.start + "%";
	if(start % 2 === 0){
		this.classList.addClass("left");	
	} else{
		this.classList.addClass("right");
	}

	this.isHit = false;
	this.flightPath = "flying";
	this.presented = presented || false;
	this.lifespan = (Math.floor(Math.random() * 6) + 5) * 1000;
	this.speed = Math.floor(Math.random() * 3) + 1;
	this.value = Math.floor(((10 - (this.lifespan/1000)) + this.speed) * this.typeIndex);
}


Target.prototype.birthday = function(){
	$target.addClass('target');
	$gameSpace = $("#gameSpace");
	$gameSpace.append($target);

	$target.addClass(this.flightPath);
	$target.on("click", $iBeenShot );
	$target.presented = true;
	$target.automate();
	$target.lifespan = setTimeout(function(){
		if($target.presented === true){
			$target.remove();
			console.log("target removed");
			}
	}, this.lifespan);	
};

Target.prototype.type = function(){
	if(this.typeIndex === 5){
		this.type = "special";
	}else{
		this.type = "standard";
	}	
	$target.addClass(this.type);
	return this;};

Target.prototype.automate = function(){
	setTimeout(function(){
		if($target.hasClass("flying") === true){
			var start = $target.start;
			console.log(start);		
			if($target.hasClass("special")){
				console.log(start + "special");
				$target
					.animate(
						{top : "+=" + ((Math.random() * 91) + 5) + "%",
						start : "+=" + ((Math.random() * 91) + 5) + "%"},
						{duration: ((Math.floor(Math.random() * 6) + 5) * 1000) / 4});
					// .animate({},{duration: ((Math.floor(Math.random() * 6) + 5) * 1000) / 2});
			}else{
				console.log(start + "standard");
				$target
					.animate(
						{start: "+=" + ((Math.random() * 80) + 80) + "%"},{duration : (Math.floor(Math.random() * 6) + 5) * 1000});
			}
		}
	}, 100);};

Target.prototype.splitter = function(){
	var x = parseInt(this.height);
	if(x % 2 === 0){//<----------------to assign left / right start position
		thisLilPiggy.css("left", 0);
		this.start = "left" ;
	}else{
		thisLilPiggy.css("right", 0);
		this.start = "right";
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
		alert("player 2 you're up");
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
		alert("player 1 you're up");
		game.tm = 3;
		game.round++;
		setTimeout(countDown, 1000);
	}else{  //round currently = 0
		game.myTurn = "player1";//<----------SET ACTIVE PLAYER = PLAYER1
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

//calls the newSpawn function on an interval at 10 per sec
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
		thisLilPiggy.type();
		thisLilPiggy.splitter();
		thisLilPiggy.howHigh();
		

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




	$someFun =function(){
		alert("someFun has run");
	};

});





