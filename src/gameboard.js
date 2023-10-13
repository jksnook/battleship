import Ship from "./ship";

class Square {
  constructor () {
    this.ship = null;
    this.hit = false;
  }
}

export default class Gameboard {
  constructor () {
    this.board = [];
    this.ships = [];
    for (let i = 0; i < 10; i++) {
      const col = [];
      for (let k = 0; k < 10; k++) {
        col.push(new Square());
      }
      this.board.push(col);
    }
  }

  place (cords, length, orientation) {
    if (orientation === 'up') {
      orientation = [0, 1];
    } else if (orientation === 'right') {
      orientation = [1, 0];
    } else if (orientation === 'down') {
      orientation = [0, -1];
    } else if (orientation ==='left') {
      orientation = [-1, 0];
    }
    for (let i = 0; i < length; i++) {
      let newCords = [cords[0] + orientation[0] * i, cords[1] + orientation[1] * i];
      if (newCords[0] < 0 || newCords[0] > 9) return undefined;
      if (newCords[1] < 0 || newCords[1] > 9) return undefined;
      if (this.hasShip(newCords)) return undefined;
    }

    let ship = new Ship(length);
    for (let i = 0; i < length; i++) {
      this.board[cords[0] + orientation[0] * i][cords[1] + orientation[1] * i].ship = ship;
    }
    this.ships.push(ship);
  }

  hasShip (cords) {
    if (this.board[cords[0]][cords[1]].ship) return true;
    return false;
  }

  getSquare(cords) {
    return this.board[cords[0]][cords[1]]
  }

  getShip (cords) {
    return this.board[cords[0]][cords[1]].ship;
  }

  receiveAttack (cords) {
    if (this.hasShip(cords) && this.getSquare(cords).hit === false) {
      this.getShip(cords).hit();
    }
    this.getSquare(cords).hit = true
  }

  allSunk () {
    for (const ship of this.ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }
}