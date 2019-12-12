  
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
    context.drawImage(background, 0,0,800,600);
    player.Draw();
    // currentPlayers.forEach(player => {
    //     player.Draw();
    // })
    levelWalls.forEach(wall => {
        wall.Draw();
        //wall.Move()
        
    })
    bulletArray.forEach(bullet => {
        bullet.Draw();
    })
}

function moveObjects() {
    player.Move();
    // currentPlayers.forEach(player => {
    //     player.Move();
    // })
    bulletArray.forEach(bullet => {
        bullet.Move();
    })
}
function deleteObjects() {
   bulletArray = bulletArray.filter(bullet => bullet.shouldKeepShowingBullet);
}
function gameLoop() {
    drawObjects();
    moveObjects();
    bulletDetection();
    deleteObjects();
    playerGravity();
    gravitys();
    isOnTop();
    isDead();
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