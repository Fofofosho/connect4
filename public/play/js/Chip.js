//Chip Class
(function (window) {
    //constructor
    function Chip(x, y, radius, id) {
        this.Container_constructor();
        this.x = x;
        this.y = y;
        this.id = id;
        this.radius = 24;
        this.flipped = false;
        this.maxChipStyles = 2;
        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill("#322931").drawCircle(0,0,this.radius);
        this.addChild(this.shape);
        this.addListeners();
    }

    //instance of class
    var container = createjs.extend(Chip, createjs.Container);

    //update
    container.tick = function (delta) {

    }
    container.addListeners = function(){
        this.mouseChildren = false; //prevent action on 'content'
        this.on("pressmove", function(evt){ this.pressMove(evt); });
        this.on("click", function(evt){ this.click(evt); });
        this.on("rollover", function(evt){ this.rollOver(evt); });
        this.on("rollout", function(evt){ this.rollOut(evt); });
    }
    container.pressMove = function(evt) {  }
    container.click = function(evt) {
        this.startTween();
    }
    container.rollOver = function(evt) { this.cursor="pointer"; }
    container.rollOut = function(evt) { }
    container.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    container.startTween = function(){
        if (this.flipped == false){
            this.flipped = true;
            createjs.Tween.get(this, {override:false}).to({scaleX: 0, scaleY: 1.25}, 250, createjs.Ease.sineIn)
            .call(function(){ //swap out image
                this.removeAllChildren();
                this.addChild(this.graphic);
            })
            .to({scaleX: 1, scaleY: 1}, 250, createjs.Ease.sineOut)
            .call(function(){  });
        }
    }
    container.resetTween = function(delay, lastDelay){
        delay = delay != null ? delay : 0;
        this.flipped = false;
        createjs.Tween.get(this, {override:false}).wait(delay).to({scaleX: 0, scaleY: 1.25}, 250, createjs.Ease.sineIn)
        .call(function(){ //reset original image
            this.removeAllChildren();
            this.addChild(this.graphic);
            this.flipped = false;
            if (delay == lastDelay){
                console.log('flipped');
            }
        })
        .to({scaleX: 1, scaleY: 1}, 250, createjs.Ease.sineOut);
    }
    container.hideTween = function(delay){
        delay = delay != null ? delay : 0;
        this.flipped = false;
        createjs.Tween.get(this, {override:false}).wait(delay).to({scaleX: 0, scaleY: 1.25}, 250, createjs.Ease.sineIn)
        .call(function(){ //reset original image
            this.removeAllChildren();
            this.addChild(this.graphic);
            this.flipped = false;
        })
        .to({scaleX: 1, scaleY: 1, alpha: 0 }, 250, createjs.Ease.sineOut);
    }

    window.Chip = createjs.promote(Chip, "Container");
}(window));