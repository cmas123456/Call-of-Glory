let currentPlayers = [];
let player = {};
let counter = 0;
let gravity = .1;
let walkAnimation = [];
let bulletArray = [];
let playerWalk1 = document.getElementById('walk1');
let playerWalk2 = document.getElementById('walk2');
let playerWalk3 = document.getElementById('walk3');
let playerWalk4 = document.getElementById('walk4');
let playerWalk5 = document.getElementById('walk5');
let playerWalk6 = document.getElementById('walk6');
let playerWalk7 = document.getElementById('walk7');
let playerWalk8 = document.getElementById('walk8');
let playerWalk9 = document.getElementById('walk9');
let redWalk1 = document.getElementById('redwalk1')
let redWalk2 = document.getElementById('redwalk2')
let redWalk3 = document.getElementById('redwalk3')
let redWalk4 = document.getElementById('redwalk4')
let redWalk5 = document.getElementById('redwalk5')
let redWalk6 = document.getElementById('redwalk6')
let redWalk7 = document.getElementById('redwalk7')
let redWalk8 = document.getElementById('redwalk8')
let redWalk9 = document.getElementById('redwalk9')
let bulletImg = document.getElementById('projectile');

function playerCreate(x,y,playerID = 1) {
    player = {
        playerID: playerID,
        origin:[x,y],
        dimensions:[24,32],
        image: playerWalk1,
        velocity: [0, 0],
        horizontalSpeed: 1,
        verticalSpeed: 1,
        lives: 5,
        attachedHorizontalSpeed: 0,
        attachedVerticalSpeed: 0,
        horAccel: 0,
        vertAccel: 0,
        animCounter: 0,
        jumpCounter: 0,
        counter: 0,
        direction: 'right',
        bulletCreate() {
            let bullet = {
                origin: [this.origin[0] + this.dimensions[0], this.origin[1] + (this.dimensions[1] / 2)],
                bulletID: this.playerID,
                dimensions: [10, 2],
                image : bulletImg,
                shouldKeepShowingBullet: true,
                horizontalSpeed: 5,
                travelDistance: 0,
                gravity: 1,
                direction: this.direction,
                Draw () {
                        context.drawImage(bullet.image, bullet.origin[0], bullet.origin[1], bullet.dimensions[0],  bullet.dimensions[1]);
                    }, 
                Move() {
                    if (bullet.origin[0] < 800 && bullet.origin[0] > 0){
                        if (bullet.direction === 'left'){
                            bullet.origin[0] -= bullet.horizontalSpeed;
                            bullet.travelDistance += bullet.horizontalSpeed;
                            if (bullet.travelDistance > 100) {
                                bullet.origin[1] += bullet.gravity;
                                if (bullet.travelDistance > 200) {
                                    bullet.origin[1] += bullet.gravity
                                    if (bullet.travelDistance > 300) {
                                        bullet.origin[1] += bullet.gravity;
                                    }
                                }
                            }
                        }
                    if (bullet.direction === 'right'){
                        bullet.origin[0] += bullet.horizontalSpeed;
                        bullet.travelDistance += bullet.horizontalSpeed;
                        if (bullet.travelDistance > 100){
                            bullet.origin[1] += bullet.gravity;
                            if (bullet.travelDistance > 200) {
                                bullet.origin[1] += bullet.gravity;
                                if (bullet.travelDistance > 300) {
                                    bullet.origin[1] += bullet.gravity;
                                }
                            }
                        }
                    }
                    } else {
                        bullet.shouldKeepShowingBullet = false;
                    }
                      
                }
            }
            if (bullet.direction === 'left'){
                bullet.origin[0] = this.origin[0];
            }
            bulletArray.push(bullet);
        },
        isOnPlatform: false,
        canJump: false,
        Draw() {
            if (this.velocity[0] === 0){
                if (this.direction === 'right'){
                    context.scale(1, 1);
                    context.drawImage(this.image, this.origin[0], this.origin[1], this.dimensions[0], this.dimensions[1]);
                    context.setTransform(1, 0, 0, 1, 0, 0);
                }
                else if (this.direction === 'left'){
                    context.scale(-1, 1);
                    context.drawImage(this.image, -this.origin[0] - this.dimensions[0], this.origin[1], this.dimensions[0], this.dimensions[1]);
                    context.setTransform(1, 0, 0, 1, 0, 0);
                }
            }
            if (this.velocity[0] > 0) {
                context.scale(1, 1);
                context.drawImage(this.image, this.origin[0], this.origin[1], this.dimensions[0], this.dimensions[1]);
                context.setTransform(1, 0, 0, 1, 0, 0);
            }
            if (this.velocity[0] < 0) {
                context.scale(-1,1);
                context.drawImage(this.image, -this.origin[0] - this.dimensions[0], this.origin[1], this.dimensions[0], this.dimensions[1]);
                context.setTransform(1, 0, 0, 1, 0, 0);
            }
        },
        Move() {
            let nextX = this.origin[0] + this.velocity[0];
            let nextY = this.origin[1] + this.velocity[1];
            let isPlayerOnPlatform = false;
            
            if (this.velocity[1] === 0) {
                nextY = this.origin[1];
            }
            if (this.velocity[0] === 0) {
                nextX = this.origin[0];
            }
            levelWalls.forEach(wall => {
                let leftSide = wall.origin[0];
                let rightSide = wall.origin[0] + wall.dimensions[0];
                let bottomSide = wall.origin[1] + wall.dimensions[1];
                let topSide = wall.origin[1];
                if (this.playerID === 1){
                    wall.P1OnPlatform = false;
                } else if (this.playerID === 2) {
                    wall.P2OnPlatform = false;
                }
                

                if ((this.origin[0] > leftSide && this.origin[0] < rightSide) || 
                    (this.origin[0] + this.dimensions[0]) < rightSide && (this.origin[0] + this.dimensions[0] > leftSide)||
                    (this.origin[0] + (this.dimensions[0] / 2 ) < rightSide && (this.origin[0] + (this.dimensions[0] / 2) > leftSide))){
                        //collision top of platform
                        if (this.velocity[1] > 0) {
                            if (nextY + this.dimensions[1] > topSide && nextY + this.dimensions[1] < bottomSide) {
                                nextY = topSide - this.dimensions[1] - 1;
                                if (this.playerID === 1){
                                    wall.P1OnPlatform = true;
                                } else if (this.playerID === 2){
                                    wall.P2OnPlatform = true;
                                }
                                isPlayerOnPlatform = true;
                            }
                        }
                        //collision bot of platform
                        else if (this.velocity[1] < 0) {
                            if (nextY > topSide && nextY < bottomSide){
                                nextY = bottomSide + 1;
                                this.velocity[1] = 0;
                            }
                        }
                    }
                if ((this.origin[1] >= topSide && this.origin[1] <= bottomSide) || 
                    (this.origin[1] + this.dimensions[1] - 2 >= topSide && this.origin[1] + this.dimensions[1] <= bottomSide)||
                    (this.origin[1] + (this.dimensions[1] / 2) >= topSide) && this.origin[1] + (this.dimensions[1] / 2) <= bottomSide){
                        //collision left of platform
                        if (this.velocity[0] > 0) {
                            if (nextX + this.dimensions[0] > leftSide && nextX + this.dimensions[0] < rightSide) {
                                nextX = leftSide - this.dimensions[0];
                                if (wall.canPush){
                                    wall.origin[0] += this.velocity[0];
                                }
                                this.velocity[0] = 0;
                            }
                        }
                        //collision right of platform
                        else if (this.velocity[0] < 0) {
                            if (nextX > leftSide && nextX < rightSide){
                                nextX = rightSide + 1;

                                if (wall.canPush){
                                    wall.origin[0] += this.velocity[0];
                                }
                                this.velocity[0] = 0;
                            }
                        }
                    }
                
            })
            this.isOnPlatform = isPlayerOnPlatform;
            this.origin[0] = nextX;
            this.origin[1] = nextY;
        },
        Jump() {
            this.jumpCounter = 0;
            this.velocity[1] = 0;
                while (this.jumpCounter <= 1.2) {
                    this.jumpCounter += .3;
                    this.velocity[1] -= this.jumpCounter;
                    
                    if (this.jumpCounter > 1.2) {
                        this.jumpCounter = 0;
                        break;
                    } 
                }
                player.isOnPlatform = false;
        },
        Walk() {     
            this.animCounter += 3;
            if (this.animCounter === 3){
                if (this.playerID === 2){
                    this.image = redWalk2
                } else {
                    this.image = playerWalk2;
                } 
            }
            if (this.animCounter === 6){
                if (this.playerID === 2){
                    this.image = redWalk3
                } else {
                    this.image = playerWalk3;
                }
            }
            if (this.animCounter === 9){
                if (this.playerID === 2){
                    this.image = redWalk4
                } else {
                    this.image = playerWalk4;
                }
            }
            if (this.animCounter === 12){
                if (this.playerID === 2){
                    this.image = redWalk5
                } else {
                    this.image = playerWalk5;
                }
            }
            if (this.animCounter === 15){
                if (this.playerID === 2){
                    this.image = redWalk6
                } else {
                    this.image = playerWalk6;
                }
            }
            if (this.animCounter === 18){
                if (this.playerID === 2){
                    this.image = redWalk7
                } else {
                    this.image = playerWalk7;
                }
            }
            if (this.animCounter === 21){
                if (this.playerID === 2){
                    this.image = redWalk8
                } else {
                    this.image = playerWalk8;
                }
            }
            if (this.animCounter === 24){
                if (this.playerID === 2){
                    this.image = redWalk1
                } else {
                    this.image = playerWalk1;    
                }
                this.animCounter = 0;
            }
        },
        Acceleration() {
            counter++;
            if (counter === 5){
                this.horAccel += .15;
            }
            if (counter === 10){
                this.horAccel += .15;
            }
            if (counter === 20){
                this.horAccel += .2;
            }
        }
    }

    if (player.playerID === 2){
        player.image = redWalk1;
    }
    currentPlayers.push(player);
}

function playerGravity() {
    currentPlayers.forEach(player => {
        if (!player.isOnPlatform){
            player.velocity[1] += gravity;
        }
        if (player.attachedHorizontalSpeed > 0){
            player.velocity[0] += player.attachedHorizontalSpeed;
        }
        if (player.attachedVerticalSpeed > 0) {
            player.velocity[1] += player.attachedVerticalSpeed;
        }
    })
}

function bulletDetection() {
    bulletArray.forEach(bullet => {
        let leftSide = bullet.origin[0];
        let rightSide = bullet.origin[0] + bullet.dimensions[0];
        let topSide = bullet.origin[1];
        let botSide = bullet.origin[1] + bullet.dimensions[0];
        levelWalls.forEach(wall => {
            let left = wall.origin[0];
            let right = wall.origin[0] + wall.dimensions[0];
            let top = wall.origin[1];
            let bot = wall.origin[1] + wall.dimensions[1];
            if ((leftSide >= left && leftSide <= right) || (rightSide >= left && rightSide <= left)) {
                if ((topSide >= top && topSide <= bot) || botSide >= top && botSide <= bot) {
                    bullet.shouldKeepShowingBullet = false;
                }
            } 
        })
    })
    bulletArray.forEach(bullet => {
        let leftSide = bullet.origin[0];
        let rightSide = bullet.origin[0] + bullet.dimensions[0];
        let topSide = bullet.origin[1];
        let botSide = bullet.origin[1] + bullet.dimensions[0];
        currentPlayers.forEach(player => {
            let left = player.origin[0];
            let right = player.origin[0] + player.dimensions[0];
            let top = player.origin[1];
            let bot = player.origin[1] + player.dimensions[1];
            if ((leftSide >= left && leftSide <= right) || (rightSide >= left && rightSide <= left)) {
                if ((topSide >= top && topSide <= bot) || botSide >= top && botSide <= bot) {
                    if (player.playerID === bullet.bulletID) {
                        bullet.shouldKeepShowingBullet
                    } else {
                        bullet.shouldKeepShowingBullet = false;
                    }
                }
            } 

        })
    })
}
function isDead() {
    currentPlayers.forEach(player => {
        if (player.origin[0] < -50 || player.origin[0] > 850 || player.origin[1] > 700) {
            player.lives--;
            player.origin[0] = 50;
            player.origin[1] = 200;
        }
    });
}
playerCreate(50,200,1);   
playerCreate(100,200,2);

let InputHandler = (() => {
    document.addEventListener("keydown", event => {
      switch (event.key) {
          case "ArrowLeft":
              currentPlayers[0].Acceleration();
              currentPlayers[0].Walk();
              currentPlayers[0].direction = 'left';
              currentPlayers[0].velocity[0] = -currentPlayers[0].horizontalSpeed - currentPlayers[0].horAccel;
              break;
          case "ArrowRight":
              currentPlayers[0].Acceleration();
              currentPlayers[0].Walk();
              currentPlayers[0].direction = 'right';
              currentPlayers[0].velocity[0] = currentPlayers[0].horizontalSpeed + currentPlayers[0].horAccel;
              break;
          case "ArrowUp":
              break;
          case "ArrowDown":
              break;
          case "z": 
              currentPlayers[0].bulletCreate();
              break;
          case ' ':
              if (currentPlayers[0].isOnPlatform){
                  currentPlayers[0].Jump();
              }
              break;
          default:
            }
      })
   
    document.addEventListener("keyup", event => {
      switch (event.key) {
          case "ArrowLeft":
              currentPlayers[0].counter = 0;
              currentPlayers[0].horAccel = 0;
              currentPlayers[0].velocity[0] = 0;
              currentPlayers[0].animCounter = 0;
              break;
          case "ArrowRight":
              currentPlayers[0].horAccel = 0;
              counter = 0;
              currentPlayers[0].velocity[0] = 0;
              currentPlayers[0].animCounter = 0;
              break;
          case "ArrowUp":
              break;
          case ' ':
              break;
          default:       
      }
    })
  })();
