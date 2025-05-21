const block_size=20;


const canvas=document.getElementById('gameCanvas');
const scoreDisplay=document.getElementById('score');
const ctx=canvas.getContext('2d');
let dino,obstacles,gravity,score,gameInterval,gameInProgress,paused=false;

function startGame(){
    dino={x:20,y:canvas.height-120,height:120,width:30,dy:0,jump:false};
    obstacles=[];
    gravity=1.5;
    score=0;
    if(gameInterval){
        clearInterval(gameInterval);
    }
    gameInterval=setInterval(updateGame,100);
    gameInProgress=true;
}

    
function drawObstacle(ob){
    ctx.fillStyle='red';
    ctx.fillRect(ob.x,ob.y,ob.width,ob.height);
}

function drawDino(){
    ctx.fillStyle='green';
    ctx.fillRect(dino.x,dino.y,dino.width,dino.height);
}


function generateObstacle(){
    let y=(0.1+(0.9*Math.random()))*block_size*4;
    obstacles.push({x:canvas.width,y:canvas.height-y,width:block_size,height:y})
}

function overlap(ob){
    return ( 
        ((dino.x+dino.width>ob.x && dino.x+dino.width<ob.x+ob.width) 
        || 
        (dino.x>ob.x && dino.x<ob.x+ob.width))  
        && 
        (dino.y+dino.height>canvas.height-ob.height)
     ) ;
}

function checkCollision(){
    for(let ob of obstacles){
        console.log(ob.x,ob.x+ob.width,ob.y,ob.y+ob.width)
        if(overlap(ob)){
            return true;
        }
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
    if(dino.jump && gameInProgress){
        dino.dy+=gravity;
        dino.y+=dino.dy;
        if(dino.y<100){
            dino.dy=0;
        }
        else if(dino.y>=canvas.height-100){
            dino.dy=0;
            dino.y=canvas.height-100;
            dino.jump=false;
        }
    }
    
    obstacles=obstacles.filter(ob=>ob.x+ob.width>0);
    drawDino();
    obstacles.forEach(drawObstacle);
    if(gameInProgress){
    if(Math.random()<=0.02) generateObstacle();
    obstacles.forEach(ob=>ob.x-=5);
    score++;}
    scoreDisplay.innerText=' Score: '+score;
}

document.addEventListener('keydown',(event)=>{
    if(!gameInProgress) return;
    if(event.code=='Space'){
        dino.jump=true;
        dino.dy=-15;
        event.preventDefault(); 
    }
});

document.getElementById('startButton').addEventListener('click',startGame);
document.getElementById('pauseButton').addEventListener('click',()=>{
    if(!gameInterval) return ;
    if(gameInProgress && gameInProgress){
        gameInProgress=false;
        pauseButton.innerText=' Resume ';
    }
    else if(!gameInProgress){
        gameInProgress=true;
        pauseButton.innerText=' Pause ';
    }
});
document.getElementById('stopButton').addEventListener('click', ()=>{
    if(gameInterval){
        clearInterval(gameInterval);
    }
    obstacles=[];
    dino={};
    score;
    gameInProgress=false;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    scoreDisplay.innerText=' Score: '+score;
});