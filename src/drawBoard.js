export default function drawBoard(player) {
  if (player.opponent.board.allSunk()) {
    alert('You Win!');
  } else if (player.board.allSunk()) {
    alert('You Lose!');
  }
  const enemyBoard = document.getElementById('enemy-board');
  enemyBoard.innerHTML = '';
  for (let i = 9; i >= 0; i--) {
    for (let k = 0; k < 10; k++) {
      const cords = [k, i];
      const squareDiv = document.createElement('div');
      squareDiv.classList.add('square');
      if (player.opponent.board.hasShip(cords) && player.opponent.board.getSquare(cords).hit) {
        squareDiv.classList.add('ship');
      } else if (player.opponent.board.getSquare(cords).hit) {
        squareDiv.classList.add('miss');
      }
      squareDiv.addEventListener('click', () => {
        player.play(cords);
        player.opponent.autoplay();
        drawBoard(player);
      });
      enemyBoard.appendChild(squareDiv);
    }
  }
  const playerBoard = document.getElementById('my-board');
  playerBoard.innerHTML = '';
  for (let i = 9; i >= 0; i--) {
    for (let k = 0; k < 10; k++) {
      const cords = [k, i];
      const squareDiv = document.createElement('div');
      squareDiv.classList.add('square');
      if (player.board.hasShip(cords)) {
        squareDiv.classList.add('ship');
      } else if (player.board.getSquare(cords).hit) {
        squareDiv.classList.add('miss');
      }
      playerBoard.appendChild(squareDiv);
    }
  }
}