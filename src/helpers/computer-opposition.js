/**
 * Store state of possible winning combos
 * Loop through state and look to block if necessary
 * and look for an empty combo || combo with only computer pieces. 
 * Use -1 to represent x and -2 to represent o
 */
const X_MOVE = -1;
const O_MOVE = -2;
const POSSIBLES = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
 ];
export class ComputerOpposition {
   constructor(computerLetter){
      // We need to make a deep copy of POSSIBLES so we can reset when a new game starts.
      this.possibles = JSON.parse(JSON.stringify(POSSIBLES)); 
      if(computerLetter === 'O'){
         this.computer = O_MOVE;
         this.player = X_MOVE;
      } else {
         this.computer = X_MOVE;
         this.player = O_MOVE;
      }
   }

   updatePossibles(prevMove, isPlayer){
      this.possibles.forEach(possible => {
         possible.forEach((possibleMove, index)=>{
            if(possibleMove === prevMove){
               possible[index] = isPlayer ? this.player : this.computer
            }
         });
      });
   }

   nextMove(){
      let blocks = [];
      let potentialWins = [];
      let lastOptions = [];
      this.possibles.forEach(possible => {
         let moveObject = {
            playerMoves: 0,
            computerMoves: 0,
            possibleMove: null,
         }
         possible.forEach(possibleMove =>{
            if(possibleMove >= 0) {
               moveObject.possibleMove = possibleMove;
               lastOptions.push(possibleMove);
               return;
            }
            if(possibleMove === this.player){
               moveObject.playerMoves++;
            } else {
               moveObject.computerMoves++;
            }
         })
         if(moveObject.playerMoves === 2 && moveObject.possibleMove !== null){
            blocks.push(moveObject);
         } else if (moveObject.playerMoves === 0 || moveObject.possibleMove !== null){
            potentialWins.push(moveObject);
         }
      });
      if(blocks.length >= 1 && this.flipACoin()){
         return blocks[this.getARandomIndex(blocks.length)].possibleMove;
      } else if(potentialWins.length >= 1) {
         return potentialWins[this.getARandomIndex(potentialWins.length)].possibleMove;
      } else if (lastOptions.length >= 1) {
         return lastOptions[0];
      }
   }

   getARandomIndex(arrayLength){
      return Math.floor(Math.random() * arrayLength);
   }

   flipACoin(){
      return Math.round(Math.random());
   }

   clear(){
      this.possibles = JSON.parse(JSON.stringify(POSSIBLES));
      console.log(this.possibles)
   }

}
