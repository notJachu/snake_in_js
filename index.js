var player;
var dir;
var score;

document.addEventListener('keydown', (event) => {
    var name = event.key;
    switch(name){
        case 'ArrowUp':
            dir = 'up';
            break;

        case 'ArrowDown':
            dir = 'down';
            break;
        
        case 'ArrowLeft':
            dir = 'left';
            break;

        case 'ArrowRight':
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

function getEnemyPos() {
    var a = (Math.round(Math.random() * 23)) * 25;
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
       document.getElementById("score").innerHTML = score;
    }
}

function updateGame(){
    game.clear();
    checkCollision(dir);
    move(dir);
    getPoint();
    player.update();
    enemy.update();
}
