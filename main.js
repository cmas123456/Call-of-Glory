  
const source = document.createElement('canvas') //creates the canvas
function assignAttributes(element, attributes) {
	Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]))
}
assignAttributes(source, { // this makes the canvas fit in the window
  id: 'source',
	height: 600,
	width: 800,
})
document.body.appendChild(source) // adds the canvas to the webpage
const context = source.getContext('2d', {alpha: 'false'})

// function drawBackground() {
// }

function drawObjects() {
    context.clearRect(0, 0, 800, 600);
    source.style.background = 'black';
    player.Draw();
    // currentPlayers.forEach(player => {
    //     player.Draw();
    // })
    levelWalls.forEach(wall => {
        wall.Draw();
    })
}

function moveObjects() {
    player.Move();
    currentPlayers.forEach(player => {
        player.Move();
    })
}
function gameLoop() {
    drawObjects();
    moveObjects();
    window.requestAnimationFrame(gameLoop);
}
gameLoop();