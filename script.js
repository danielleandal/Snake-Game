
// gets the canvas 
const gameBoard = document.querySelector("#gameBoard");
// gets the context of the gameboard
const ctx = gameBoard.getContext("2d");
// gets the score text 
const scoreText = document.querySelector("#scoreText");
// selects the reset button
const resetBtn = document.querySelector("#resetBtn");
// gets the width of the gameboart
const gameWidth = gameBoard.width;
//gets the height of the gameboard
const gameHeight = gameBoard.height;

// attributes of the game
const boardBackground = "black";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 20; // size of everything within the game, 25px


let running = false; // checks if the game is running
let xVelocity = unitSize; // positive = right, negative = left
let yVeloxity = 0; // up and down

// calculates randomly
let foodX; 
let foodY;
let score = 0;

// the snake would be an array of object/parts
//each body part has an x and y coordinate
let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize *2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];


// listen for key events
window.addEventListener("keydown", changeDirection);
// listed to click
resetBtn.addEventListener("click", resetGame);

gameStart();

// THE FUNCTIONS ARE ALL CONNECTED 


function gameStart(){

    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};

//
function nextTick(){

    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75); // 75 is the speed 
    }
    else{
        displayGameOver();
    }
};

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0, gameWidth, gameHeight);
};

// gets a random index for the food coordinate which is global variable
function createFood(){

    // inner function, returns a random number
    function randomFood(min,max){
        // makes sure that we are within the game board
        const randNum = Math.round((Math.random() * (max - min ) +min) / unitSize) * unitSize;
        return randNum;
    }

    // passes the coordinates to the food variables
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);



}

//paint the food within the gameboard
function drawFood(){
    ctx.fillStyle = foodColor;

    // fillreact = fill a rectangle
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

function moveSnake(){
// xVelocity is how far we have moving in the x axis
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVeloxity};

    //n array method in JavaScript that adds one or more elements to the beginning of an array and returns the new length of the array.
    snake.unshift(head);

    // if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY ){

        //update score
        score+=1;
        scoreText.textContent = score;

        // creater a new food object
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    // javascript properties for canvas
    ctx.fillStyle = snakeColor;
    ctx.scoreStyle = snakeBorder;

    // since the snake is a array of objects, we iteratte thorugh it 
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    console.log(keyPressed);

    // each key has a unique code
    const LEFT = 37;
    const UP =38;
    const RIGHT = 39;
    const DOWN= 40;

    // boolen variables, determines which way the snake is heading
    const goingUP = (yVeloxity == -unitSize);
    const goingDOWN = (yVeloxity == unitSize);
    const goingRIGHT = (xVelocity == unitSize);
    const goingLEFT = (xVelocity == -unitSize);


    switch(true){
        // left key is pressed
        case(keyPressed == LEFT && !goingRIGHT):
            xVelocity = -unitSize; // go left
            yVeloxity = 0; // no up or down
            break;
            // up key
        case(keyPressed == UP && !goingDOWN):
            xVelocity = 0;
            yVeloxity = -unitSize;
            break;
            //right key
        case(keyPressed == RIGHT && !goingLEFT):
            xVelocity = unitSize;
            yVeloxity = 0;
            break;
            //down key
        case(keyPressed == DOWN && !goingUP):
            xVelocity = 0;
            yVeloxity = unitSize;
            break;
    }
};
function checkGameOver(){
    
    switch(true){
        // went over left borders
        case(snake[0].x < 0):
            running= false;
            break;
        
        case(snake[0].x > gameWidth-1):
            running= false;
            break;
        case(snake[0].y < 0):
            running= false;
            break;
        case(snake[0].y > gameHeight -1):
            running= false;
            break;
    }

    // self-collision
    for(let i =1; i < snake.length;i++){
        if((snake[i].x === snake[0].x) && (snake[i].y === snake[0].y))
        {
            running = false;
            return;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px Poppins";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    // puts it in the middle in height
    ctx.fillText("GAME OVER!" , gameWidth /2, gameHeight /2);
    running =false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVeloxity = 0;

    // the snake is in the corner again 
     snake = [
        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize *2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];

    // start the game
    gameStart();
    
};

