import Player from "./player";
import drawBoard from "./drawBoard";

//create players
let player1 = new Player();
let player2 = new Player();
player1.setOpponent(player2);
player2.setOpponent(player1);
//place ships
player1.board.place([3, 5], 4, 'right');
player2.board.place([3, 5], 4, 'right');

// set up form for placing ships

const shipForm = document.querySelector('form');

shipForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const length = document.getElementById('length').value;
  const cords = [Number(document.getElementById('x').value), Number(document.getElementById('y').value)];
  const orientation = document.getElementById('orientation').value;
  
  player1.board.place(cords, length, orientation);
  drawBoard(player1);
})

//draw boards with appropriate event listeners on squares
drawBoard(player1);