$(function(){
	//login
	var check = false;
	var nickname = '';
	var game = false;
		//game
	var canvas = document.getElementById('canvas');
	canvas.width = 800;
	canvas.height = 500;
	var cw = canvas.width;
	var ch = canvas.height;
	var ctx = canvas.getContext('2d');
	var timer = 0;
	var myReq;
	var temp = 0;
	var fontSize = 25;

	var sound_bg = new Audio("sounds/audio.mp3");
	sound_bg.loop = true;
	sound_bg.play();
	var status_sound = true;
	$('#audio').click(function(){
		if(status_sound)
		{
			sound_bg.volume = 0;
			status_sound = false;
		}
		else
		{
			sound_bg.volume = 1;
			status_sound = true;
		}
	});

	$('#nickname').keyup(function(){
		nickname = $(this).val();
		if(nickname.length >= 1)
		{
			check = true;
		}
		else
		{
			check = false;
		}
	})

	$('#btn_next').click(function(){
		if(check == true)
		{
			$('.start').fadeOut('slow', function()
			{
				$('.start').remove();
				$('.law').css('display', 'flex');
			})
		}
		else
		{
			alert("ВВЕДИТЕ НИКНЕЙМ");
		}
	})
	$('#btn_start').click(function(){
		$('.main').fadeOut('slow', function()
		{
			$('.main').remove();
			$('.gametime').css('display','flex');
			$('.interface').css('display','flex')
			game = true;
			timerT();
			draw();
			createFish();
			drawFish();
			ui();
		})
	})

	function timerT(){
		setInterval(function(){
			if (game == false) 
			{
				timer = temp;
			}
			else
			{
				timer++;

			}
		},180000);
	};

	function fishTap(){
		if  {}
	}

	function ui(){
		ctx.font = fontSize;
		ctx.fillStyle = 'white';
		ctx.fillText('Игрок: ' + nickname,10,20);
		ctx.fillText('Время : ' + timer,220,20);
		ctx.fillText('Очки: ' + player.score,320,20);
		ctx.drawImage(timerIcon,200,5);
	}

	function draw(){
		if(game == true)
		{
			tick++;
			ctx.clearRect(0,0,cw,ch);
			drawFish();
		}
	}

	var fish1 = new Image();
	fish1.src = "img/fish1ico.png";
	var fish2 = new Image();
	fish2.src = "img/fish2ico.png";
	var fish3 = new Image();
	fish2.src = "img/fish3ico.png";
	var timerIcon = new Image();
	timerIcon.src = "img/timer.png";

	//вывод
	var fish_1 = new Fish(Math.floor(Math.random()*(cw+300)+50),Math.floor(Math.floor()*(ch)+0),1);
	var fish_2 = new Fish(Math.floor(Math.random()*(cw+300)+50),Math.floor(Math.floor()*(ch)+0),2);
	var fish_3 = new Fish(Math.floor(Math.random()*(cw+300)+50),Math.floor(Math.floor()*(ch)+0),3);
	function drawFish(){
		fish_1.draw(fish1);
		fish_2.draw(fish2);
		fish_3.draw(fish3);
	};

	var fish = [];
	function createFish(){
		setInterval(function(){
			fish.push(new Fish());
		},5000);
	}

	function drawFish(){
		for(var i in fish){
			fish[i].draw();
		}
	}

	function Fish() {
		this.x = cw+Math.floor(Math.random()*190);
		this.y = Math.floor(Math.random()*ch-50);
		this.width = 60;
		this.height = 50;
		this.speed = 3;
		this.draw = function(){
			ctx.drawImage(fish,srcX,srcY,this.width,this.height,this.x,this.y,this.width,this.height);
			this.update();
		};
		this.update = function(){
			if(this.x < 0 - this.width){
				var hi = fish.indexOf(this);
				fish.splice(hi,1);
			}
			this.x -= this.speed;
		};
	}

	var srcX = 0; srcY = 0; tick = 0;



});