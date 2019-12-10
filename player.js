let playerImage = document.getElementById('walk1');
let currentPlayers = [];
let player = {};

function playerCreate(x,y) {
    player = {
        origin:[x,y],
        dimensions:[20,32],
        image: playerImage,
        velocity: [0, 0],
        horizontalSpeed: 1,
        verticalSpeed: 1,
        Draw() {
            context.drawImage(player.image, player.origin[0], player.origin[1], player.dimensions[0], player.dimensions[1]);
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
                                nextY = topSide - player.dimensions[1];
                            }
                        }
                        //collision bot of platform
                        else if (player.velocity[1] < 0) {
                            if (nextY > topSide && nextY < bottomSide){
                                nextY = bottomSide;
                            }
                        }
                    }
                if ((player.origin[1] >= topSide && player.origin[1] <= bottomSide) || 
                    (player.origin[1] + player.dimensions[1] >= topSide && player.origin[1] + player.dimensions[1] <= bottomSide)){
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

playerCreate(50,200);

let InputHandler = (() => {
    document.addEventListener("keydown", event => {
      switch (event.key) {
          case "ArrowLeft":
              player.velocity[0] = -player.horizontalSpeed;
              break;
          case "ArrowRight":
              player.velocity[0] = player.horizontalSpeed;
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
              player.velocity[0] = 0;
          case "ArrowRight":
              player.velocity[0] = 0;
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
