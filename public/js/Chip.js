//Chip Class
(function (window) {
    //constructor
    function Chip(x, y, radius, index) {
        this.Container_constructor();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.index = index;
        this.type = 0;
        this.maxChipStyles = 2;
        this.shape_1 = new createjs.Shape();
        this.shape_2 = new createjs.Shape();
        this.shape_2.alpha = 0;
        this.shape_2.y = -420;
        this.shape_1.graphics.beginFill("#322931").drawCircle(0,0,this.radius);
        this.shape_2.graphics.beginFill("#fdcc59").drawCircle(0,0,this.radius * 0.75);
        this.addChild(this.shape_1, this.shape_2);
        this.addListeners();
    }

    //instance of class
    var container = createjs.extend(Chip, createjs.Container);

    //update
    container.tick = function (delta) { }
    container.addListeners = function(){
        this.mouseChildren = false; //prevent action on 'content'
        this.on("pressmove", function(evt){ this.pressMove(evt); });
        this.on("click", function(evt){ this.click(evt); });
        this.on("rollover", function(evt){ this.rollOver(evt); });
        this.on("rollout", function(evt){ this.rollOut(evt); });
    }
    container.pressMove = function(evt) {  }
    container.click = function(evt) { window.Game.setChip(this.index); }
    container.rollOver = function(evt) { this.updateCursor(); }
    container.rollOut = function(evt) { this.updateCursor(); }
    container.startTween = function(){
        var y2 = this.shape_1.y;
        createjs.Tween.get(this.shape_2, {override:false}).to({ 
            y : y2,
            alpha: 1
         }, 500, createjs.Ease.bounceOut).call(function(){  });
    }
    container.setChipType = function(type){
        var color = "#322931";
        this.type = type;
        switch(type){
            case(1): color = "#fdcc59"; break; 
            case(2): color = "#dd464c"; break;
            case(3): color = "transparent"; break;
        }
        this.shape_2.graphics.beginFill(color).drawCircle(0,0,this.radius * 0.75);
        this.startTween();
    }
    container.updateCursor = function(){ this.cursor="pointer"; }

    window.Chip = createjs.promote(Chip, "Container");
}(window));