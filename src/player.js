import Gameboard from "./gameboard"

export default class Player {
  constructor () {
    this.board = new Gameboard();
  }

  setOpponent (opponent) {
    this.opponent = opponent;
  }

  autoplay () {
    let randCords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    while (this.opponent.board.getSquare(randCords).hit) {
      randCords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }
    this.opponent.board.receiveAttack(randCords);
  }
}