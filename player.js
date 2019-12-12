// let currentPlayers = [];
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
let bulletImg = document.getElementById('projectile');

function playerCreate(x,y) {
    player = {
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
        direction: 'right',
        bulletCreate() {
            let bullet = {
                origin: [player.origin[0] + player.dimensions[0], player.origin[1] + (player.dimensions[1] / 2)],
                dimensions: [10, 2],
                image : bulletImg,
                shouldKeepShowingBullet: true,
                horizontalSpeed: 5,
                travelDistance: 0,
                gravity: 1,
                direction: player.direction,
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
                        console.log('offscreen');
                        bullet.shouldKeepShowingBullet = false;
                    }
                      
                }
            }
            if (bullet.direction === 'left'){
                bullet.origin[0] = player.origin[0];
            }
            bulletArray.push(bullet);
        },
        isOnPlatform: false,
        canJump: false,
        Draw() {
            if (player.velocity[0] === 0){
                if (player.direction === 'right'){
                    context.scale(1, 1);
                    context.drawImage(player.image, player.origin[0], player.origin[1], player.dimensions[0], player.dimensions[1]);
                    context.setTransform(1, 0, 0, 1, 0, 0);
                }
                else if (player.direction === 'left'){
                    context.scale(-1, 1);
                    context.drawImage(player.image, -player.origin[0] - player.dimensions[0], player.origin[1], player.dimensions[0], player.dimensions[1]);
                    context.setTransform(1, 0, 0, 1, 0, 0);
                }
            }
            if (player.velocity[0] > 0) {
                context.scale(1, 1);
                context.drawImage(player.image, player.origin[0], player.origin[1], player.dimensions[0], player.dimensions[1]);
                context.setTransform(1, 0, 0, 1, 0, 0);
            }
            if (player.velocity[0] < 0) {
                context.scale(-1,1);
                context.drawImage(player.image, -player.origin[0] - player.dimensions[0], player.origin[1], player.dimensions[0], player.dimensions[1]);
                context.setTransform(1, 0, 0, 1, 0, 0);
            }
        },
        Move() {
            let nextX = player.origin[0] + player.velocity[0];
            let nextY = player.origin[1] + player.velocity[1];
            let isPlayerOnPlatform = false;
            
            if (player.velocity[1] === 0) {
                nextY = player.origin[1];
            }
            if (player.velocity[0] === 0) {
                nextX = player.origin[0];
            }
            levelWalls.forEach(wall => {
                let leftSide = wall.origin[0];
                let rightSide = wall.origin[0] + wall.dimensions[0];
                let bottomSide = wall.origin[1] + wall.dimensions[1];
                let topSide = wall.origin[1];
                wall.isOnPlatform = false;
                
                
                if ((player.origin[0] > leftSide && player.origin[0] < rightSide) || 
                    (player.origin[0] + player.dimensions[0]) < rightSide && (player.origin[0] + player.dimensions[0] > leftSide)||
                    (player.origin[0] + (player.dimensions[0] / 2 ) < rightSide && (player.origin[0] + (player.dimensions[0] / 2) > leftSide))){
                        //collision top of platform
                        if (player.velocity[1] > 0) {
                            if (nextY + player.dimensions[1] > topSide && nextY + player.dimensions[1] < bottomSide) {
                                nextY = topSide - player.dimensions[1] - 1;
                                isPlayerOnPlatform = true;
                                wall.isOnPlatform = true;
                            }
                        }
                        //collision bot of platform
                        else if (player.velocity[1] < 0) {
                            if (nextY > topSide && nextY < bottomSide){
                                nextY = bottomSide + 1;
                                player.velocity[1] = 0;
                            }
                        }
                    }
                if ((player.origin[1] >= topSide && player.origin[1] <= bottomSide) || 
                    (player.origin[1] + player.dimensions[1] - 2 >= topSide && player.origin[1] + player.dimensions[1] <= bottomSide)||
                    (player.origin[1] + (player.dimensions[1] / 2) >= topSide) && player.origin[1] + (player.dimensions[1] / 2) <= bottomSide){
                        //collision left of platform
                        if (player.velocity[0] > 0) {


                            if (nextX + player.dimensions[0] > leftSide && nextX + player.dimensions[0] < rightSide) {
                                nextX = leftSide - player.dimensions[0];
                                if (wall.canPush){
                                    wall.origin[0] += player.velocity[0];
                                }
                                player.velocity[0] = 0;
                            }
                        }
                        //collision right of platform
                        else if (player.velocity[0] < 0) {
                            if (nextX > leftSide && nextX < rightSide){
                                nextX = rightSide + 1;

                                if (wall.canPush){
                                    wall.origin[0] += player.velocity[0];
                                }
                                player.velocity[0] = 0;
                            }
                        }
                    }
                
            })
            player.isOnPlatform = isPlayerOnPlatform;
            player.origin[0] = nextX;
            player.origin[1] = nextY;
        }
    }
}
function Jump() {
    player.jumpCounter = 0;
    player.velocity[1] = 0;
        while (player.jumpCounter <= 1.2) {
            player.jumpCounter += .3;
            player.velocity[1] -= player.jumpCounter;
            
            if (player.jumpCounter > 1.2) {
                player.jumpCounter = 0;
                break;
            } 
        }
        player.isOnPlatform = false;
}
function playerWalk() {
    player.animCounter += 3;
    if (player.animCounter === 3){
    player.image = playerWalk2;
    }
    if (player.animCounter === 6){
    player.image = playerWalk3;
    }
    if (player.animCounter === 9){
    player.image = playerWalk4;
    }
    if (player.animCounter === 12){
    player.image = playerWalk5;
    }
    if (player.animCounter === 15){
    player.image = playerWalk6;
    }
    if (player.animCounter === 18){
    player.image = playerWalk7;
    }
    if (player.animCounter === 21){
    player.image = playerWalk8;
    }
    if (player.animCounter === 24){
    player.image = playerWalk9;
    }
    if (player.animCounter === 27){
    player.animCounter = 0;
    player.image = playerWalk1;
    }
}
function playerGravity() {
    if (!player.isOnPlatform){
        player.velocity[1] += gravity;
    }
    if (player.attachedHorizontalSpeed > 0){
        player.velocity[0] += player.attachedHorizontalSpeed;
    }
    if (player.attachedVerticalSpeed > 0) {
        player.velocity[1] += player.attachedVerticalSpeed;
    }
}
function playerAcceleration() {
    counter++;
    if (counter === 5){
        player.horAccel += .15;
    }
    if (counter === 10){
        player.horAccel += .15;
    }
    if (counter === 20){
        player.horAccel += .2;
    }
}

function bulletDetection() {
    bulletArray.forEach(bullet => {
        let leftSide = bullet.origin[0];
        let rightSide = bullet.origin[0] + bullet.dimensions[0];
        let topSide = bullet.origin[1];
        let botSide = bullet.origin[1] + bullet.dimensions[0]
        levelWalls.forEach(wall => {
            let left = wall.origin[0];
            let right = wall.origin[0] + wall.dimensions[0];
            let top = wall.origin[1];
            let bot = wall.origin[1] + wall.dimensions[1];
            if ((leftSide >= left && leftSide <= right) || (rightSide >= left && rightSide <= left)) {
                console.log('outer success');
                if ((topSide >= top && topSide <= bot) || botSide >= top && botSide <= bot) {
                    console.log('success');
                    bullet.shouldKeepShowingBullet = false;
                }
            } 
        })
    })
}
function isDead() {
    if (player.origin[0] < -50 || player.origin[0] > 850 || player.origin[1] > 700) {
        player.lives--;
        player.origin[0] = 50;
        player.origin[1] = 200;
    }
}
playerCreate(50,200);

let InputHandler = (() => {
    document.addEventListener("keydown", event => {
      switch (event.key) {
          case "ArrowLeft":
              playerAcceleration();
              playerWalk();
              player.direction = 'left';
              player.velocity[0] = -player.horizontalSpeed - player.horAccel;
              break;
          case "ArrowRight":
              playerAcceleration();
              playerWalk();
              player.direction = 'right';
              player.velocity[0] = player.horizontalSpeed + player.horAccel;
              break;
          case "ArrowUp":
              break;
          case "ArrowDown":
              player.velocity[0] = 0;
              break;
          case "z": 
              player.bulletCreate();
              break;
          case ' ':
              if (player.isOnPlatform)
              Jump();
              break;
          default:
            }
      })
   
    document.addEventListener("keyup", event => {
      switch (event.key) {
          case "ArrowLeft":
              counter = 0;
              player.horAccel = 0;
              player.velocity[0] = 0;
              player.animCounter = 0;
              break;
          case "ArrowRight":
              player.horAccel = 0;
              counter = 0;
              player.velocity[0] = 0;
              player.animCounter = 0;
              break;
          case "ArrowUp":
              break;
          case ' ':
              break;
          default:       
      }
    })
  })();
