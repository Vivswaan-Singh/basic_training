const block_size=20;
const Direction={
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    UP: 'UP',
    DOWN: 'DOWN'
};

const canvas=document.getElementById('gameCanvas');
const scoreDisplay=document.getElementById('score');
const ctx=canvas.getContext('2d');
let snake,food,direction,score,gameInterval,gameInProgress,paused=false;

function startGame(){
    snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];
    food={x:5,y:5};
    direction=Direction.DOWN;
    score=0;
    if(gameInterval){
        clearInterval(gameInterval);
    }
    gameInterval=setInterval(updateGame,100);
    gameInProgress=true;
}

function drawSnake(){
    snake.forEach((segment,index)=>{
        if(index==0){
            ctx.fillStyle='lime';
        }
        else{
            ctx.fillStyle='green';
        }
        ctx.fillRect(segment.x*block_size,segment.y*block_size,block_size,block_size)
    });
}

function drawFood(){
    ctx.fillStyle='red';
    ctx.fillRect(food.x*block_size,food.y*block_size,block_size,block_size);
}

function moveSnake(){
    if(!gameInProgress) return ;

    let x=snake[0].x;
    let y=snake[0].y;
    if(direction==Direction.DOWN) y++;
    if(direction==Direction.UP) y--;
    if(direction==Direction.LEFT) x--;
    if(direction==Direction.RIGHT) x++;

    snake.unshift({x,y});

    if(x==food.x && y==food.y){
        score++;
        generateFood();
    }
    else{
        snake.pop();
    }

}


function generateFood(){
    let x,y;
    let flag=true;
    do{
        x=Math.floor(Math.random()*(canvas.width/block_size));
        y=Math.floor(Math.random()*(canvas.height/block_size));

        flag=false;

        for(let i=0;i<snake.length && flag==false;i++){
        if(x==snake[i].x && y==snake[i].y){
            flag=true;
        }

    }
    }while(flag==true);
    food={x,y};
}



function checkCollision(){
    const head=snake[0];
    if(head.x<0 || head.x>=canvas.width/block_size || head.y<0 || head.y>=canvas.height/block_size) return true;
    for(let i=1;i<snake.length;i++){
        if(head.x==snake[i].x && head.y== snake[i].y) return true;
    }
    return false;
}

function updateGame(){
    if(checkCollision()){
        clearInterval(gameInterval);
        gameInProgress=false;
        scoreDisplay.innerText=' Score: '+score;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawSnake();
    drawFood();
    moveSnake();
    scoreDisplay.innerText=' Score: '+score;
}

document.addEventListener('keydown',(event)=>{
    if(!gameInProgress) return;
     switch(event.key){
        case 'ArrowUp': case 'w': if(direction!=Direction.DOWN){ direction=Direction.UP; event.preventDefault(); }break;
        case 'ArrowDown': case 's': if(direction!=Direction.UP){ direction=Direction.DOWN; event.preventDefault(); }break;
        case 'ArrowLeft': case 'a': if(direction!=Direction.RIGHT){ direction=Direction.LEFT; event.preventDefault(); }break;
        case 'ArrowRight': case 'd': if(direction!=Direction.LEFT){ direction=Direction.RIGHT; event.preventDefault(); }break; 
     }
});

document.getElementById('startButton').addEventListener('click',startGame);
document.getElementById('pauseButton').addEventListener('click',()=>{
    if(!gameInterval) return ;
    if(gameInProgress){
        gameInProgress=false;
        pauseButton.innerText=' Resume ';
    }
    else{
        gameInProgress=true;
        pauseButton.innerText=' Pause ';
    }
});
document.getElementById('stopButton').addEventListener('click', ()=>{
    if(gameInterval){
        clearInterval(gameInterval);
    }
    snake=[];
    food={};
    gameInProgress=false;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    scoreDisplay.innerText=' Score: '+score;
});