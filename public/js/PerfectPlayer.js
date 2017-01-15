//PerfectPlayer Class
(function (window) {
    //constructor
    function PerfectPlayer() {
        this.Container_constructor();
        this.depth = 0;
        this.maxScoreIndex = 0;
        this.minScoreIndex = 0;
    }

    //instance of class
    var container = createjs.extend(PerfectPlayer, createjs.Container);

    //update
    container.tick = function (delta) { }
    container.check = function(){
        console.log('checking minimax');
        //this.getMiniMax(window.Game, this.depth);
    }
    container.choice = { x: 0, y: 0 };
    // container.score = function(game, depth) {
    //     let winner = game.grid.chkWinner(game.grid.get2dArray());
        
    //     if (winner == 1){ //player
    //         return 10 - depth;
    //     }
    //     else if (winner == 2){ //lose
    //         return depth - 10;
    //     }
    //     else if (winner == 3){ //tie
    //         return 0;
    //     }
    // }
    container.getMiniMax = function(game, depth){
        // if (game.isOver){
        //     depth = 0;
        //     return score(game);
        // }
        depth++;
        let scores = []; //array of scores
        let moves = []; //array of moves
        
        //new variable of all the possible moves 
        let availableMoves = game.getAvailableMoves();
        
        //loop through the object of possible moves
        availableMoves.forEach(function(move) {
            let possibleGame = game.getNewState(move);
            scores.push(this.minimax(possibleGame, depth));
            moves.push(move);    
        });

        // Do the min or max calculation
        if (game.turnState == 1){ //player
            //the maximum calculation based on negamax algorithms
            this.maxScoreIndex = this.getMaxIndex(scores);
            //TODO the game needs to tell a global variable to store the new choice index
            return scores[this.maxScoreIndex];
        }
        else { //computer
            this.minScoreIndex = this.getMinIndex(scores);
        }
    }
    container.getMaxIndex = function(score){ //get the index of the object with the highest value
        let maxVal = 0;
        let index = 0;
        score.forEach(function(val, i){
            if (maxVal <= val){
                maxVal = val;
                index = i;
            }
        });
        return index;
    }
    container.getMinIndex = function(score){ //get the index of the object with the lowest value
        let minVal = 0;
        let index = 0;
        score.forEach(function(val, i){
            if (minVal >= val){
                minVal = val;
                index = i;
            }
        });
        return index;
    }
    
    window.PerfectPlayer = createjs.promote(PerfectPlayer, "Container");
}(window));