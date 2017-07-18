
var $shotMiss = function(){
	var $gunShot = $('<audio>');
	$gunShot.attr('src', 'sound/bullet1.mp3');
	$('#game_cover_img').click(function(){
		$gunShot.play();
	});};









