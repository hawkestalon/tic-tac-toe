import React from 'react';
import "../index.css";

export function Square(props) {
    if(props.value){
      return(
        <button className="square" disabled>
          {props.value}
        </button>
      )
    }
   return (
      <button className="square" onClick={() => props.onClick()}>
        {props.value}
      </button>
    );
}

export default Square