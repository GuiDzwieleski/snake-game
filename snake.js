// Definindo o canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamanho da célula e a cobrinha
const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: 160, y: 160 }];
let direction = 'right';
let food = { x: 200, y: 200 };
let score = 0; // Variável de pontuação
let gameOver = false; // Variável de controle de game over
let gameInterval; // Variável para armazenar temporizador de 100ms

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

    // Se o jogo acabou, desenha a tela de Game Over
 if (gameOver) {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvasSize / 4, canvasSize / 2);

    // Texto informando sobre a tecla "R" para reiniciar
    ctx.font = '20px Arial';
    ctx.fillText('Pressione "R" para reiniciar', canvasSize / 4, canvasSize / 1.8);
 }

 // Exibir a pontuação na tela
 ctx.fillStyle = 'black';
 ctx.font = '20px Arial';
 ctx.fillText('Pontuação: ' + score, 10, 20);
}

// Função para mover a cobrinha
function move() {
    const head = { ...snake[0] };

    if (direction === 'right') head.x += gridSize;
    if (direction === 'left') head.x -= gridSize;
    if (direction === 'up') head.y -= gridSize;
    if (direction === 'down') head.y += gridSize;

    // Verificando colisão com as bordas
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver = true;
        return; // Se o jogo acabou, não move a cobrinha (Bordas)
    }

    // Verificando colisão com o próprio corpo
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        return; // Se o jogo acabou, não move a cobrinha (Corpo)
    }

    snake.unshift(head);

    // Verificando se a cobrinha comeu a comida
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        score++; // Incrementando a pontuação
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
    if (!gameOver) { // Só atualiza o jogo se não estiver em estado de game over
        move();
        draw();
        }
}

// Função principal que atualiza a cada 100ms
function gameLoop() {
    updateGame();
    gameInterval = setTimeout(gameLoop, 100); // Armazenando o temporizador em uma variável
}

// Função para reiniciar o jogo
function restartGame() {
    // Resetando o estado do jogo
    snake = [{ x: 160, y: 160 }];
    direction = 'right';
    food = { x: 200, y: 200 };
    score = 0; // Resetando a pontuação
    gameOver = false; // Resetando o estado de Game Over
    ctx.clearRect(0, 0, canvasSize, canvasSize) // Limpando a tela

    // Limpa o temporizador anterior
 clearTimeout(gameInterval);

 // Inicia o loop novamente
 gameLoop();

}

// Iniciando o jogo
document.addEventListener('keydown', (event) => {
    changeDirection(event);
    // Verificando se a tecla "R" foi pressionada para reiniciar o jogo
    if (gameOver && event.key === 'r') {
        restartGame();
    }
});
gameLoop(); // Começando o jogo