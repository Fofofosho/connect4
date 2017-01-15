module.exports = {
    choice : { x: 0, y: 0 }, /*2d index (x,y) */
    score : function (game, depth) {
        if (game.win == 0){
            return 10 - depth;
        }
        else if (game.win == 1){ //lose
            return depth - 10;
        }
        else if (game.win == 2){ //tie
            return 0;
        }

        function getMaxIndex(){
            
        }
    },
    minimax : function(game, depth){
        if (game.isOver){
            return score(game);
        }
        depth++;
        scores = []; //array of scores
        moves = []; //array of moves
        
        //new variable of all the possible moves 
        let availableMoves = game.getAvailableMoves();
        
        //loop through the object of possible moves
        availableMoves.forEach(function(move) {
            let possibleGame = game.getNewState(move);
            scores.push(minimax(possibleGame, depth));
            moves.push(move);    
        });

        // Do the min or max calculation
        if (game.turnState == 1){ //player
            //the maximum calculation based on negamax algorithms
            maxScoreIndex = getMaxIndex(scores);
            //TODO the game needs to tell a global variable to store the new choice index
            return scores[maxScoreIndex];
        }
        else { //computer
            minScoreIndex = getMinIndex(scores);
        }    
    },
    getMaxIndex : function(score){ //get the index of the object with the highest value
        let maxVal = 0;
        let index = 0;
        score.forEach(function(val, i){
            if (maxVal <= val){
                maxVal = val;
                index = i;
            }
        });
        return index;
    },
    getMinIndex : function(score){ //get the index of the object with the lowest value
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
};