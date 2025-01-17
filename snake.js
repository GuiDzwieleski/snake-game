// Definindo o canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamanho da célula e a cobrinha
const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: 160, y: 160 }];
let direction = 'right';
let food = { x: 200, y: 200 };

// Função para desenhar o jogo
function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Desenhando a cobrinha
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize)
    });

    // Desenhando a comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize)
}

// Função para mover a cobrinha
function move() {
    const head = { ...snake[0] };

    if (direction === 'right') head.x += gridSize;
    if (direction === 'left') head.x -= gridSize;
    if (direction === 'up') head.y -= gridSize;
    if (direction === 'down') head.y += gridSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }
}

// Função para gerar comida aleatória
function generateFood() {
    let x = Math.floor(Math.random() * (canvasSize / gridSize)) *gridSize;
    let y = Math.floor(Math.random() * (canvasSize / gridSize)) *gridSize;
    return { x, y };
}

// Função para controlar a direção da Cobrinha
function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
}

// Função para atualizar o jogo
function updateGame() {
    move();
    draw();
}

// Função principal que atualiza a cada 100ms
function gameLoop() {
    updateGame();
    setTimeout(gameLoop, 100);
}

// Iniciando o jogo
document.addEventListener('keydown', changeDirection);
gameLoop();