var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");

var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballDx = -2;
var ballDy = -1;
var ballRadius = 10;

var paddleHeight = 50;
var paddleWidth = 10;
var paddleOffset = 10;
var leftPaddleY = canvas.height/2 - paddleHeight/2;
var rightPaddleY = canvas.height/2 - paddleHeight/2;
var paddleDy = 5;

var leftUp = false;
var leftDown = false;

var rightUp = false;
var rightDown = false;

var leftScore = 0;
var rightScore = 0;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if(e.keyCode == 38) {
        rightUp = true;
    } else if(e.keyCode == 40) {
        rightDown = true;
    }

    if(e.keyCode == 81) {
        leftUp = true;
    } else if(e.keyCode == 65) {
        leftDown = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 38) {
        rightUp = false;
    } else if(e.keyCode == 40) {
        rightDown = false;
    }

    if(e.keyCode == 81) {
        leftUp = false;
    } else if(e.keyCode == 65) {
        leftDown = false;
    }
}

function reset() {
    leftPaddleY = canvas.height/2 - paddleHeight/2;
    rightPaddleY = canvas.height/2 - paddleHeight/2;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2 );
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function drawLeftPaddle() {
    ctx.beginPath();
    ctx.rect(paddleOffset, leftPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#3f3f3f";
    ctx.fill();
    ctx.closePath();
}

function drawRightPaddle() {
    ctx.beginPath();
    ctx.rect(canvas.width - paddleOffset - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#3f3f3f";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#3f3f3f";
    ctx.fillText(leftScore, 8, 20);
    ctx.fillText(rightScore, canvas.width - 42, 20);
}

function movePaddles() {
    if(rightUp && rightPaddleY > 0) {
        rightPaddleY -= paddleDy;
    } else if(rightDown && rightPaddleY+paddleHeight< canvas.height) {
        rightPaddleY += paddleDy;
    }

    if(leftUp && leftPaddleY > 0) {
        leftPaddleY -= paddleDy;
    } else if(leftDown && leftPaddleY+paddleHeight< canvas.height) {
        leftPaddleY += paddleDy;
    }
}

function collisionDetection() {
    if(ballX < 0 + ballRadius + paddleWidth + paddleOffset && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballDx *= -1;
    } else if( ballX > canvas.width - ballRadius - paddleWidth - paddleOffset && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballDx *= -1;
    } else if(ballX < 0 + ballRadius) {
        reset();
        rightScore++;
    } else if(ballX > canvas.width - ballRadius) {
        reset();
        leftScore++;
    } 
    if(ballY < 0 + ballRadius || ballY > canvas.height - ballRadius) {
        ballDy *= -1;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawLeftPaddle();
    drawRightPaddle();
    drawScore();
    movePaddles();
    ballX += ballDx;
    ballY += ballDy;
    collisionDetection();
    requestAnimationFrame(draw);
}

draw();