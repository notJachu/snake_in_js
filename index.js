var player;
var dir;

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
    player = new component(50, 50, "red", 20, 335);
    enemy = new component(25, 25, "blue", getRndInteger(10,490), getRndInteger(10,490));
}

var game = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 550;
        this.canvas.height = 550;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGame, 500);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
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

function updateGame(){
    game.clear();
    move(dir);
    player.update();
    enemy.update();
}
