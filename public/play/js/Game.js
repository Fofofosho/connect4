(function (window) {
    //private functions
    function Game(){  //constructor
        Game.prototype.init();
    }
    function tick(event) {
        this.delta = event.delta; //elapsedTimeInMS / 1000msPerSecond
        window.Game.grid.tick(delta);
        window.Game.stage.update();
    }

    //public functions
    Game.prototype.init = function() {
        // setup everything yo
        this.currentPlayer = 1;
        this.canvas = document.getElementById("gameCanvas");
        this.stage = new createjs.Stage(this.canvas);
        this.stage.enableMouseOver(60);
        createjs.Touch.enable(this.stage);
        this.box = (this.canvas.width / 16); //16 = 1em

        this.assetManager = new AssetManager(this.canvas.width, this.canvas.height, this.box);
        this.assetManager.init();
        this.stage.addChild(this.assetManager);
        this.assetManager.preload.on("complete", function(){ Game.prototype.setStage(); });
        this.assetManager.preload.on("progress", function(){ Game.prototype.assetManager.updateLoading(); window.Game.stage.update(); });
    }
    Game.prototype.setStage = function() {
        this.stage.removeAllChildren(); //clean up stage
        if (this.grid == null) this.grid = new Grid(); //initialize game objects
        this.stage.clear(); //ensure stage is blank and add the player

        //draw according to game view
        this.background = new createjs.Shape();
        this.board = new createjs.Shape();
        this.background.graphics.beginFill("#322931").drawRect(0,0,640,480);
        this.board.graphics.beginRadialGradientFill(["#1290bf","#322931"],[0,1],320,54,0,320,54,640).drawRect(80,54,480,372);
        this.stage.addChild(this.background, this.board, this.grid);

        //start game timer
        if (!createjs.Ticker.hasEventListener("tick")) {
            createjs.Ticker.addEventListener("tick", tick);
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            //createjs.Ticker.setFPS(24);
        }
    }
    Game.prototype.setChip = function(index){ 
        var array = this.grid.get2dArray();
        var cols = this.grid.cols;
        var rows = this.grid.rows;
        col = index % cols;
        row = Math.floor(index / cols);
        for (var r=0; r < rows; r++){
            if (array[r][col].type != 0 && r > 0){
                row = r-1;
                index = col+(row*cols);
                break;
            }
            if (r >= (rows-1)){
                row = r;
                index = col+(row*cols);
            }
        }
        if (array[row][col].type == 0){
             this.grid.getChildAt(index).setChipType(this.currentPlayer);
             this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
        }
    }
    Game.prototype.getWidth = function(){ return this.canvas.width; }
    Game.prototype.getHeight = function(){ return this.canvas.height; }
    Game.prototype.retry = function(){  }
    //create prototype of self
    window.Game = new Game();
}(window));