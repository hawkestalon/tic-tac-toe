import { Possibles } from "./find-a-winner";
/**
 * Store state of possible winning combos
 * Loop through state and look to block if necessary
 * Loop through state and look for an empty combo || combo with only computer pieces. 
 * If no empty combos no possible winning moves exist.
 * Use -1 to represent x and -2 to represent o
 */
const X_MOVE = -1;
const O_MOVE = -2;

export class ComputerOpposition {
   constructor(computerLetter){
      this.possibles = Possibles;
      if(computerLetter === 'O'){
         this.computer = O_MOVE;
         this.player = X_MOVE;
      } else {
         this.computer = X_MOVE;
         this.player = O_MOVE;
      }
   }

   updatePossibles(prevMove, playerMove){
       this.possibles.array.forEach(possible => {
          possible.forEach(possibleMove=>{
             if(possibleMove === prevMove){
                possibleMove = playerMove;
               }
            });
         });
   }
      
   getNextMove(prevMove){
      this.updatePossibles(prevMove, this.player);
      return this.nextMove();
   }

   nextMove(){
      let blocks = [];
      let potentialWins = [];
      this.possibles.forEach(possible => {
         let moveObject = {
            playerMoves: 0,
            computerMoves: 0,
            possibleMove: null,
         }
         possible.forEach(possibleMove =>{
            if(possibleMove >= 0) {
               moveObject.possibleMove = possibleMove;
               return;
            }
            if(possibleMove === this.player){
               moveObject.playerMoves++;
            } else {
               moveObject.computerMoves++;
            }
         })
         if(moveObject.playerMoves === 2){
            blocks.push(moveObject);
         } else if (moveObject.playerMoves === 0){
            potentialWins.push(moveObject);
         }
      });
      if(blocks.length >= 1 && this.flipACoin()){
         return blocks[this.getARandomIndex(blocks.length)];
      } else {
         return potentialWins[this.getARandomIndex(potentialWins.length)];
      }
   }

   getARandomIndex(arrayLength){
      return Math.floor(Math.random() * arrayLength);
   }

   flipACoin(){
      return Math.round(Math.random());
   }

}
