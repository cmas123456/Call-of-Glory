let levelWalls = [];
let platformImg = document.getElementById('platform');
let crateImg = document.getElementById('crate');

function createWalls(x, y, width, height, imageID = null) {
    wall = {
        origin: [x, y],
        dimensions: [width, height],
        image: imageID,
        Draw(){
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

function levelOne () {
    //draw  first 
    createWalls(50,500,100,20, platformImg);
    createWalls(100 ,480 ,20 ,20,crateImg);
    createWalls(200,500,100,20, platformImg);
    createWalls(250,480 ,20,20,crateImg);
    createWalls(350 ,500,100,20, platformImg);
    createWalls(400 ,480 ,20 ,20,crateImg);
    createWalls(500 ,500,100,20, platformImg);
    createWalls(550 ,480,20,20,crateImg);
    createWalls(650,500,100,20, platformImg);
    createWalls(660,480 ,20,20,crateImg);
 
    //draw second
    createWalls(135 , 400 , 75 , 20, platformImg);
    createWalls(190 , 380 , 20 , 20,crateImg);
    createWalls(285 , 400 , 75 , 20, platformImg);
    createWalls(340 , 380 , 20 , 20,crateImg);
    createWalls(435 , 400 , 75 , 20, platformImg);
    createWalls(435 , 380 , 20 , 20,crateImg);
    createWalls(580  , 400 , 75 , 20, platformImg);
    createWalls(580 , 380 , 20 , 20,crateImg);
 
    //draw third 
 
    createWalls(225 , 300 , 50 , 20);
    createWalls(255 , 260 , 20 , 40);
    createWalls(340 , 300 , 75 , 20, platformImg);
    createWalls(500 , 300 , 50 , 20);
    createWalls(500 , 260 , 20 , 40);
 
    //draw fourth 
    createWalls(285 , 200 , 35, 20);
    createWalls(430, 200 , 35, 20);
 
    //draw top 
    createWalls(355 ,  150 , 35, 20);
}
levelOne();