import Player from "./player";

test('create player', () => {
  let player1 = new Player();
  let player2 = new Player();
  player1.setOpponent(player2);
  player2.setOpponent(player1);
  player2.board.place([0,0], 3, 'right');
  for (let i = 0; i < 100; i++) {
    player1.autoplay();
  }
  expect(player2.board.allSunk()).toBe(true);
})