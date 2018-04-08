function make2dArray(rows, cols) {
    var arr = new Array(cols);
    for(var i = 0 ; i< arr.length ; i++ ){
        arr[i] = new Array(rows);
    }
    return arr;
}

var grid;
var w = 40;
var cols ;
var rows ;
var totalBees = 20;


function setup() {

    createCanvas(401,401);
    cols = floor(width/w);
    rows = floor(height/w);
    grid = make2dArray(rows, cols);

    for(var i = 0 ; i< grid.length ; i++ ) {
        for(var j = 0 ; j< grid.length ; j++ ) {
                grid[i][j] = new Cell(i ,j ,w);
            }
        }

    // pick bees spots
    var options = [];
    for(var i = 0 ; i< rows ; i++ ) {
        for(var j = 0 ; j< cols ; j++ ) {
            options.push([i,j]);
        }
    }

    for (var n = 0 ; n < totalBees ; n++){
        var index = floor(random(options.length));
        var choice = options[index];
        console.log(choice);
        var x = choice[0];
        var y = choice[1];
        options.slice(index,1);
        grid[x][y].bee = true;
    }



    for(var i = 0 ; i< rows ; i++ ) {
        for(var j = 0 ; j< cols ; j++ ) {
            grid[i][j].countBees();
        }
    }
}

function mousePressed() {
    for(var i = 0 ; i< grid.length ; i++ ) {
        for(var j = 0 ; j< grid.length ; j++ ) {
            if(grid[i][j].contains(mouseX, mouseY)){
                grid[i][j].reveal();

                if (grid[i][j].bee){
                    gameOver();
                    grid[i][j].over = true;
                }
            }
        }
    }
}

function gameOver() {
    for(var i = 0 ; i< rows ; i++ ) {
        for(var j = 0 ; j< cols ; j++ ) {
            grid[i][j].reveal();
        }
    }
}

function draw() {
    background(51);
    for(var i = 0 ; i< grid.length ; i++ ) {
        for(var j = 0 ; j< grid.length ; j++ ) {
            grid[i][j].show();
        }
    }
}

