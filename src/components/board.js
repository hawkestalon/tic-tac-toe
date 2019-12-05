import React, { Component } from "react";
import Square from "./square";
import { calculateWinner } from "../helpers/find-a-winner";
import "../index.css";
import { ComputerOpposition } from '../helpers/computer-opposition';

class Board extends Component {
   constructor(props){
      super(props);
      this.state = {
         squares: Array(9).fill(null),
         isXTurn: true,
         winner: null,
         history: [Array(9).fill(null)],
         oWins: 0,
         xWins: 0,
      }
      this.computerOppostion = new ComputerOpposition('O')
   }

   handleClick(i){
      let squares = this.state.squares.slice();
      squares[i] = 'X'
      this.computerOppostion.updatePossibles(i, true)
      squares = this.getComputerMove(squares);
      const winner = calculateWinner(squares);
      if(winner) this.declareWinner(winner);
      const history = this.state.history.concat([squares])
      this.setState({squares, isXTurn: !this.state.isXTurn, winner, history});
   }

   declareWinner(winner){
      const newState = {
         oWins: this.state.oWins,
         xWins: this.state.xWins,
         winner
      }
      if(winner === 'X'){
         newState.xWins++;
      } else {
         newState.oWins++;
      }
      this.setState(newState);
      return;
   }

   getComputerMove(squares){
      const nextMove = this.computerOppostion.nextMove();
      squares[nextMove] = 'O'
      this.computerOppostion.updatePossibles(nextMove, false);
      return squares;
   }

   resetState = () =>{
      let squares = Array(9).fill(null);
      this.computerOppostion.clear();
      this.setState({squares, isXTurn: true, winner: null, history: [squares]});
   }
   
   undo = () => {
      if(this.state.history.length === 1) return;
      const modifiedHistory = this.state.history.slice(0, this.state.history.length - 1);
      this.setState({squares: modifiedHistory[modifiedHistory.length - 1], isXTurn: !this.state.isXTurn, history: modifiedHistory})
   }
   
   renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }

  
   render() {
      if(this.state.winner){
         return(
            <div>
               <div className="status">Player {this.state.winner} has won!</div>
               <button onClick={this.resetState} className="start-over">Start A New Game</button>
            </div>
         )
      }
  
      return (
        <div>
          <div className="status">Player-wins: {this.state.xWins}</div>
          <div className="status">Computer-wins: {this.state.oWins}</div>
          <button onClick={this.resetState} className="start-over">Start Over</button>
          { /* The undo button is difficult because state is stored differently in the AI class */}
          {/* <button onxClick={this.undo} className="start-over">Undo</button> */}
            <div className="board-row">
               {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
            </div>
            <div className="board-row">
               {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
            </div>
            <div className="board-row">
               {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
            </div>
        </div>
      );
   }
}

export default Board

