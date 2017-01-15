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
        this.canvas = document.getElementById("gameCanvas");
        this.stage = new createjs.Stage(this.canvas);
        this.stage.enableMouseOver(60);
        createjs.Touch.enable(this.stage);
        this.box = (this.canvas.width / 16); //16 = 1em

        this.assetManager = new AssetManager(this.canvas.width, this.canvas.height, this.box);
        this.assetManager.init();
        this.stage.addChild(this.assetManager);
        this.stage.on("stagemousedown", function(event){ Game.prototype.stageMouseDown(event); });
        this.stage.on("stagemousemove", function(event){ Game.prototype.stageMouseMove(event); });
        this.stage.on("stagemouseup", function(event){ Game.prototype.stageMouseUp(event); });
        this.assetManager.preload.on("complete", function(){ Game.prototype.setStage(); });
        this.assetManager.preload.on("progress", function(){ Game.prototype.assetManager.updateLoading(); window.Game.stage.update(); });
    }
    Game.prototype.setStage = function() {
        //clean up stage
        this.stage.removeAllChildren();

        //initialize game objects
        if (this.grid == null) this.grid = new Grid();

        //ensure stage is blank and add the player
        this.stage.clear();

        //draw according to game view
        this.board = new createjs.Shape();
        this.board.graphics.beginFill("#1290bf").drawRect(80,54,480,372);
        this.stage.addChild(this.board);
        this.stage.addChild(this.grid); //loading

        //start game timer
        if (!createjs.Ticker.hasEventListener("tick")) {
            createjs.Ticker.addEventListener("tick", tick);
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            //createjs.Ticker.setFPS(24);
        }
    }
    Game.prototype.stageMouseDown = function(event){}
    Game.prototype.stageMouseMove = function(event){}
    Game.prototype.stageMouseUp = function(event){}
    Game.prototype.getWidth = function(){ return this.canvas.width; }
    Game.prototype.getHeight = function(){ return this.canvas.height; }
    Game.prototype.retry = function(){
        window.timer.stop();
        this.toggleRetryButton(false);
        this.setCurrentTime(0);
        this.grid.removeAllGrid();
        this.grid.setupGrid(7, 6, 12);
    }
    Game.prototype.toggleRetryButton = function(version){
        if (version == true){
            document.getElementById('retry').style.backgroundColor = "#e67c49";
            document.getElementById('retry').style.color = "#ffffff";
        }
        else {
            document.getElementById('retry').style.backgroundColor = "#f3f3f3";
            document.getElementById('retry').style.color = "#666666";
        }
    }
    //create prototype of self
    window.Game = new Game();
}(window));