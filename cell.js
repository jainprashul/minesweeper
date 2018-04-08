class Cell {
    constructor(i , j , w){
        this.i = i;
        this.j = j;
        this.w = w;

        this.x = this.i*this.w;
        this.y = this.j*this.w;

        this.bee = false;
        this.revealed = false;
        this.neighborCount = 0 ;
        this.over = false;
    }

    show(){
        stroke(0);
        fill(255);
        rect(this.x , this.y , this.w, this.w);

        if(this.revealed){
            if (this.bee){
                if (this.over){
                    fill(255,0,0);
                } else {
                    fill(230);
                }
                ellipse(this.x + this.w/2 , this.y + this.w/2, this.w * 0.5)
            } else {
                stroke(0);
                fill(230);
                rect(this.x , this.y , this.w, this.w);
                if (this.neighborCount > 0) {
                    textAlign(CENTER);
                    fill(0)
                    text(this.neighborCount, this.x + this.w / 2, this.y + this.w - 6);
                }
            }


        }

    }

    contains(x,y) {
        return (
            (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w )
        );
    }

    reveal(){
        this.revealed = true;

        if (this.neighborCount == 0){
            this.floodFill();
        }
    }

    countBees(){
        if(this.bee){
            this.neighborCount = -1;
            return;
        }

        var total = 0;
        for(var xoff = -1 ; xoff<= 1 ; xoff++ ) {
            for(var yoff = -1 ; yoff<= 1 ; yoff++ ) {
                var i = this.i + xoff;
                var j = this.j + yoff;
                if (i > -1 && i < cols && j > -1 && j < rows ) {
                    var neighbour = grid[i][j];
                    if (neighbour.bee) {
                        total++;
                    }
                }
            }
        }
        this.neighborCount = total;
    }

    floodFill(){
        for(var xoff = -1 ; xoff<= 1 ; xoff++ ) {
            for(var yoff = -1 ; yoff<= 1 ; yoff++ ) {
                var i = this.i + xoff;
                var j = this.j + yoff;
                if (i > -1 && i < cols && j > -1 && j < rows ) {
                    var neighbour = grid[i][j];
                    if (!neighbour.bee && !neighbour.revealed) {
                        neighbour.reveal();
                    }
                }
            }
        }
    }
}