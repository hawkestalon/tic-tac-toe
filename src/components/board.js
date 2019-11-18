import React, { Component } from "react";
import Square from "./square";
import { calculateWinner } from "../helpers/find-a-winner";
import "../index.css";

class Board extends Component {
   state = {
      squares: Array(9).fill(null),
      isXTurn: true,
      winner: null,
      history: [Array(9).fill(null)],
      oWins: 0,
      xWins: 0,
   }

   handleClick(i){
      let squares = this.state.squares.slice();
      squares[i] = this.getPlayer();
      const winner = calculateWinner(squares);
      if(winner){
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
      const history = this.state.history.concat([squares])
      this.setState({squares, isXTurn: !this.state.isXTurn, winner, history});
   }

   getPlayer = ()=>{
      return this.state.isXTurn ? 'X' : 'O'
   }

   resetState = () =>{
      let squares = Array(9).fill(null);
      this.setState({squares, isXTurn: true, winner: null, history: [squares]});
   }

   renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }

   undo = () => {
      if(this.state.history.length === 1) return;
      const modifiedHistory = this.state.history.slice(0, this.state.history.length - 1);
      this.setState({squares: modifiedHistory[modifiedHistory.length - 1], isXTurn: !this.state.isXTurn, history: modifiedHistory})
    }
  
   render() {
      const status = `Next Player ${this.getPlayer()}`;
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
          <div className="status">{status}</div>
          <div className="status">X-wins: {this.state.xWins}</div>
          <div className="status">O-wins: {this.state.oWins}</div>
          <button onClick={this.resetState} className="start-over">Start Over</button>
          <button onClick={this.undo} className="start-over">Undo</button>
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

