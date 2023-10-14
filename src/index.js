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

//draw boards with appropriate event listeners on squares
drawBoard(player1);