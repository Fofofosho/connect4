//PerfectPlayer Class
(function (window) {
    //constructor
    function PerfectPlayer() {
        this.Container_constructor();
    }

    //instance of class
    var container = createjs.extend(PerfectPlayer, createjs.Container);

    //update
    container.tick = function (delta) { }
    container.check = function(){
        
    }
    
    window.PerfectPlayer = createjs.promote(PerfectPlayer, "Container");
}(window));