import React from "react";
import "./Keyboard.css"; // import the CSS file
import { checkGuess } from '../../game-helpers';


function Keyboard({tentativeGuess, setTentativeGuess, gameStatus, guesses, answer}) {

const alphabetStrings = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];  
const rowOne = alphabetStrings.slice(0,9);
const rowTwo = alphabetStrings.slice(10,18);
const rowThree = alphabetStrings.slice(19,25);

const alphabetStatus = {};

alphabetStrings.forEach( letter => {
  alphabetStatus[letter] = "incorrect";
} );

const gameEnded = gameStatus !== "running";

if(guesses[0]) {
  let iteration = 0;
  guesses.forEach((guess, index)=>{
    iteration++;
    console.log(`iteration: ${iteration}`)
    const checked = checkGuess(guess, answer);
    checked.forEach( ({letter, status}) => {
      if(alphabetStatus[letter] === "correct") {
        return;
      }
      if(alphabetStatus[letter] === "misplaced" && status !== "correct") {
        return;
      }
      alphabetStatus[letter] = status;
    } );
  });
  console.log(`alphabetStatus["w"]: ${alphabetStatus["w"]}`)
}




const clickHandler = (letter) => {
  if(tentativeGuess.length >= 5) {
    return;
  }
  const nextTentativeGuess = tentativeGuess + letter.toUpperCase();
  setTentativeGuess(nextTentativeGuess);
}

const Letter = ({letter, keyStatus}) => {
  let className="key"
  if(keyStatus) {
    className+=` ${keyStatus}`;
  }
  if (gameEnded) {
    className="key hovered";
  }
  return (
    <button
      disabled={gameEnded}
      className={className}
      onClick={ () => clickHandler(letter) }
    >{letter}</button>  
  )
}
  // console.log(`gameEnded: ${gameEnded}`)
  return (
    <div className="keyboard">
    <div className="row">
      {rowOne.map( letter => {
        const keyStatus = alphabetStatus[letter];
        return (
          <Letter letter={letter} key={letter} keyStatus={keyStatus} />
        ) 
      })}
    </div>
    <div className="row">
      {rowTwo.map( letter => {
        const keyStatus = alphabetStatus[letter];
        return (
          <Letter letter={letter} key={letter} keyStatus={keyStatus} />
        ) 
      })}
    </div>
    <div className="row">
      {rowThree.map( letter => {
        const keyStatus = alphabetStatus[letter];
        return (
          <Letter letter={letter} key={letter} keyStatus={keyStatus} />
        ) 
      })}
     </div>
  </div>
  );
}

export default Keyboard;
