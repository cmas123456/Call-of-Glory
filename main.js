  
const source = document.createElement('canvas') //creates the canvas
function assignAttributes(element, attributes) {
	Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]))
}
assignAttributes(source, { // this makes the canvas fit in the window
  id: 'source',
	height: 600,
	width: 800,
})

const gamepadDisplay = document.getElementById('gamepad-display');

document.body.appendChild(source) // adds the canvas to the webpage
const context = source.getContext('2d', {alpha: 'false'})
const background = document.getElementById('background');

// function drawBackground() {
// }

function drawObjects() {
    context.clearRect(0, 0, 800, 600);
    context.drawImage(background, 0,0,800,600);
    player.Draw();
    // currentPlayers.forEach(player => {
    //     player.Draw();
    // })
    levelWalls.forEach(wall => {
        wall.Draw();
    })
    bulletArray.forEach(bullet => {
        bullet.Draw();
    })
}

function moveObjects() {
    player.Move();
    currentPlayers.forEach(player => {
        player.Move();
    })
    bulletArray.forEach(bullet => {
        bullet.Move();
    })
}
function deleteObjects() {
   bulletArray = bulletArray.filter(bullet => bullet.shouldKeepShowingBullet);
}
function gameLoop() {
<<<<<<< HEAD
    const gamepads = navigator.getGamepads();
    //console.log(gamepads);
    if(gamepads[0]) {
        const gamepadState ={
            id: gamepads[0].id,
            axes: [
                gamepads[0].axes[0].toFixed(2),
                gamepads[0].axes[1].toFixed(2),
                gamepads[0].axes[2].toFixed(2),
                gamepads[0].axes[3].toFixed(2),
            ],
            buttons: [
                {buttons_0: gamepads[0].buttons[0].pressed},
                {buttons_1: gamepads[0].buttons[1].pressed},
                {buttons_2: gamepads[0].buttons[2].pressed},
                {buttons_3: gamepads[0].buttons[3].pressed},
                {buttons_4: gamepads[0].buttons[4].pressed},
                {buttons_5: gamepads[0].buttons[5].pressed},
                {buttons_6: gamepads[0].buttons[6].pressed},
                {buttons_7: gamepads[0].buttons[7].pressed},
                {buttons_8: gamepads[0].buttons[8].pressed},
                {buttons_9: gamepads[0].buttons[9].pressed},
                {buttons_10: gamepads[0].buttons[10].pressed},
                {buttons_11: gamepads[0].buttons[11].pressed},
                {buttons_12: gamepads[0].buttons[12].pressed},
                {buttons_13: gamepads[0].buttons[13].pressed},
                {buttons_14: gamepads[0].buttons[14].pressed},
                {buttons_15: gamepads[0].buttons[15].pressed}
            ],
        }
        if(gamepads[0].buttons[15].pressed)
        {
            playerAcceleration();
              playerWalk();
              player.direction = 'right';
              player.velocity[0] = player.horizontalSpeed + player.horAccel;
        }
        else if (gamepads[0].buttons[15].pressed === false)
        {
            counter = 0;
              player.horAccel = 0;
              player.velocity[0] = 0;
              player.animCounter = 0;
        }
        if (gamepads[0].buttons[14].pressed)
        {
            playerAcceleration();
              playerWalk();
              player.direction = 'left';
              player.velocity[0] = -player.horizontalSpeed - player.horAccel;
        }
        if (gamepads[0].buttons[13].pressed)
        {
            player.velocity[0] = 0;
        }
        if (gamepads[0].buttons[0].pressed)
        {
            if (player.isOnPlatform)
              Jump();
        }
        if (gamepads[0].buttons[2].pressed)
        {
            player.bulletCreate();
        }
        gamepadDisplay.textContent = JSON.stringify(gamepadState, null, 2)
    }
=======
>>>>>>> 952b7c2d8003461506beffebed4fae4a2e4e715f
    drawObjects();
    moveObjects();
    bulletDetection();
    deleteObjects();
    playerGravity();
    isDead();
    window.requestAnimationFrame(gameLoop);
}

gameLoop();