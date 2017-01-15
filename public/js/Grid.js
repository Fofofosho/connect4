//Grid Class
(function (window) {
    //constructor
    function Grid() {
        this.Container_constructor();
        this.reset();
    }

    var container = createjs.extend(Grid, createjs.Container); //instance of class

    //check all Grid inside this container
    container.tick = function (delta) {
        for (var i=0; i < this.children.length; i++){
            if (this.getChildAt(i).radius != null){
                this.getChildAt(i).tick(delta);
            }
        }
    }

    //add Chip containers to this container
    container.addChip = function(x, y, radius, index){ this.addChild(new Chip(x, y, radius, index)); }
    container.removeAllGrid = function(){ this.removeAllChildren(); }
    container.setupGrid = function(cols, rows, xPad, yPad, radius){
        //add new chips to screen
        this.cols = cols;
        this.rows = rows;
        for (var row=0; row < rows; row++){
            for (var col=0; col < cols; col++){
                this.addChip(col*(((radius*2)+xPad)), row*(((radius*2)+yPad)), radius, col+(row*cols));
            }
        }
        //set table coordinates
        this.x = window.Game.getWidth() / 2;
        this.y = window.Game.getHeight() / 2;
        this.regX = (((radius * 2) + xPad) * (cols - 1))/2;
        this.regY = (((radius * 2) + yPad) * (rows - 1))/2;
    }
    container.reset = function(){
        this.removeAllChildren();
        this.setupGrid(7, 6, 20, 12, 24);
    }
    container.resetAllTweens = function(){
        var length = this.children.length;
        for (var i=0; i < length; i++){ this.getChildAt(i).hideTween(i*100); }
    }
    container.get2dArray = function(){
        var array = [];
        for (var row=0; row < this.rows; row++){
            array[row] = [];
            for (var col=0; col < this.cols; col++){
                var i = col+(row*this.cols);
                array[row][col] = this.getChildAt(i);
            }
        }
        return array;
    }
    container.arrayToString = function(array){
        var arrayString = "";
        for (var row=0; row < this.rows; row++){
            for (var col=0; col < this.cols; col++){ arrayString += array[row][col].type; }
            if (row < array.length-1) arrayString += "\r\n"; //prevent last return & next line
        }
        return arrayString;
    }
    
    container.stringToGrid = function(str) {
        let obj = JSON.parse(str);
        let rows = obj.length;
        let cols = obj[0].length;
        this.reset();

        for (var row=0; row < rows; row++){
            for (var col=0; col < cols; col++){
                this.getChildAt(col+(row*cols)).setChipType(obj[row][col]);
                window.Game.currentPlayer = window.Game.getCurrentPlayer(obj);
            }
        }
    }

    window.Grid = createjs.promote(Grid, "Container");
}(window));