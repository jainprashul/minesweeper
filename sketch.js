function make2dArray(rows, cols) {
    // Make the 2d Array
    var arr = new Array(cols);
    for(var i = 0 ; i< arr.length ; i++ ){
        arr[i] = new Array(rows);
    }
    return arr;
}

var grid;
var w = 40; //width size
var cols ;
var rows ;
var totalBees = 20;
var button;
var options = [];
var choice = [];
var canvas;
var button2;
var hints = 3;

function setup() {

    canvas = createCanvas(401,401);
    canvas.position(width/2 - 200,100);
    cols = floor(width/w);
    rows = floor(height/w);
    grid = make2dArray(rows, cols);
    button = createButton('Reload');
    button.mousePressed(reloadGame);
    button.position(width/2 -60, 550);
    button2 = createButton('Hint');
    button2.mousePressed(hint);
    button2.position(width/2 + 60, 550);


    // create the new cells
    for(var i = 0 ; i< grid.length ; i++ ) {
        for(var j = 0 ; j< grid.length ; j++ ) {
                grid[i][j] = new Cell(i ,j ,w);
            }
        }

    // pick bees spots
    {
        for(var i = 0 ; i< rows ; i++ ) {
            for(var j = 0 ; j< cols ; j++ ) {
                options.push([i,j]);
            }
        }

        for (var n = 0 ; n < totalBees ; n++){
            var select = random(options);
            choice.push(select);
            var x = select[0];
            var y = select[1];

            grid[x][y].bee = true;
        }

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
            setTimeout(reloadGame , 2000);
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

function reloadGame() {
    document.location.reload();
}


function hint() {
    if (hints == 0){
        return(alert("Exceed Number of hints"));
    }
    else {
        hints--;
        alert(hints + " hints Left.");
    }
    var index = floor(random(choice.length));
    var hintCell = choice[index];
    choice.splice(index , 1);
    let x = hintCell[0];
    let y = hintCell[1];
    grid[x][y].revealed = true;

}