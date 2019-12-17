let levelWalls = [];
let platformImg = document.getElementById('platform');
let crateImg = document.getElementById('crate');
goUp = true;

function createWalls(x, y, width, height, imageID = null, canThrow = false, shouldMove, lower, upper) {
    wall = {
        origin: [x, y],
        dimensions: [width, height],
        image: imageID,
        isOnPlatform: false,
        P1OnPlatform: false,
        P2OnPlatform: false,
        isOn: true,
        onTopWall: null,
        canMove : shouldMove,
        gravity :1.5,
        canPush : canThrow,
        isOntopBox:false,
        Draw(){

           
            if ((this.P1OnPlatform || this.P2OnPlatform) && this.canMove){
             
                if (goUp){
                this.origin[1]--;
                //console.log(goUp);

                }
                else{

                    this.origin[1]++;
                }

                if (lower > this.origin[1]){
                    
                  goUp = false;
                }
                if (upper  < this.origin[1] ){
                    console.log(goUp);

                    goUp = true;
                }
            }
            else{
                if (upper > this.origin[1] ){
                    this.origin[1]++;
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


// function isOnTop (){

//     levelWalls.forEach(wall => {

//         levelWalls.forEach(ball =>{

//             if (wall.origin[1] + wall.height >= ball.origin[1]  ){
//             if (wall.canPush && !ball.canPush){

//                 if (wall.origin[0] <=  ball.origin[0]  && wall.origin[0] >= ball.origin[0]  ){
                  
                
//                     wall.isOn = true;
//                 }
// else{
// console.log("The wall is not safe")
// wall.isOn  = false;
    
// }
//             }




//             }

//         })



//     })




// }


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
function levelOne () {
    //draw  first 
    createWalls(50,500,100,20, platformImg);
    createWalls(100 ,480 ,20 ,20,crateImg, true);
    createWalls(200,500,100,20, platformImg);
    createWalls(250,480 ,20,20,crateImg, true);
    createWalls(350 ,500,100,20, platformImg);
    createWalls(400 ,480 ,20 ,20,crateImg, true);
    createWalls(500 ,500,100,20, platformImg);
    createWalls(550 ,480,20,20,crateImg, true);
    createWalls(650,500,100,20, platformImg);
    createWalls(660,480 ,20,20,crateImg, true);
 
    //draw second
    createWalls(115 , 400 , 75 , 20, platformImg);
    createWalls(170 , 380 , 20 , 20,crateImg, true);
    createWalls(245 , 400 , 75 , 20, platformImg);
    createWalls(300 , 380 , 20 , 20,crateImg, true);
    createWalls(435 , 400 , 75 , 20, platformImg);
    createWalls(435 , 380 , 20 , 20,crateImg, true);
    createWalls(560  , 400 , 75 , 20, platformImg);
    createWalls(560 , 380 , 20 , 20,crateImg,true);
 
    //draw third 
 
    createWalls(225 , 300 , 50 , 20);
    createWalls(255 , 260 , 20 , 40);
    createWalls(340 , 300 , 75 , 20, platformImg,false,true, 220, 380);
    createWalls(500 , 300 , 50 , 20);
    createWalls(500 , 260 , 20 , 40);
 
    //draw fourth 
    createWalls(285 , 200 , 35, 20);
    createWalls(430, 200 , 35, 20);
 
    //draw top 
    createWalls(355 ,  125 , 35, 20);
}
function levelTwo () {
    //draw  first 
    createWalls(50,500,100,20, platformImg);
    createWalls(100 ,480 ,20 ,20,crateImg, true);
     createWalls(200,200,100,20, platformImg);
     createWalls(250,180 ,20,20,crateImg, true);
    createWalls(350 ,500,100,20, platformImg);
    createWalls(400 ,480 ,20 ,20,crateImg, true);
    createWalls(500 ,200,100,20, platformImg);
    createWalls(550 ,180,20,20,crateImg, true);
    createWalls(650,500,100,20, platformImg);
    createWalls(660,480 ,20,20,crateImg, true);
 
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
  createWalls(150  , 300 , 20 , 20, crateImg,false,true, 220, 380);
  createWalls(250  , 300 , 20 , 20, crateImg,false,true, 220, 380);
  createWalls(450  , 300 , 20 , 20, crateImg,false,true, 220, 380);
  createWalls(550  , 300 , 20 , 20, crateImg,false,true, 220, 380);


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
    createWalls(100 ,480 ,20 ,20,crateImg, false);
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