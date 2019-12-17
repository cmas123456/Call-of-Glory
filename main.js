  
const source = document.createElement('canvas') //creates the canvas
function assignAttributes(element, attributes) {
	Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]))
}

let score1 = document.getElementById("scores1");
let score2 = document.getElementById("scores2");
let playerscore1 = 0;
let playerscore2 = 0;

function updateScores() {
    currentPlayers.forEach(player => {
        if (player.playerID === 1){
            playerscore1 = currentPlayers[0].score;
            score1.textContent = (`Player1 Score: ${playerscore1}`);
        } else if (player.playerID === 2) {
            playerscore2 = currentPlayers[1].score;
            score2.textContent = (`Player2 Score: ${playerscore2}`);
        }

    })
}
score1.textContent = (`Player1 Score: ${playerscore1}`);
score2.textContent = (`Player2 Score: ${playerscore2}`);


assignAttributes(source, { // this makes the canvas fit in the window
  id: 'source',
	height: 600,
	width: 800,
})
let controllerRight = false;
let controllerLeft = false;
let controllerRight2 = false;
let controllerLeft2 = false;
let currentWall = {

    origin : [0,0],
    dimensions : [0,0]

}

// const gamepadDisplay = document.getElementById('gamepad-display');
// const gamepadDisplay2 = document.getElementById('gamepad-display2');



document.body.appendChild(source) // adds the canvas to the webpage
const context = source.getContext('2d', {alpha: 'false'})

function drawObjects() {
    context.clearRect(0, 0, 800, 600);
    context.drawImage(background, 0,0,800,600); 
    currentPlayers.forEach(player => {
        player.Draw();
    })
    levelWalls.forEach(wall => {
        wall.Draw(); 
        if (wall.origin[0] == currentPlayers[1].origin[0]  && wall.origin[1] >= currentPlayers[1].origin[1]  && wall.origin[1] <= currentPlayers[1].origin[1]+ 50 ){
            currentWall.origin[0] = wall.origin[0]
            currentWall.origin[1] = wall.origin[1]
            currentWall.dimensions[0] = wall.dimensions[0]
            currentWall.dimensions[1] = wall.dimensions[1]
            console.log(currentWall.origin[0] + " " + currentWall.origin[1] + " " + currentPlayers[1].origin[1 ] + " " +  currentPlayers[1].dimensions[1])

        }
        
    })
    bulletArray.forEach(bullet => {
        bullet.Draw();
    })
}

function moveObjects() {
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

function movePlayer (){





    if (currentWall.origin[0]+ currentWall.dimensions[0] >= currentPlayers[1].origin[0] + currentPlayers[1].dimensions[0]){

    }
    else{
        currentPlayers[1].origin[0]++;

    }

}
function gameLoop() {
    const gamepads = navigator.getGamepads();

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
        //Right on DPAD
        if(gamepads[0].buttons[15].pressed){
            if (currentPlayers[0].knockbackCounter >= 10){
                currentPlayers[0].Acceleration();
                currentPlayers[0].Walk();
                currentPlayers[0].direction = 'right';
                controllerRight = true;
                currentPlayers[0].velocity[0] = currentPlayers[0].horizontalSpeed + currentPlayers[0].horAccel;
            }
        }
        else if (gamepads[0].buttons[15].pressed === false && controllerRight === true){
              currentPlayers[0].counter = 0;
              currentPlayers[0].horAccel = 0;
              currentPlayers[0].velocity[0] = 0;
              currentPlayers[0].animCounter = 0;
              controllerRight = false;
        }
        //Left on DPAD
        if (gamepads[0].buttons[14].pressed){
            if (currentPlayers[0].knockbackCounter >= 10){
                currentPlayers[0].Acceleration();
                currentPlayers[0].Walk();
                currentPlayers[0].direction = 'left';
                controllerLeft = true;
                currentPlayers[0].velocity[0] = -currentPlayers[0].horizontalSpeed - currentPlayers[0].horAccel;
            }
        }
        else if (gamepads[0].buttons[14].pressed === false && controllerLeft === true){
          currentPlayers[0].counter = 0;
          currentPlayers[0].horAccel = 0;
          currentPlayers[0].velocity[0] = 0;
          currentPlayers[0].animCounter = 0;
          controllerLeft = false;
        }
    
        //down on DPAD
        if (gamepads[0].buttons[13].pressed)
        {
            currentPlayers.drawImage 
            currentPlayers[0].velocity[0] = 0;
        }
        //A button on Xbox Controller
        if (gamepads[0].buttons[0].pressed)
        {
            if (currentPlayers[0].isOnPlatform)
              currentPlayers[0].Jump();
        }
        //X Button on Xbox Controller
        if (gamepads[0].buttons[2].pressed)
        {
            if (currentPlayers[0].bulletROF >= 60) {
                currentPlayers[0].bulletCreate();
                currentPlayers[0].bulletROF === 0;
            }
        }
        //gamepadDisplay.textContent = JSON.stringify(gamepadState, null, 2);
    }


    if(gamepads[1]) {
        const gamepadState1 ={
            id: gamepads[1].id,
            axes: [
                gamepads[1].axes[1].toFixed(2),
                gamepads[1].axes[1].toFixed(2),
                gamepads[1].axes[2].toFixed(2),
                gamepads[1].axes[3].toFixed(2),
            ],
            buttons: [
                {buttons_0: gamepads[1].buttons[0].pressed},
                {buttons_1: gamepads[1].buttons[1].pressed},
                {buttons_2: gamepads[1].buttons[2].pressed},
                {buttons_3: gamepads[1].buttons[3].pressed},
                {buttons_4: gamepads[1].buttons[4].pressed},
                {buttons_5: gamepads[1].buttons[5].pressed},
                {buttons_6: gamepads[1].buttons[6].pressed},
                {buttons_7: gamepads[1].buttons[7].pressed},
                {buttons_8: gamepads[1].buttons[8].pressed},
                {buttons_9: gamepads[1].buttons[9].pressed},
                {buttons_10: gamepads[1].buttons[10].pressed},
                {buttons_11: gamepads[1].buttons[11].pressed},
                {buttons_12: gamepads[1].buttons[12].pressed},
                {buttons_13: gamepads[1].buttons[13].pressed},
                {buttons_14: gamepads[1].buttons[14].pressed},
                {buttons_15: gamepads[1].buttons[15].pressed}
            ],
        }
        //Right on DPAD
        if(gamepads[1].buttons[15].pressed){
            if (currentPlayers[1].knockbackCounter >= 10) {
                currentPlayers[1].Acceleration();
                currentPlayers[1].Walk();
                currentPlayers[1].direction = 'right';
                controllerRight2 = true;
                currentPlayers[1].velocity[0] = currentPlayers[1].horizontalSpeed + currentPlayers[1].horAccel;
            }
        }
        else if (gamepads[1].buttons[15].pressed === false && controllerRight2 === true){
              currentPlayers[1].counter = 0;
              currentPlayers[1].horAccel = 0;
              currentPlayers[1].velocity[0] = 0;
              currentPlayers[1].animCounter = 0;
              controllerRight2 = false;
        }
        //Left on DPAD
        if (gamepads[1].buttons[14].pressed){
            if (currentPlayers[1].knockbackCounter >= 10) {
                currentPlayers[1].Acceleration();
                currentPlayers[1].Walk();
                currentPlayers[1].direction = 'left';
                currentPlayers[1].velocity[0] = -currentPlayers[0].horizontalSpeed - currentPlayers[0].horAccel;
                controllerLeft2 = true;
            }
        }
        else if (gamepads[1].buttons[14].pressed === false && controllerLeft2 === true){
          currentPlayers[1].counter = 0;
          currentPlayers[1].horAccel = 0;
          currentPlayers[1].velocity[0] = 0;
          currentPlayers[1].animCounter = 0;
          controllerLeft2 = false;
        }
        
        //down on DPAD
        if (gamepads[1].buttons[13].pressed)
        {
            currentPlayers[1].velocity[0] = 0;
        }
        //A button on Xbox Controller
        if (gamepads[1].buttons[0].pressed)
        {
            if (player.isOnPlatform)
                currentPlayers[1].Jump();
        }
        //X Button on Xbox Controller
        if (gamepads[1].buttons[2].pressed)
        {
            if (currentPlayers[1].bulletROF >= 60) {
                console.log(currentPlayers[1].bulletROF);
                currentPlayers[1].bulletCreate();
                currentPlayers[1].bulletROF === 0;
            }
        }
        //gamepadDisplay2.textContent = JSON.stringify(gamepadState1, null, 2);
    }


    drawObjects();
    moveObjects();
    bulletDetection();
    deleteObjects()
    playerGravity();
    gravitys();
    isOnTop();
    isDead();
    updateScores();

    context.font = "20px Amatic";
    context.fillStyle = 'red'
    context.fillText(score1.textContent, (source.width/4) - 75, 50);
    context.fillText(score2.textContent, (source.width/3) * 2, 50);

    window.requestAnimationFrame(gameLoop);
}

window.addEventListener('gamepadconnected', event => {
    console.log('Gamepad connected');
    console.log(event.gamepad);
})
window.addEventListener('gamepaddisconnected', event => {
    console.log('Gamepad connected');
    console.log(event.gamepad);
})

gameLoop();