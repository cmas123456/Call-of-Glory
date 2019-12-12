  
const source = document.createElement('canvas') //creates the canvas
function assignAttributes(element, attributes) {
	Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]))
}
assignAttributes(source, { // this makes the canvas fit in the window
  id: 'source',
	height: 600,
	width: 800,
})

const gamepads = navigator.getGamepads();

document.body.appendChild(source) // adds the canvas to the webpage
const context = source.getContext('2d', {alpha: 'false'})

// function drawBackground() {
// }

function drawObjects() {
    context.clearRect(0, 0, 800, 600);
<<<<<<< HEAD
    source.style.background = 'black';
=======
    context.drawImage(background, 0,0,800,600);
>>>>>>> 952b7c2d8003461506beffebed4fae4a2e4e715f
    player.Draw();
    // currentPlayers.forEach(player => {
    //     player.Draw();
    // })
    levelWalls.forEach(wall => {
        wall.Draw();
        //wall.Move();
        
    })
}

function moveObjects() {
    player.Move();
    currentPlayers.forEach(player => {
        player.Move();
    })
<<<<<<< HEAD

   
=======
    bulletArray.forEach(bullet => {
        bullet.Move();
    })
}
function deleteObjects() {
   bulletArray = bulletArray.filter(bullet => bullet.shouldKeepShowingBullet);
>>>>>>> 952b7c2d8003461506beffebed4fae4a2e4e715f
}
function gameLoop() {
    drawObjects();
    moveObjects();
<<<<<<< HEAD
    playerGravity()
isOnTop();
   gravitys();
=======
    bulletDetection();
    deleteObjects();
    playerGravity();
    isDead();
>>>>>>> 952b7c2d8003461506beffebed4fae4a2e4e715f
    window.requestAnimationFrame(gameLoop);
}
window.addEventListener('gamepadconnected', event => {
     console.log('Gamepad connected:')
     console.log(event.gamepad)
})

window.addEventListener('gamepaddisconnected', event => {
    console.log('Gamepad connected:')
    console.log(event.gamepad)
})
gameLoop();