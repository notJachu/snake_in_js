var player;
var dir;
var score;
var tail = [];
var prevX, prevY;

document.addEventListener('keydown', (event) => {
    var name = event.key;
    switch(name){
        case 'ArrowUp':
            if(dir == 'down') break;
            dir = 'up';
            break;

        case 'ArrowDown':
            if(dir == 'up') break;
            dir = 'down';
            break;
        
        case 'ArrowLeft':
            if(dir == 'right') break;
            dir = 'left';
            break;

        case 'ArrowRight':
            if(dir == 'left') break;
            dir = 'right';
            break;

        default:
            //do nothing
            break;
    }
}, false);

function startGame(){
    game.start();
    player = new component(25, 25, "red", 275, 275);
    //prevX = 275;
   // prevY = 300;
    tail[0] = new component(25, 25, "yellow", 275, 300);
    enemy = new component(25, 25, "blue", getEnemyPos(), getEnemyPos());
}

var game = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 575;
        this.canvas.height = 575;
        dir = 'none';
        score = 0;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        document.getElementById("score").innerHTML = score;
        this.interval = setInterval(updateGame, 500);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = game.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function drawTail(){
       /* tail[0].x = prevX;
        tail[0].y = prevY;
        tail[0].update();
        for(var i = 0; i < tail.length; i++){
            tail[i].x = tail[i-1].x;
            tail[i].y = tail[i-1].y;
            tail[i].update();
    }
    */
    for(var i = tail.length - 1 ; i>0; i--){
        tail[i].x = tail[i-1].x;
        tail[i].y = tail[i-1].y;
        tail[i].update();
        console.log(tail[i].x);
        console.log(tail[i].y);
    }
    tail[0].x = prevX;
    tail[0].y = prevY;
    tail[0].update();
}

function getEnemyPos() {
    var a = (Math.round(Math.random() * 22)) * 25;
    console.log(a);
    return a;
  }

function move(dir){
    switch(dir){
        case 'up':
            player.y -=25;
            break;

        case 'down':
            player.y +=25;
            break;
        
        case 'left':
            player.x -=25;
            break;

        case 'right':
            player.x +=25;
            break;

        default:
            //do nothing
            break;
    }
}

function checkCollision(dir){
    if(dir == 'up' && player.y == 0){
        alert(`your score ${score}`);
        game.stop();
        setTimeout(startGame, 250);
    }

    if(dir == 'down' && player.y == 550){
        alert(`your score ${score}`);
        game.stop();
        setTimeout(startGame, 250);
    }

    if(dir == 'left' && player.x == 0){
        alert(`your score ${score}`);
        game.stop();
        setTimeout(startGame, 250);
    }

    if(dir == 'right' && player.x == 550){
        alert(`your score ${score}`);
        game.stop();
        setTimeout(startGame, 250);
    }
}

function getPoint(){
    if(player.x == enemy.x && player.y == enemy.y){
        enemy.x = getEnemyPos();
        enemy.y = getEnemyPos();
       score++;
       //node = new component(25, 25, "yellow", tail[tail.length - 1].x, tail[tail.length - 1].y)
       tail.push(new component(25, 25, "yellow", tail[tail.length - 1].x, tail[tail.length - 1].y));
       document.getElementById("score").innerHTML = score;
    }
}

function updateGame(){
    console.log(tail.length);
    game.clear();
    checkCollision(dir);
    move(dir);
    getPoint();
    drawTail();
    player.update();
    prevX = player.x;
    prevY = player.y;
    enemy.update();
}
