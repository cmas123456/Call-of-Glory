let levelWalls = [];

function createWalls(x, y, width, height) {
    wall = {
        origin: [x, y],
        dimensions: [width, height],
        Draw(){
            context.fillStyle = 'Brown';
            context.fillRect(this.origin[0], this.origin[1], this.dimensions[0], this.dimensions[1]);
        }
    }
    levelWalls.push(wall);
}

function levelOne () {
    createWalls(50,300,100,20);
}
levelOne();