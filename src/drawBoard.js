export default function drawBoard(player) {
  const enemyBoard = document.getElementById('enemy-board');
  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      const squareDiv = document.createElement('div');
      squareDiv.classList.add('square');
      squareDiv.addEventListener('click', () => {
        player.play([i, k]);
        if (player.opponent.board.hasShip([i, k])) {
          squareDiv.classList.add('ship');
        } else {
          squareDiv.classList.add('miss');
        }
      });
      enemyBoard.appendChild(squareDiv);
    }
  }
  const playerBoard = document.getElementById('my-board');
  for (let i = 0; i < 10; i++) {
    for (let k = 0; k < 10; k++) {
      const squareDiv = document.createElement('div');
      squareDiv.classList.add('square');
      squareDiv.addEventListener('click', () => {
        if (player.board.hasShip([i, k])) squareDiv.classList.add('ship');
      });
      playerBoard.appendChild(squareDiv);
    }
  }
}