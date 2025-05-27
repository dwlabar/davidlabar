const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const gameOverScreen = document.getElementById('gameOverScreen');
const retryButton = document.getElementById('retryButton');

const scale = 20;
const rows = 20;
const cols = 20;
canvas.width = cols * scale;
canvas.height = rows * scale;

let snake;
let direction;
let food;
let gameInterval;
let score;
let highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
highScoreEl.textContent = highScore;

function initGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 1, y: 0 };
  food = randomPosition();
  score = 0;
  scoreEl.textContent = score;
  gameOverScreen.style.display = 'none';

  clearInterval(gameInterval);
  gameInterval = setInterval(update, 100);
}

window.addEventListener('keydown', e => {
  const key = e.key;
  if (key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
  if (key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
  if (key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
  if (key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
});

retryButton.addEventListener('click', initGame);

function update() {
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // Collision detection
  if (
    head.x < 0 || head.x >= cols ||
    head.y < 0 || head.y >= rows ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    clearInterval(gameInterval);
    gameOverScreen.style.display = 'flex';
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('snakeHighScore', highScore);
      highScoreEl.textContent = highScore;
    }
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    food = randomPosition();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x * scale, food.y * scale, scale, scale);

  // Draw snake
  ctx.fillStyle = '#0f0';
  snake.forEach(seg => {
    ctx.fillRect(seg.x * scale, seg.y * scale, scale, scale);
  });
}

function randomPosition() {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows)
    };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

initGame();
