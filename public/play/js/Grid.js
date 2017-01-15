//Grid Class
(function (window) {
    //constructor
    function Grid() {
        this.Container_constructor();
        this.setupGrid(7, 6, 20, 12);
    }

    var container = createjs.extend(Grid, createjs.Container); //instance of class

    //check all Grid inside this container
    container.tick = function (delta) {
        for (var i=0; i < this.children.length; i++){
            this.getChildAt(i).tick(delta);
        }
    }

    //add Chip containers to this container
    container.addChip = function(x, y, id, index){ this.addChild(new Chip(x,y,id,index)); }
    container.removeAllGrid = function(){ this.removeAllChildren(); }
    container.setupGrid = function(cols, rows, xPad, yPad){
        //initialize cards by rows and columns
        this.totalMatches = (cols * rows) / 2;
        this.totalOptions = 0; //increase this number when more graphics exist in manifest
        this.currentMatch = 0; //reset current matches
        this.playerMatches = 0; //reset matches possible

        var radius = 48;
        //add cards to deck
        var index = 0;
        for (var row=0; row < rows; row++){
            for (var col=0; col < cols; col++){
                this.addChip(col*((radius+xPad)), row*((radius+yPad)), radius);
            }
        }

        //set table coordinates
        this.x = window.Game.getWidth() / 2;
        this.y = window.Game.getHeight() / 2;
        this.regX = ((radius + xPad) * (cols - 1))/2;
        this.regY = ((radius + yPad) * (rows - 1))/2;
    }
    container.resetAllTweens = function(){
        var length = this.children.length;
        for (var i=0; i < length; i++){ this.getChildAt(i).hideTween(i*100); }
        window.Game.endGraphics.fadeIn();
        window.Game.checkHighScore(window.timer.stopTime);
        this.playerMatches = 0;
    }

    window.Grid = createjs.promote(Grid, "Container");
}(window));