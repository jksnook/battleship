import Player from "./player";
import drawBoard from "./drawBoard";

//create players
let player1 = new Player();
let player2 = new Player();
player1.setOpponent(player2);
player2.setOpponent(player1);
//place ships

//draw boards with appropriate event listeners on squares
drawBoard(player1);