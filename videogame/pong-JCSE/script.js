const game = document.getElementById('game');
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const ball = document.getElementById('ball');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');

let paddle1Y = 250;
let paddle2Y = 250;
let ballX = 390;
let ballY = 290;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Score = 0;
let player2Score = 0;
let gameLoop;

// Crear elementos de audio
const paddleHitSound = new Audio('res/paddle_hit.mp3');
const wallHitSound = new Audio('res/wall_hit.mp3');
const scoreSound = new Audio('res/score.mp3');
const winnerSound = new Audio('res/winner.mp3');
const loserSound = new Audio('res/loser.mp3');
const startSound = new Audio('res/start.mp3');

// Reproducir sonido de inicio
startSound.play();

function movePaddle1(event) {
	const gameRect = game.getBoundingClientRect();
	paddle1Y = event.clientY - gameRect.top - 50;
	paddle1.style.top = paddle1Y + 'px';
}

function movePaddle2() {
	const paddle2YCenter = paddle2Y + 50;
	const ballYCenter = ballY + 10;

	if (paddle2YCenter < ballYCenter && paddle2Y < 500) {
		paddle2Y += 7;
	} else if (paddle2YCenter > ballYCenter && paddle2Y > 0) {
		paddle2Y -= 7;
	}

	paddle2.style.top = paddle2Y + 'px';
}

function stopAllSounds() {
	paddleHitSound.pause();
	paddleHitSound.currentTime = 0;
	wallHitSound.pause();
	wallHitSound.currentTime = 0;
	scoreSound.pause();
	scoreSound.currentTime = 0;
	winnerSound.pause();
	winnerSound.currentTime = 0;
	loserSound.pause();
	loserSound.currentTime = 0;
}

function moveBall() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	ball.style.left = ballX + 'px';
	ball.style.top = ballY + 'px';

	if (ballY <= 0 || ballY >= 580) {
		ballSpeedY = -ballSpeedY;
		stopAllSounds();
		wallHitSound.play();
		ball.classList.add('wall-hit');
		setTimeout(() => ball.classList.remove('wall-hit'), 100);
		// Efecto visual en la pelota al golpear las paredes
		ball.style.transform = 'scale(1.2)';
		setTimeout(() => ball.style.transform = 'scale(1)', 100);
	}

	if (ballX <= 30) {
		if (ballY > paddle1Y && ballY < paddle1Y + 100) {
			ballSpeedX = -ballSpeedX;
			ballSpeedX *= 1.05;
			ballSpeedY *= 1.05;
			stopAllSounds();
			paddleHitSound.play();
			paddle1.classList.add('paddle-hit');
			setTimeout(() => paddle1.classList.remove('paddle-hit'), 100);
			// Efecto visual en la pelota al golpear la paleta
			ball.style.transform = 'scale(1.2)';
			setTimeout(() => ball.style.transform = 'scale(1)', 100);
		} else {
			player2Score++;
			score2.textContent = player2Score;
			stopAllSounds();
			scoreSound.play();
			ball.classList.add('right-wall-hit');
			setTimeout(() => ball.classList.remove('right-wall-hit'), 100);
			resetBall();
		}
	}

	if (ballX >= 750) {
		if (ballY > paddle2Y && ballY < paddle2Y + 100) {
			ballSpeedX = -ballSpeedX;
			ballSpeedX *= 1.05;
			ballSpeedY *= 1.05;
			stopAllSounds();
			paddleHitSound.play();
			paddle2.classList.add('paddle-hit');
			setTimeout(() => paddle2.classList.remove('paddle-hit'), 100);
			// Efecto visual en la pelota al golpear la paleta
			ball.style.transform = 'scale(1.2)';
			setTimeout(() => ball.style.transform = 'scale(1)', 100);
		} else {
			player1Score++;
			score1.textContent = player1Score;
			stopAllSounds();
			scoreSound.play();
			ball.classList.add('left-wall-hit');
			setTimeout(() => ball.classList.remove('left-wall-hit'), 100);
			resetBall();
		}
	}

	if (player1Score === 11 && player1Score >= player2Score + 2) {
		stopAllSounds();
		winnerSound.play();
		alert("Player 1 wins!");
		resetGame();
	} else if (player2Score === 11 && player2Score >= player1Score + 2) {
		stopAllSounds();
		loserSound.play();
		alert("Player 2 wins!");
		resetGame();
	}
}

function resetBall() {
	ballX = 390;
	ballY = 290;
	ballSpeedX = 5;
	ballSpeedY = 5;
	ball.style.left = ballX + 'px';
	ball.style.top = ballY + 'px';
}

function resetGame() {
	player1Score = 0;
	player2Score = 0;
	score1.textContent = player1Score;
	score2.textContent = player2Score;
	resetBall();
	// Reproducir sonido de inicio al resetear el juego
	startSound.play();
}

game.addEventListener('mousemove', movePaddle1);

gameLoop = setInterval(() => {
	movePaddle2();
	moveBall();
}, 1000/60);
