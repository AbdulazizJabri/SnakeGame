const canvas = document.getElementById("snakeGame");
const context = canvas.getContext("2d");

const box = 32;

const ground = new Image();
ground.src = "images/base.png";

const gameover = new Image();
gameover.src = "images/gameover.png";

const foodImg = new Image();
foodImg.src = "images/food.png";

let dead = new Audio();
let eat = new Audio();

let snake = [];

snake[0] =
{
    x : 9 * box,
    y : 10 * box
};


let food =
{
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}


let score = 0;

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if ( key == 37 && d != "RIGHT")
    {
        d = "LEFT";
    }
    else if (key == 38 && d != "DOWN")
    {
        d = "UP";
    }
    else if (key == 39 && d != "LEFT")
    {
        d = "RIGHT";
    }
    else if (key == 40 && d != "UP")
    {
        d = "DOWN";
    }
}

function collision(head,array)
{
    for (let i = 0; i < array.length; i++)
    {
        if (head.x == array[i].x && head.y == array[i].y)
        {
            return true;
        }
    }
    return false;
}


function draw()
{

    context.drawImage(ground,0,0);

    for ( let i = 0; i < snake.length ; i++)
    {
        context.fillStyle = ( i == 0 )? "red" : "red";
        context.fillRect(snake[i].x,snake[i].y,box,box);

        context.strokeStyle = "black";
        context.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    context.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y)
    {
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }

    }
    else
    {
        snake.pop();
    }


    let newHead =
    {
        x : snakeX,
        y : snakeY
    }


    if (snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake))
    {
    clearInterval(game);
  	context.drawImage(gameover, 10, 10);

    let link = "snakeGameDesktop.html";
    let targetElement = document.getElementById("div1");
    targetElement.innerHTML = `<a href=${link}><img src="images/restart.png" alt="restart" style="height: 50px; margin-top: 30px"></a>`;

    }

    snake.unshift(newHead);

    context.fillStyle = "white";
    context.font = "35px Calibri";
    context.fillText(score,3.2*box,1.6*box);
}

let game = setInterval(draw,100);
