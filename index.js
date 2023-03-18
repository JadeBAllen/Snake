//This is for the canvas
const gameBoard = document.querySelector("#gameBoard");
//This is to paint on the canvas. Also ctx is for context
const ctx = gameBoard.getContext("2d");
//This is for the the score number
const scoreText = document.querySelector("#scoreText");
//This is for the reset button
const resetBtn = document.querySelector("#resetBtn");
//This is to hold the width of the game board
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

//COLORS
//This is for the board background
const boardBackground = "forestgreen";
const snakeColor = "brown";
const snakeBorder = "black";
const foodColor = "beige";

//SIZES
//The size of everything in the game
const unitSize = 25;
let running = false;
//Determines How far we move on the x axis
//Therefore we will move 25 pixels every game tick
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

//THE SNAKE
//The snake will be an array of objects
//Each object is a part of the snake
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

//This layout calls the functions in order
gameStart();

//THE FUCTIONS THAT WE NEED

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else {
        displayGameOver();
    }
};
function clearBoard() { 
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight)
};
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min)/ unitSize) * unitSize
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood() { 
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake() { 
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY) {
        score +=1;
        scoreText.textContent = score;
        createFood();
    }
    else {
        snake.pop();
    }
};
function drawSnake() { 
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event) { 
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch (true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
};
function checkGameOver() { 
    switch (true) {
        case(snake[0].x < 0):
            running = false;
            break;
        case(snake[0].x >= gameWidth):
            running = false;
            break;
        case(snake[0].y < 0):
            running = false;
            break;
        case(snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver() { 
    ctx.font = "50px Impact";
    ctx.fillStyle = "deepskyblue";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER, LOSER", gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame() { 
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart();
};