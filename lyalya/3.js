$(function(){
	
	var game = false;	
	$('#button_start').click(function(){
		$('.menu').fadeOut('slow', function()
		{
			$('.menu').remove();
			$('.law').css('display',  'flex');
			
		})

		//sound
		var audio = new Audio("bg.mp3");
		audio.loop = true;
		audio.play();
		var status_audio = true;
		$('#audio_btn').click(function(){
			if (status_audio)
			{
				audio.volume = 0;
				status_audio = false;
			}
			else
			{
				audio.volume = 1;
				status_audio = true;
			}
		});

	})


	//ok
	$('#ok1').click(function(){
		$('#slide1').fadeOut('slow', function()
		{
			$('#slide1').remove();
			$('#slide2').css('display', 'flex');
			$('#ok2').css('display', 'flex');
		})
	});
	$('#ok2').click(function(){
		$('#slide2').fadeOut('slow', function()
		{
			$('#slide2').remove();
			$('#slide3').css('display', 'flex');
		})
	});

	//gametime
	$('#letsgo').click(function(){
		$('.law').fadeOut('slow', function()
		{
			$('.law').remove();
			$('.gametime').css('display', 'flex');
			game = true;
			draw();
			timerT();
			spawnTrash();
			spawnShips();
		})
	})

	//game
	/*var canvas = document.getElementById('canvas');
	canvas.height = 99vh;
	canvas.width = 99vh;
	var cw = canvas.width;
	var ch = canvas.height;
	var ctx = canvas.getContext('2d');
	var timer = 0;
	var myReq;

	//init
	function ui(){
		//nickname
		ctx.fillText('Player: ' + nickname, 10, 20);
		ctx.fillText('Timer: ' + timer, 220, 20);
		ctx.fillText('Score: ' + player.score, 420, 20);
		//drawtimer
		ctx.drawImage(timerIcon, 200,5);
	}

	//pause
	$('#pause').click(function(){
		if (game)
		{
			game = false;
		}
		else
		{
			game = true;
		}
	});


	//timer
	function timerT(){
		setTimeout(function(){
			game = true;
		},300000);
	};

	//collision
	function collision(obj1,obj2){
		return(
			obj1.x < obj2.x < obj2.width &&
			obj1.x + obj1.width > obj2.x &&
			obj1.y < obj2.y + obj2.height &&
			obj1.y +obj1.height > obj2.y
			;)
	}

	//ships
	var ships = [];
	function createShips(){
		setInterval(function(){
			ships.push(new Ships());
		},2000);
	}

	function drawShips(){
		for(var i in ships){
			ships[i].draw();
		}
	}

	function Ship() {
		this.x = cw + Math.floor(Math.random()*190);
		this.y = Math.floor(Math.random()*ch-50);
		this.width = 60;
		this.height = 50;
		this.speed = 3;
		this.draw = function(){
			ctx.drawImage(ship,srcX,srcY,this.width,this.height,this.x,this)
		}
	}*/






});