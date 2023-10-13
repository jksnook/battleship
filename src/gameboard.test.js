import Gameboard from "./gameboard";

test ('place ship', () =>  {
  let myBoard = new Gameboard();
  myBoard.place([0, 0], 3, 'right');
  expect(myBoard.hasShip([2,0])).toBe(true);
});

test ('place ship in invalid location', () =>  {
  let myBoard = new Gameboard();
  myBoard.place([0, 0], 3, 'left');
  expect(myBoard.hasShip([0,0])).toBe(false);
});

test ('place overlapping ships', () =>  {
  let myBoard = new Gameboard();
  myBoard.place([0, 0], 3, 'right');
  myBoard.place([1, 1], 2, 'down');
  expect(myBoard.hasShip([1,1])).toBe(false);
});

test ('attack ship', () => {
  let myBoard = new Gameboard();
  myBoard.place([0, 0], 3, 'right');
  myBoard.receiveAttack([0,0]);
  myBoard.receiveAttack([1,0]);
  myBoard.receiveAttack([2,0]);
  expect(myBoard.getShip([0,0]).isSunk()).toBe(true);
})

test ('all ships sunk', () => {
  let myBoard = new Gameboard();
  myBoard.place([0, 0], 3, 'right');
  myBoard.receiveAttack([0,0]);
  myBoard.receiveAttack([1,0]);
  myBoard.receiveAttack([2,0]);
  expect(myBoard.allSunk()).toBe(true);
})