// Enemies our player must avoid
var Enemy = function(a, b, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.a = a;
    this.b = b;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.a += this.speed * dt;

    //reset enemy position when off canvas 
    if (this.a > 550) {
        this.a = -100;
        this.speed = 100 + Math.floor(Math.random() * 250);
    }

    //check for collission
    if (player.a < this.a + 50 && 
        player.a + 50 > this.a && 
        player.b < this.b + 25 && 
        player.b + 25 > this.b) {
        player.a = 200;
        player.b = 300;
        alert('You got caught. Try again!');
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let newPlayer = function(a, b, speed) {
    this.a = a;
    this.b = b;

    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

newPlayer.prototype.update = function() {
    //make sure player doesn't go off canvas
    if (this.a > 400 || this.b > 380) {
        this.a = 400;
        this.b = 380;
    }

    if (this.a < 0) {
        this.a = 0;
    }

    if (this.b < 0) {
        this.a = 200;
        this.b = 380;
        alert('Congrats, you made it!');
    }
};

newPlayer.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
};

newPlayer.prototype.handleInput = function(direction) {    
    if (direction == 'left' && this.a > 0) {
        this.a -= 100;
    }
    if (direction == 'right' && this.a < 400) {
        this.a += 100;
    }
    if (direction == 'up' && this.b > 0) {
        this.b -= 80;
    }
    if (direction == 'down' && this.b < 400) {
        this.b += 80;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

let player = new newPlayer(200, 300, 50);

let enemyInitialPos = [60, 140, 220];
let enemy;

enemyInitialPos.forEach(function(positionY) {
    enemy = new Enemy(0, positionY, 100 + Math.floor(Math.random() * 100));
    allEnemies.push(enemy);
});
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
