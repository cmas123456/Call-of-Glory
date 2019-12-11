let currentPlayers = [];
let player = {};
let counter = 0;
let walkAnimation = [];
let playerWalk1 = document.getElementById('walk1');
let playerWalk2 = document.getElementById('walk2');
let playerWalk3 = document.getElementById('walk3');
let playerWalk4 = document.getElementById('walk4');
let playerWalk5 = document.getElementById('walk5');
let playerWalk6 = document.getElementById('walk6');
let playerWalk7 = document.getElementById('walk7');
let playerWalk8 = document.getElementById('walk8');
let playerWalk9 = document.getElementById('walk9');

function playerCreate(x,y) {
    player = {
        origin:[x,y],
        dimensions:[24,32],
        image: playerWalk1,
        velocity: [0, 0],
        horizontalSpeed: 1,
        verticalSpeed: 1,
        horAccel: 0,
        vertAccel: 0,
        animCounter: 0,
        Draw() {
            if (player.velocity[0] === 0){
                context.drawImage(player.image, player.origin[0], player.origin[1], player.dimensions[0], player.dimensions[1]);
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
                
                
                if ((player.origin[0] > leftSide && player.origin[0] < rightSide) || 
                    (player.origin[0] + player.dimensions[0]) < rightSide && (player.origin[0] + player.dimensions[0] > leftSide)){
                        //collision top of platform
                        if (player.velocity[1] > 0) {
                            if (nextY + player.dimensions[1] > topSide && nextY + player.dimensions[1] < bottomSide) {
                                nextY = topSide - player.dimensions[1] - 1;
                            }
                        }
                        //collision bot of platform
                        else if (player.velocity[1] < 0) {
                            if (nextY > topSide && nextY < bottomSide){
                                nextY = bottomSide + 1;
                            }
                        }
                    }
                if ((player.origin[1] >= topSide && player.origin[1] <= bottomSide) || 
                    (player.origin[1] + player.dimensions[1] >= topSide && player.origin[1] + player.dimensions[1] <= bottomSide)||
                    (player.origin[1] + (player.dimensions[1] / 2) >= topSide) && player.origin[1] + (player.dimensions[1] / 2) <= bottomSide){
                        //collision left of platform
                        if (player.velocity[0] > 0) {
                            if (nextX + player.dimensions[0] > leftSide && nextX + player.dimensions[0] < rightSide) {
                                nextX = leftSide - player.dimensions[0];
                            }
                        }
                        //collision right of platform
                        else if (player.velocity[0] < 0) {
                            if (nextX > leftSide && nextX < rightSide){
                                nextX = rightSide + 1;
                            }
                        }
                    }
                
            })
            player.origin[0] = nextX;
            player.origin[1] = nextY;
        }
    }
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
function playerAcceleration() {
    counter++;
    console.log(counter);
    if (counter === 5){
        console.log('accelerate');
        player.horAccel += .15;
    }
    if (counter === 10){
        player.horAccel += .15;
    }
    if (counter === 20){
        player.horAccel += .2;
    }
}
playerCreate(50,200);

let InputHandler = (() => {
    document.addEventListener("keydown", event => {
      switch (event.key) {
          case "ArrowLeft":
              playerAcceleration();
              playerWalk();
              player.velocity[0] = -player.horizontalSpeed - player.horAccel;
              break;
          case "ArrowRight":
              playerAcceleration();
              playerWalk();
              player.velocity[0] = player.horizontalSpeed + player.horAccel;
              break;
          case "ArrowUp":
              player.velocity[1] = -player.verticalSpeed;
              break;
          case "ArrowDown":
              player.velocity[1] = player.verticalSpeed;
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
          case "ArrowRight":
              player.horAccel = 0;
              counter = 0;
              player.velocity[0] = 0;
              player.animCounter = 0;
          case "ArrowUp":
              player.velocity[1] = 0;
              break;
          case "ArrowDown":
              player.velocity[1] = 0;
              break;
          default:       
      }
    })
  })();
