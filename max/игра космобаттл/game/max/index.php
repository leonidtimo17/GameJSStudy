<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>SpaceBattle Game</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div class="bg">
		<div class="start_page">
			<img src="images/logo.png" alt="logo" id="logo">
			<div class="rules">
				<p>1. Управление кнопками W A S D</p>
				<p>2. Выстрел кнопкой <img src="images/spacebar.png" alt="spacebar" width="150" height="28"></p>
				<p>3. Остерегайтесь астероидов <img src="images/aster.png" alt="aster"></p>
				<p>3. Уничтожайте врагов <img src="images/one_enemy.png" alt="enemy"></p>
				<p>3. Ваши союзники <img src="images/one_helper.png" alt="helper"></p>
				<p>4. Собирайте топливо <img src="images/fuel.png" alt="fuel"></p>
			</div>
			<input type="text" id="inp_start" placeholder="Введите никнейм">
			<button id="btn_start">НАЧАТЬ ИГРУ</button>

		</div>
		<div class="game_page">
			<img src="images/logo.png" alt="logo" id="logo">
			<div class="interface">
				<button id="pause_btn">ПАУЗА</button>
				<!-- КНОПКА ЗВУКА -->
				<img src="images/sound.png" alt="sound" id="sound">
				<p>Размер шрифта: </p>
				<button id="plusFont" class="fontBtn">+</button>
				<button id="minusFont" class="fontBtn">-</button>
			</div>
			
			<canvas id="canvas"></canvas>
		</div>
		<div class="result_page">
			<div class="table_score">
				<p>Ваш результат: <span id="user_score">0</span> за <span id="user_time">0</span> секунд.</p>
				<div id="out_scores"></div>
				<button id="restart">СЫГРАТЬ ЗАНОВО</button>
			</div>
		</div>
	</div>
	
	
	<script src="jquery.min.js"></script>
	<script src="main.js"></script>
</body>
</html>