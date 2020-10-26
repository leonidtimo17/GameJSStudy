$(function(){
	//СОСТОЯНИЕ КНОПКИ
	var btn = false;
	var nickname = '';
	var game = false;

	//звуки
	var sound_shot = new Audio("sounds/shot.mp3");
	var sound_bg = new Audio("sounds/bg.mp3");
	sound_bg.loop = true;
	sound_bg.play();
	var status_sound = true;
	$('#sound').click(function(){
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

	//ПРОВЕРКА НИКНЕЙМА
	$('#inp_start').keyup(function(){
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

	//шрифты
	var fontSize = 15;
	$('#plusFont').click(function(){
		fontSize++;
	});
	$('#minusFont').click(function(){
		fontSize--;
	});

	//КЛИК ПО СТАРТОВОЙ КНОПКЕ
	$('#btn_start').click(function(){
		if(btn == true)
		{
			//СТАРТОВАЯ
			$('.start_page').fadeOut('slow', function()
			{
				$('.start_page').remove();
				$('.game_page').css('display','flex');
				//старт игры канваса
				game = true;
				draw();
				timerT();
				fuel_init();
				spawnAster();
				createEnemy();
				createHelpers();
			})
		}
		else
		{
			alert("введите никнейм в соответствующее поле");
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

				
				player.fuel -= 1;

			}
			
		},1000);
	};

	//топливо
	var fuels = [];

	function fuel_draw()
	{
		for(var i = 0; i < fuels.length; i++)
		{
			fuels[i].draw();
		}
	}
	
	function fuel_init()
	{
		setInterval(function(){ fuels.push(new Fuel()); },5000);
	}

	function Fuel(){
		this.x = cw + Math.floor(Math.random()*100);
		this.y = Math.floor(Math.random()*ch+20);
		this.width = 15;
		this.height = 15;
		this.speed = 4;
		this.draw = function(){
			ctx.drawImage(fuelIcon, this.x, this.y);
			this.update();
		};
		this.update = function(){

				deleteFuel();

				this.x -= this.speed;

			

		};
	};



	function deleteFuel(){
		for(var i = 0; i < fuels.length; i++)
		{
			if(fuels[i].x < player.x + player.width && fuels[i].x + fuels[i].width > player.x && fuels[i].y < player.y + player.height && fuels[i].y + fuels[i].height > player.y)
			{
				
				player.fuel += 15;
				if(player.fuel >= 30) player.fuel = 30;
				fuels.splice(i,1);

			}
			else if(fuels[i].x <= 0)
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
		this.x = player.x + player.width;
		this.y = player.y + player.height/2;
		this.width = 10;
		this.height = 2;
		this.speed = 6;
		this.shoot = function(){
			ctx.drawImage(bullet,this.x,this.y);
			this.x += this.speed;

			for(var i in helpers)
			{
				if(collision(this,helpers[i]))
				{
					var helperIndex = helpers.indexOf(helpers[i]);
					helpers.splice(helperIndex,1);
					var shotIndex = shots.indexOf(this);
					shots.splice(shotIndex,1);
					player.score -= 15;
				}
			}
			for(var i in enemys)
			{
				if(collision(this,enemys[i]))
				{
					var enemyIndex = enemys.indexOf(enemys[i]);
					enemys.splice(enemyIndex,1);
					var shotIndex = shots.indexOf(this);
					shots.splice(shotIndex,1);
					player.score += 15;
				}
			}
			for(var i in asteroids)
			{
				if(collision(this,asteroids[i]))
				{
					var asterIndex = asteroids.indexOf(asteroids[i]);
					asteroids.splice(asterIndex,1);
					var shotIndex = shots.indexOf(this);
					shots.splice(shotIndex,1);
				}
			}
		};

	};

	function Bullet_Aster(){

	}

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

		if(e.keyCode == 80) //КНОПКА ПАУЗА P
		{
			if (game)
			{
				game = false;
			}
			else
			{
				game = true;
			}

			e.preventDefault();
		}

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

	//ПАУЗА
	$('#pause_btn').click(function(){
		if (game)
			{
				game = false;
			}
			else
			{
				game = true;
			}
	});

	//инициализация
	function ui(){
		//вывод ника
		ctx.font = fontSize + "px Arial";
		ctx.fillStyle = 'white';
		ctx.fillText('Player: ' + nickname, 10, 20);
		ctx.fillText('Timer: ' + timer, 220, 20);
		ctx.fillText('Fuel: ' + player.fuel, 320, 20);
		ctx.fillText('Score: ' + player.score, 420, 20);
		//вывод таймера
		ctx.drawImage(timerIcon, 200,5);
		//вывод топлива
		ctx.drawImage(fuelIcon, 300,7);
	}
	var temp = 0;

	//инициализация всего процесса
	function draw(){
		//рисуем с 60 фпс
		if(game == true) //ПАУЗА ДА ИЛИ НЕТ
		{

			tick++;
			ctx.clearRect(0,0,cw,ch);

			drawPlanets();

			ui();
			player.draw();
			player.update();
			drawShots();
			fuel_draw();
			drawAster();
			drawEnemy();
			drawHelpers();
			drawEnemyBullets();

			if(player.fuel <= 0) {
					//ОКОНЧАНИЕ ИГРЫ
					cancelAnimationFrame(myReq);
					console.log('gg');
					game = false;
					add_Score();
					$('.result_page').css('display','flex');
					$('#user_score').html(player.score);
					$('#user_time').html(timer);
					
				}

			shipAnimate();

		}
		else
		{
			temp = timer;
		}
		

		myReq = requestAnimationFrame(draw);
	}	


	//загрузка изображений ПРЕООАД
	var ship = new Image();
	ship.src = "images/ship_2.png";
	var timerIcon = new Image();
	timerIcon.src = "images/timer.png";
	var fuelIcon = new Image();
	fuelIcon.src = "images/fuel.png";
	var bullet = new Image();
	bullet.src = "images/bullet.png";
	var aster = new Image();
	aster.src = "images/aster.png";
	var enemy = new Image();
	enemy.src = "images/enemy.png";
	var helper = new Image();
	helper.src = "images/helper.png";
	var enemy_bullet = new Image();
	enemy_bullet.src = "images/enemy_bullet.png";

	//планеты
	var planet1 = new Image();
	planet1.src = "images/planet1.png";
	var planet2 = new Image();
	planet2.src = "images/planet2.png";
	var planet3 = new Image();
	planet3.src = "images/planet3.png";
	var planet4 = new Image();
	planet4.src = "images/planet4.png";
	var planet5 = new Image();
	planet5.src = "images/planet5.png";

	//вывод планет
	var planet_1 = new Planet(Math.floor(Math.random()*(cw+300)+50),Math.floor(Math.random()*(ch)+0),1);
	var planet_2 = new Planet(Math.floor(Math.random()*(cw+300)+50),Math.floor(Math.random()*(ch)+0),2);
	var planet_3 = new Planet(Math.floor(Math.random()*(cw+300)+50),Math.floor(Math.random()*(ch)+0),1);
	var planet_4 = new Planet(Math.floor(Math.random()*(cw+300)+50),Math.floor(Math.random()*(ch)+0),2);
	var planet_5 = new Planet(Math.floor(Math.random()*(cw+300)+50),Math.floor(Math.random()*(ch)+0),3);

	function drawPlanets(){
		planet_1.draw(planet1);
		planet_2.draw(planet2);
		planet_3.draw(planet3);
		planet_4.draw(planet4);
		planet_5.draw(planet5);
	};	

	//объект планета
	function Planet(x,y,speed){
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

	//АСТЕРОИДЫ
	var asteroids = [];

	function Asteroid(){
		this.width = 60;
		this.height = 60;
		this.x = cw + Math.floor(Math.random()*100);
		this.y = Math.floor(Math.random()*ch+20);
		this.draw = function(){
			ctx.drawImage(aster, this.x , this.y);
			this.update();
		};
		this.update = function(){
			deleteAster();
			this.x -= 3;
		};
	};

	function drawAster(){
		for(var i = 0; i < asteroids.length; i++)
		{
			asteroids[i].draw();
		}
	}

	function spawnAster()
	{
		setInterval(function(){
			asteroids.push(new Asteroid);
		},4000);
	};

	function deleteAster(){
		for(var i = 0; i < asteroids.length; i++){
			if(asteroids[i].x < player.x + player.width && asteroids[i].x + asteroids[i].width > player.x && asteroids[i].y < player.y + player.height && asteroids[i].y + asteroids[i].height > player.y)
			{
				console.log('hitted');
				asteroids.splice(i,1);
				player.fuel -= 15;
			}
			else if(asteroids[i].x < 0)
			{
				asteroids.splice(i,1);
			}
		}	
	};

	//ИГРОК
	function Player(){
		this.x = 15;
		this.y = 200;
		this.width = 60;
		this.height = 50;
		this.score = 0;
		this.fuel = 15;
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
	var player = new Player();





	//враги
	var enemys = [];

	function createEnemy(){
		setInterval(function(){
			enemys.push(new Enemy());
		},3000);
	}

	function drawEnemy(){
		for(var i in enemys){
			enemys[i].draw();
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
			if(collision(this,player)){
				var ebi = enemy_shots.indexOf(this);
				enemy_shots.splice(ebi,1);
				player.fuel -= 5;
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
				var ei = enemys.indexOf(this);
				enemys.splice(ei,1);
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



	//союзники
	var helpers = [];

	function createHelpers(){
		setInterval(function(){
			helpers.push(new Helper());
		},5000);
	}

	function drawHelpers(){
		for(var i in helpers){
			helpers[i].draw();
		}
	}

	function Helper() {
		this.x = cw + Math.floor(Math.random()*190);
		this.y = Math.floor(Math.random()*ch-50);
		this.width = 60;
		this.height = 50;
		this.speed = 3;
		this.draw = function(){
			ctx.drawImage(helper,srcX,srcY,this.width,this.height, this.x, this.y, this.width, this.height);
			this.update();
		};
		this.update = function(){
			if(this.x < 0 - this.width){
				var hi = helpers.indexOf(this);
				helpers.splice(hi,1);
			} 
			this.x -= this.speed;
		};
	}




	//внести данные
	function add_Score(){
		var nick = nickname;
		var score = player.score;
		var time = timer;
		console.log(nick + " " + score + " " + time);
		$.post("add.php",
	    {
	        name : nick,
	        score : score,
	        time : time
	    },
    function(data, status){
        console.log("added");
        upload_Table_Score();
    });
	};

	//таблица рекордов
	function upload_Table_Score(){
			$.ajax({
			  url: "table.php",
			  success: function(data){
			    $('#out_scores').html(data);
			  }
			});
	};


	$('#restart').click(function(){
		location.reload();
	});








});