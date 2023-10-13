import Ship from "./ship.js";

test ('hit ship', () => {
  let testShip = new Ship(3);
  testShip.hit();
  testShip.hit();
  expect(testShip.hits).toBe(2);
});

test ('sink ship', () => {
  let testShip = new Ship(3);
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
})