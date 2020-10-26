$(function(){
	//СОСТОЯНИЕ КНОПКИ
	var btn = false;
	var nickname = '';
	var game = false;

$('#inp_nickname').keyup(function(){
		nickname = $(this).val();
		if(nickname.length >= 1)
		{
			btn = true;
		}
		else
		{
			btn = false;
		}
	});


$('#btn_start').click(function(){
		if(btn == true)
		{
			
				window.location = "game_stage.html"
				game = true;
				draw();
				timerT();
				energy_init();
				createEnemy();
		}
		else
		{
			alert("введите никнейм");
		}
	});


	//audio
	var sound_bg = new Audio("sound_bg.mp3");
	sound_bg.loop = true;
	sound_bg.play();
	var status_sound = true;
	$('#sound').click(function(){
		if (status_sound)
		{
			sound_bg.volume = 0;
			status_sound = false;
		}
		else
		{
			sound_bg.volume=1;
			status_sound=true;
		}
	});

	//ПАУЗА
	$('#btn_pause').click(function(){
		if (game)
			{
				game = false;
			}
			else
			{
				game = true;
			}
	});

	function timerT(){
		setInterval(function(){
			if(game == false)
			{
				timer = temp;
			}
			else
			{
				timer++;

				
				hero.energy -= 1;

			}
			
		},1000);
	};

	//energy
	var energys = [];

	function energy_draw()
	{
		for(var i = 0; i < energys.length; i++)
		{
			energys[i].draw();
		}
	}
	
	function energy_init()
	{
		setInterval(function(){ energys.push(new Energy()); },5000);
	}

	function Energy(){
		this.x = cw + Math.floor(Math.random()*100);
		this.y = Math.floor(Math.random()*ch+20);
		this.width = 15;
		this.height = 15;
		this.speed = 4;
		this.draw = function(){
			ctx.drawImage(energyIcon, this.x, this.y);
			this.update();
		};
		this.update = function(){

				deleteEnergy();

				this.x -= this.speed;


		};
	};



	function deleteEnergy(){
		for(var i = 0; i < energys.length; i++)
		{
			if(energys[i].x < hero.x + hero.width && energys[i].x + energys[i].width > hero.x && energys[i].y < hero.y + hero.height && energys[i].y + energys[i].height > hero.y)
			{
				
				hero.energy += 15;
				if(hero.energy >= 30) hero.energy = 30;
				energys.splice(i,1);

			}
			else if(energys[i].x <= 0)
			{
				
			}
		}
	};

	//СТОЛКНОВЕНИЕ
	function collision(obj1,obj2){
		return (
					obj1.x < obj2.x + obj2.width &&
					obj1.x + obj1.width > obj2.x &&
					obj1.y < obj2.y + obj2.height &&
					obj1.y + obj1.height > obj2.y
			);
	}

	//ВЫСТРЕЛЫ от игрока
	var shots = [];

	function shot() {
		this.x = hero.x + hero.width;
		this.y = hero.y + hero.height/2;
		this.width = 10;
		this.height = 2;
		this.speed = 6;
		this.shoot = function(){
			ctx.drawImage(bullet,this.x,this.y);
			this.x += this.speed;

			for(var i in enemy)
			{
				if(collision(this,enemy[i]))
				{
					var enemyIndex = enemy.indexOf(enemy[i]);
					enemy.splice(enemyIndex,1);
					var shotIndex = shots.indexOf(this);
					shots.splice(shotIndex,1);
					hero.score += 15;
				}
			}
		
		};

	};

	function drawShots(){
		for(var i = 0; i < shots.length; i++)
		{
			if(shots[i].x >= cw)
			{
				shots.splice(i,1);
			}
			else
			{
				shots[i].shoot();
			}
		}
	};

	//управление кнопками
	var right = false,
		left = false,
		up = false,
		down = false;

	$(window).keyup(function(e){

		if(e.keyCode == 32) //ПРОБЕЛ АТАКА
		{
			sound_shot.play();
			shots.push(new shot());

			console.log(shots);
			e.preventDefault();
		}
		if(e.keyCode == 65) //A - levo
		{
			left = false;
			e.preventDefault();
		}
		if(e.keyCode == 68) //D - pravo
		{
			right = false;
			e.preventDefault();
		}
		if(e.keyCode == 87) //W - naverh
		{
			up = false;
			e.preventDefault();
		}
		if(e.keyCode == 83) //S - vniz
		{
			down = false;
			e.preventDefault();
		}

		

	});

	$(window).keydown(function(e){
		if(e.keyCode == 65) //A - levo
		{
			left = true;
		}
		if(e.keyCode == 68) //D - pravo
		{
			right = true;
		}
		if(e.keyCode == 87) //W - naverh
		{
			up = true;
		}
		if(e.keyCode == 83) //S - vniz
		{
			down = true;
		}


	});

	
	//ИГРА
	var canvas = document.getElementById('canvas');
	canvas.width = 800;
	canvas.height = 400;
	var cw = canvas.width; //ширина поля
	var ch = canvas.height; //высота поля
	var ctx = canvas.getContext('2d');
	var timer = 0;
	var myReq;
	
	//инициализация
	function ui(){
		//вывод ника
		ctx.font = fontSize + "px Arial";
		ctx.fillStyle = 'white';
		ctx.fillText('Hero: ' + nickname, 10, 20);
		ctx.fillText('Timer: ' + timer, 220, 20);
		ctx.fillText('Energy: ' + hero.energy, 320, 20);
		ctx.fillText('Score: ' + hero.score, 420, 20);
		//вывод таймера
		ctx.drawImage(timerIcon, 200,5);
		//вывод топлива
		ctx.drawImage(energyIcon, 300,7);
	};
	var temp = 0;

	//инициализация всего процесса
	function draw(){
		//рисуем с 60 фпс
		if(game == true) //ПАУЗА ДА ИЛИ НЕТ
		{

			tick++;
			ctx.clearRect(0,0,cw,ch);

			drawBuildings();

			ui();
			hero.draw();
			hero.update();
			drawShots();
			energy_draw();
			drawEnemy();

			if(hero.energy <= 0) {
					//ОКОНЧАНИЕ ИГРЫ
					cancelAnimationFrame(myReq);
					console.log('gg');
					game = false;
					add_Score();
					$('.result_stage').css('display','flex');
					$('#user_score').html(hero.score);
					$('#user_time').html(timer);
					
				}

			heroAnimate();

		}
		else
		{
			temp = timer;
		}
		

		myReq = requestAnimationFrame(draw);
	}	


	//загрузка изображений ПРЕООАД
	var hero = new Image();
	hero.src = "images/ship_2.png";
	var timerIcon = new Image();
	timerIcon.src = "img/timer.png";
	var energyIcon = new Image();
	energyIcon.src = "img/energy.png";
	var bullet = new Image();
	bullet.src = "img/bullet.png";
	var enemy = new Image();
	enemy.src = "img/enemy.png";
	var enemy_bullet = new Image();
	enemy_bullet.src = "img/enemy_bullet.png";

	//skyscrapers
	var building1 = new Image();
	building1.src = "img/skyscraper_small.png";
	var building2 = new Image();
	building2.src = "img/skyscraper_medium.png";
	var building3 = new Image();
	building3.src = "img/skyscraper_big.png";

	//show skyscrapers
	var building_1 = new Building(Math.floor(Math.random()*(cw+300)+50),Math.floor(Math.random()*(ch)+0),1);
	var building_2 = new Building(Math.floor(Math.random()*(cw+300)+50),Math.floor(Math.random()*(ch)+0),2);
	var building_3 = new Building(Math.floor(Math.random()*(cw+300)+50),Math.floor(Math.random()*(ch)+0),1);

	function drawBuildings(){
		building_1.draw(building1);
		building_2.draw(building2);
		building_3.draw(building3);
	};	

	//skyscraper obj
	function Building(x,y,speed){
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.draw = function(e){
			ctx.drawImage(e, this.x , this.y);
			this.update();
		};
		this.update = function(){
			if(this.x <= -800)
			{
				this.x = cw + Math.floor(Math.random()*500+100);
				this.y = Math.floor(Math.random()*ch+1);
			}
			this.x -= this.speed;
		};
	};

	var srcX = 0,
		srcY = 0,
		tick = 0;
	//анимация игрока
	function shipAnimate(){
		if(tick > 10)
		{
			tick = 0;
			srcX += 60;
			if (srcX == 300) {
				srcX = 0;
			}
			
		}
		else
		{
			
		}
	};
	//ИГРОК
	function Hero(){
		this.x = 15;
		this.y = 200;
		this.width = 60;
		this.height = 50;
		this.score = 0;
		this.energy = 15;
		this.speed = 5;
		this.draw = function(){

			//просто проверка. рисуем кружок
			ctx.drawImage(ship,srcX,srcY,this.width,this.height, this.x, this.y, this.width, this.height);
		};
		this.update = function(){
			//обновление позиции
			if(right && this.x + this.width < cw) {this.x += this.speed} else if(left && this.x > 0) {this.x -= this.speed};
			if(up && this.y > 0) {this.y -= this.speed} else if(down && this.y + this.height < ch) {this.y += this.speed};

		};

	};
	//игрок
	var hero = new Hero();





	//враги
	var enemy = [];

	function createEnemy(){
		setInterval(function(){
			enemy.push(new Enemy());
		},3000);
	}

	function drawEnemy(){
		for(var i in enemy){
			enemy[i].draw();
		}
	}

	var enemy_shots = [];
	function drawEnemyBullets(){
		for(var i in enemy_shots)
		{
			enemy_shots[i].draw();
		}
	}
	function enemyBullet(x,y){
		this.x = x;
		this.y = y + 25;
		this.width = 10;
		this.height = 2;
		this.speed = 4;
		this.draw = function(){
			ctx.drawImage(enemy_bullet, this.x, this.y);
			this.update();
		};
		this.update = function(){
			if(collision(this,hero)){
				var ebi = enemy_shots.indexOf(this);
				enemy_shots.splice(ebi,1);
				hero.energy -= 5;
			}
			if(this.x < -10)
			{
				var ebi = enemy_shots.indexOf(this);
				enemy_shots.splice(ebi,1);
			}
			this.x -= this.speed;
		}
	}

	function Enemy() {
		this.x = cw + Math.floor(Math.random()*100);
		this.y = Math.floor(Math.random()*ch-50);
		this.width = 60;
		this.height = 50;
		this.speed = 3;
		this.draw = function(){
			ctx.drawImage(enemy,srcX,srcY,this.width,this.height, this.x, this.y, this.width, this.height);
			this.update();
		};
		this.update = function(){
			this.fire();
			if(this.x < 0 - this.width){
				var ei = enemy.indexOf(this);
				enemy.splice(ei,1);
			} 
			this.x -= this.speed;
		};
		this.fire = function(){
			var chance = Math.floor(Math.random()*100);
			if(chance > 98) {
				enemy_shots.push(new enemyBullet(this.x, this.y));
			}
		}
	}

});