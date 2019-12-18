let levelWalls = [];
let platformImg = document.getElementById('platform');
let platform2Img = document.getElementById('platform2');
let girderHImg = document.getElementById('girderH');
let girderVImg = document.getElementById('girderV');
let crateImg = document.getElementById('crate');

let stage1 = document.getElementById('stage1')
let stage2 = document.getElementById('stage2')
let stage3 = document.getElementById('stage3')

function createWalls(x, y, width, height, imageID = null, canThrow = false, shouldMove, lower, upper, alwaysMove) {
    wall = {
        goUp: true,
        origin: [x, y],
        dimensions: [width, height],
        image: imageID,
        isOnPlatform: false,
        P1OnPlatform: false,
        P2OnPlatform: false,
        isOn: true,
        onTopWall: null,
        alwaysMove:alwaysMove,
        
        canMove : shouldMove,
        gravity :1.5,
        canPush : canThrow,
        isOntopBox:false,
        Draw(){

           
            if ((this.alwaysMove || this.P1OnPlatform || this.P2OnPlatform) && this.canMove){

             
                if (this.goUp){
                this.origin[1] += -1;
                //console.log(this.goUp);

                }
                else{

                    this.origin[1] += 1;
                }

                if (lower > this.origin[1]){
                    
                  this.goUp = false;
                }
                if (upper  < this.origin[1] ){
                    console.log(this.goUp);

                    this.goUp = true;
                }
            }
            else{
                if (upper > this.origin[1] ){
                    this.origin[1] += 1;
                }
            }
            if (imageID !== null){
                context.drawImage(this.image, this.origin[0],this.origin[1],this.dimensions[0],this.dimensions[1]);
            } else {
                context.fillStyle = 'Brown';
                context.fillRect(this.origin[0], this.origin[1], this.dimensions[0], this.dimensions[1]);
            }
        }
    }
    levelWalls.push(wall);
}

function gravitys(){
    levelWalls.forEach(wall => {
    
        if (wall.isOn && wall.canPush){
            wall.origin[1] += wall.gravity;
        }
    })
}

function isOnTop() {
    levelWalls.forEach(crate => {
        crate.isOn = true;
        if (crate.canPush) {
            let nextY = crate.origin[1] + crate.dimensions[1] + crate.gravity;
            let leftSide = crate.origin[0];
            let rightSide = crate.origin[0] + crate.dimensions[0];
            levelWalls.forEach(platform => {
                let left = platform.origin[0];
                let right = platform.origin[0] + platform.dimensions[0];
                let top = platform.origin[1];
                let bot = platform.origin[1] + platform.dimensions[1];
                if ((leftSide >= left && leftSide <= right) || (rightSide <= right && rightSide >= left)){
                    if (nextY >= top && nextY <= bot){
                        crate.isOn = false;
                    }
                }
            })
        }
    })
}
/*       CODE FOR PICKING THE LEVELS                     */

function levelOne () {
    //draw  first 
    createWalls(50,500,100,20, platformImg);
    createWalls(100 ,480 ,20 ,20,crateImg, true);
    createWalls(200,500,100,20, platform2Img);
    createWalls(250,480 ,20,20,crateImg, true);
    createWalls(350 ,500,100,20, platformImg);
    createWalls(400 ,480 ,20 ,20,crateImg, true);
    createWalls(500 ,500,100,20, platform2Img);
    createWalls(550 ,480,20,20,crateImg, true);
    createWalls(650,500,100,20, platformImg);
    createWalls(660,480 ,20,20,crateImg, true);
 
    //draw second
    createWalls(115 , 400 , 75 , 20, platform2Img);
    createWalls(170 , 380 , 20 , 20,crateImg, true);
    createWalls(245 , 400 , 75 , 20, platformImg);
    createWalls(300 , 380 , 20 , 20,crateImg, true);
    createWalls(435 , 400 , 75 , 20, platformImg);
    createWalls(435 , 380 , 20 , 20,crateImg, true);
    createWalls(560  , 400 , 75 , 20, platform2Img);
    createWalls(560 , 380 , 20 , 20,crateImg,true);
 
    //draw third 
 
    createWalls(225 , 300 , 70, 20, girderHImg);
    createWalls(255 , 260 , 20, 70, girderVImg);
    createWalls(340 , 300 , 75 , 20, platform2Img,false,true, 220, 340);
    createWalls(485 , 300 , 70 , 20, girderHImg);
    createWalls(500 , 260 , 20 , 70, girderVImg);
 
    //draw fourth 
    createWalls(285 , 200 , 35, 20, platform2Img);
    createWalls(430, 200 , 35, 20, platform2Img);
 
    //draw top 
    createWalls(355 ,  125 , 35, 20, platform2Img);
}
function levelTwo () {
    //draw  first 
    createWalls(50,500,100,20, platformImg);
    createWalls(100 ,480 ,20 ,20,crateImg, true);
     createWalls(200,150,100,20, platformImg, false, true, 150, 300, true);
     createWalls(250,130 ,20,20,crateImg, true, true, 120, 280, true);
    createWalls(350 ,500,100,20, platformImg);
    createWalls(400 ,480 ,20 ,20,crateImg, true);
    createWalls(500 ,300,100,20, platformImg, false,true, 150, 300, true);
    createWalls(550 ,280,20,20,crateImg, true, true, 130, 280, true);
    createWalls(650,500,100,20, platformImg);
    createWalls(660,480 ,20,20,crateImg, true);
    createWalls(350,150,100,20, platformImg);

 
    //draw second
    // createWalls(115 , 400 , 75 , 20, platformImg);
    // createWalls(170 , 380 , 20 , 20,crateImg, true);
    // createWalls(245 , 400 , 75 , 20, platformImg);
    // createWalls(300 , 380 , 20 , 20,crateImg, true);
    // createWalls(435 , 400 , 75 , 20, platformImg);
    // createWalls(435 , 380 , 20 , 20,crateImg, true);
    // createWalls(560  , 400 , 75 , 20, platformImg);
    // createWalls(560 , 380 , 20 , 20,crateImg,true);
 
    //draw third 
 
    // createWalls(225 , 300 , 50 , 20);
    // createWalls(255 , 260 , 20 , 40);
  //  createWalls(50  , 300 , 75 , 20, platformImg,false,true, 220, 380);
//   createWalls(550 ,480,20,20,crateImg, true);
  createWalls(200, 300 , 20 , 20, crateImg,false,true, 220, 400);
  createWalls(300, 300 , 20 , 20, crateImg,false,true, 220, 400);
  createWalls(500, 300 , 20 , 20, crateImg,false,true, 220, 400);
  createWalls(600, 300 , 20 , 20, crateImg,false,true, 220, 400);


    //createWalls(150  , 300 , 75 , 20, platformImg,false,true, 220, 380);
    // createWalls(250 , 300 , 75 , 20, platformImg,false,true, 220, 380);
    // createWalls(350 , 300 , 75 , 20, platformImg,false,true, 220, 380);
    
    
    // createWalls(500 , 300 , 50 , 20);
    // createWalls(500 , 260 , 20 , 40);
 
    // //draw fourth 
    // createWalls(285 , 200 , 35, 20);
    // createWalls(430, 200 , 35, 20);
 
    // //draw top 
    // createWalls(355 ,  125 , 35, 20);
}
function levelThree () {
    //draw  first 
     createWalls(150,400,100,20, platformImg);
    createWalls(50,480 ,20 ,20,crateImg, false);
// createWalls(200,500,100,20, platformImg);
    createWalls(255,480 ,20,20,crateImg, false);
    // createWalls(350 ,500,100,20, platformImg);
    createWalls(440 ,480 ,20 ,20,crateImg, false);
     createWalls(500 ,400,100,20, platformImg);
   // createWalls(550 ,480,20,20,crateImg, false);
    // createWalls(650,500,100,20, platformImg);
    createWalls(650,480 ,20,20,crateImg, false);
 
    //draw second
    // createWalls(115 , 400 , 75 , 20, platformImg);
    // createWalls(170 , 380 , 20 , 20,crateImg, true);
    // createWalls(245 , 400 , 75 , 20, platformImg);
    // createWalls(300 , 380 , 20 , 20,crateImg, true);
    // createWalls(435 , 400 , 75 , 20, platformImg);
    // createWalls(435 , 380 , 20 , 20,crateImg, true);
    // createWalls(560  , 400 , 75 , 20, platformImg);
    // createWalls(560 , 380 , 20 , 20,crateImg,true);
 
    //draw third 
 
    // createWalls(225 , 300 , 50 , 20);
    // createWalls(255 , 260 , 20 , 40);
    createWalls(340 , 300 , 75 , 20, platformImg,false,true, 220, 380);
    // createWalls(500 , 300 , 50 , 20);
    // createWalls(500 , 260 , 20 , 40);
 
    // //draw fourth 
    // createWalls(285 , 200 , 35, 20);
    // createWalls(430, 200 , 35, 20);
 
    // //draw top 
    // createWalls(355 ,  125 , 35, 20);
}
 levelOne();
//levelTwo();
//levelThree();