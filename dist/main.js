(()=>{"use strict";var __webpack_modules__={29:()=>{eval("\n;// CONCATENATED MODULE: ./src/ship.js\nclass Ship {\n  constructor (length) {\n    this.length = length;\n    this.hits = 0;\n  }\n\n  hit () {\n    this.hits += 1;\n  }\n\n  isSunk () {\n    if (this.hits >= this.length) return true;\n    return false;\n  }\n\n}\n;// CONCATENATED MODULE: ./src/gameboard.js\n\n\nclass Square {\n  constructor () {\n    this.ship = null;\n    this.hit = false;\n  }\n}\n\nclass Gameboard {\n  constructor () {\n    this.board = [];\n    this.ships = [];\n    for (let i = 0; i < 10; i++) {\n      const col = [];\n      for (let k = 0; k < 10; k++) {\n        col.push(new Square());\n      }\n      this.board.push(col);\n    }\n  }\n\n  place (cords, length, orientation) {\n    if (orientation === 'up') {\n      orientation = [0, 1];\n    } else if (orientation === 'right') {\n      orientation = [1, 0];\n    } else if (orientation === 'down') {\n      orientation = [0, -1];\n    } else if (orientation ==='left') {\n      orientation = [-1, 0];\n    }\n    for (let i = 0; i < length; i++) {\n      let newCords = [cords[0] + orientation[0] * i, cords[1] + orientation[1] * i];\n      if (newCords[0] < 0 || newCords[0] > 9) return undefined;\n      if (newCords[1] < 0 || newCords[1] > 9) return undefined;\n      if (this.hasShip(newCords)) return undefined;\n    }\n\n    let ship = new Ship(length);\n    for (let i = 0; i < length; i++) {\n      this.board[cords[0] + orientation[0] * i][cords[1] + orientation[1] * i].ship = ship;\n    }\n    this.ships.push(ship);\n  }\n\n  hasShip (cords) {\n    if (this.board[cords[0]][cords[1]].ship) return true;\n    return false;\n  }\n\n  getSquare(cords) {\n    return this.board[cords[0]][cords[1]]\n  }\n\n  getShip (cords) {\n    return this.board[cords[0]][cords[1]].ship;\n  }\n\n  receiveAttack (cords) {\n    if (this.hasShip(cords) && this.getSquare(cords).hit === false) {\n      this.getShip(cords).hit();\n    }\n    this.getSquare(cords).hit = true\n  }\n\n  allSunk () {\n    for (const ship of this.ships) {\n      if (!ship.isSunk()) return false;\n    }\n    return true;\n  }\n}\n;// CONCATENATED MODULE: ./src/player.js\n\n\nclass Player {\n  constructor () {\n    this.board = new Gameboard();\n  }\n\n  setOpponent (opponent) {\n    this.opponent = opponent;\n  }\n\n  play (cords) {\n    this.opponent.board.receiveAttack(cords);\n  }\n\n  autoplay () {\n    let randCords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];\n    while (this.opponent.board.getSquare(randCords).hit) {\n      randCords = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];\n    }\n    this.opponent.board.receiveAttack(randCords);\n  }\n}\n;// CONCATENATED MODULE: ./src/drawBoard.js\nfunction drawBoard(player) {\n  if (player.opponent.board.allSunk()) {\n    alert('You Win!');\n  } else if (player.board.allSunk()) {\n    alert('You Lose!');\n  }\n  const enemyBoard = document.getElementById('enemy-board');\n  enemyBoard.innerHTML = '';\n  for (let i = 9; i >= 0; i--) {\n    for (let k = 0; k < 10; k++) {\n      const cords = [k, i];\n      const squareDiv = document.createElement('div');\n      squareDiv.classList.add('square');\n      if (player.opponent.board.hasShip(cords) && player.opponent.board.getSquare(cords).hit) {\n        squareDiv.classList.add('ship');\n      } else if (player.opponent.board.getSquare(cords).hit) {\n        squareDiv.classList.add('miss');\n      }\n      squareDiv.addEventListener('click', () => {\n        player.play(cords);\n        player.opponent.autoplay();\n        drawBoard(player);\n      });\n      enemyBoard.appendChild(squareDiv);\n    }\n  }\n  const playerBoard = document.getElementById('my-board');\n  playerBoard.innerHTML = '';\n  for (let i = 9; i >= 0; i--) {\n    for (let k = 0; k < 10; k++) {\n      const cords = [k, i];\n      const squareDiv = document.createElement('div');\n      squareDiv.classList.add('square');\n      if (player.board.hasShip(cords)) {\n        squareDiv.classList.add('ship');\n        if (player.board.getSquare(cords).hit) {\n          squareDiv.classList.add('ship-hit');\n        }\n      } else if (player.board.getSquare(cords).hit) {\n        squareDiv.classList.add('miss');\n      }\n      playerBoard.appendChild(squareDiv);\n    }\n  }\n}\n;// CONCATENATED MODULE: ./src/index.js\n\n\n\n//create players\nlet player1 = new Player();\nlet player2 = new Player();\nplayer1.setOpponent(player2);\nplayer2.setOpponent(player1);\n//place ships\nplayer1.board.place([3, 5], 4, 'right');\nplayer2.board.place([3, 5], 4, 'right');\n\n// set up form for placing ships\n\nconst shipForm = document.querySelector('form');\n\nshipForm.addEventListener('submit', (event) => {\n  event.preventDefault();\n\n  const length = document.getElementById('length').value;\n  const cords = [Number(document.getElementById('x').value), Number(document.getElementById('y').value)];\n  const orientation = document.getElementById('orientation').value;\n  \n  player1.board.place(cords, length, orientation);\n  drawBoard(player1);\n})\n\n//draw boards with appropriate event listeners on squares\ndrawBoard(player1);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjkuanMiLCJtYXBwaW5ncyI6Ijs7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDOztBQ2YwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQSxzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsSUFBSTtBQUN2QixvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOztBQ3hFbUM7O0FBRXBCO0FBQ2Y7QUFDQSxxQkFBcUIsU0FBUztBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7QUN0QmU7QUFDZjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixRQUFRO0FBQzFCLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7O0FDNUM4QjtBQUNNOztBQUVwQztBQUNBLGtCQUFrQixNQUFNO0FBQ3hCLGtCQUFrQixNQUFNO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxTQUFTO0FBQ1gsQ0FBQzs7QUFFRDtBQUNBLFNBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanM/ZDAzNyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcz9mYzNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzP2E4YTIiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kcmF3Qm9hcmQuanM/Njg1ZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yIChsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICB9XG5cbiAgaGl0ICgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgfVxuXG4gIGlzU3VuayAoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbn0iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNsYXNzIFNxdWFyZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnNoaXAgPSBudWxsO1xuICAgIHRoaXMuaGl0ID0gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCBjb2wgPSBbXTtcbiAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgMTA7IGsrKykge1xuICAgICAgICBjb2wucHVzaChuZXcgU3F1YXJlKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5ib2FyZC5wdXNoKGNvbCk7XG4gICAgfVxuICB9XG5cbiAgcGxhY2UgKGNvcmRzLCBsZW5ndGgsIG9yaWVudGF0aW9uKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAndXAnKSB7XG4gICAgICBvcmllbnRhdGlvbiA9IFswLCAxXTtcbiAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICBvcmllbnRhdGlvbiA9IFsxLCAwXTtcbiAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAnZG93bicpIHtcbiAgICAgIG9yaWVudGF0aW9uID0gWzAsIC0xXTtcbiAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSdsZWZ0Jykge1xuICAgICAgb3JpZW50YXRpb24gPSBbLTEsIDBdO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmV3Q29yZHMgPSBbY29yZHNbMF0gKyBvcmllbnRhdGlvblswXSAqIGksIGNvcmRzWzFdICsgb3JpZW50YXRpb25bMV0gKiBpXTtcbiAgICAgIGlmIChuZXdDb3Jkc1swXSA8IDAgfHwgbmV3Q29yZHNbMF0gPiA5KSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgaWYgKG5ld0NvcmRzWzFdIDwgMCB8fCBuZXdDb3Jkc1sxXSA+IDkpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICBpZiAodGhpcy5oYXNTaGlwKG5ld0NvcmRzKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBsZXQgc2hpcCA9IG5ldyBTaGlwKGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZFtjb3Jkc1swXSArIG9yaWVudGF0aW9uWzBdICogaV1bY29yZHNbMV0gKyBvcmllbnRhdGlvblsxXSAqIGldLnNoaXAgPSBzaGlwO1xuICAgIH1cbiAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gIH1cblxuICBoYXNTaGlwIChjb3Jkcykge1xuICAgIGlmICh0aGlzLmJvYXJkW2NvcmRzWzBdXVtjb3Jkc1sxXV0uc2hpcCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0U3F1YXJlKGNvcmRzKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRbY29yZHNbMF1dW2NvcmRzWzFdXVxuICB9XG5cbiAgZ2V0U2hpcCAoY29yZHMpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZFtjb3Jkc1swXV1bY29yZHNbMV1dLnNoaXA7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrIChjb3Jkcykge1xuICAgIGlmICh0aGlzLmhhc1NoaXAoY29yZHMpICYmIHRoaXMuZ2V0U3F1YXJlKGNvcmRzKS5oaXQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmdldFNoaXAoY29yZHMpLmhpdCgpO1xuICAgIH1cbiAgICB0aGlzLmdldFNxdWFyZShjb3JkcykuaGl0ID0gdHJ1ZVxuICB9XG5cbiAgYWxsU3VuayAoKSB7XG4gICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuc2hpcHMpIHtcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufSIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIH1cblxuICBzZXRPcHBvbmVudCAob3Bwb25lbnQpIHtcbiAgICB0aGlzLm9wcG9uZW50ID0gb3Bwb25lbnQ7XG4gIH1cblxuICBwbGF5IChjb3Jkcykge1xuICAgIHRoaXMub3Bwb25lbnQuYm9hcmQucmVjZWl2ZUF0dGFjayhjb3Jkcyk7XG4gIH1cblxuICBhdXRvcGxheSAoKSB7XG4gICAgbGV0IHJhbmRDb3JkcyA9IFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XG4gICAgd2hpbGUgKHRoaXMub3Bwb25lbnQuYm9hcmQuZ2V0U3F1YXJlKHJhbmRDb3JkcykuaGl0KSB7XG4gICAgICByYW5kQ29yZHMgPSBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xuICAgIH1cbiAgICB0aGlzLm9wcG9uZW50LmJvYXJkLnJlY2VpdmVBdHRhY2socmFuZENvcmRzKTtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRyYXdCb2FyZChwbGF5ZXIpIHtcbiAgaWYgKHBsYXllci5vcHBvbmVudC5ib2FyZC5hbGxTdW5rKCkpIHtcbiAgICBhbGVydCgnWW91IFdpbiEnKTtcbiAgfSBlbHNlIGlmIChwbGF5ZXIuYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgYWxlcnQoJ1lvdSBMb3NlIScpO1xuICB9XG4gIGNvbnN0IGVuZW15Qm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5lbXktYm9hcmQnKTtcbiAgZW5lbXlCb2FyZC5pbm5lckhUTUwgPSAnJztcbiAgZm9yIChsZXQgaSA9IDk7IGkgPj0gMDsgaS0tKSB7XG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCAxMDsgaysrKSB7XG4gICAgICBjb25zdCBjb3JkcyA9IFtrLCBpXTtcbiAgICAgIGNvbnN0IHNxdWFyZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgc3F1YXJlRGl2LmNsYXNzTGlzdC5hZGQoJ3NxdWFyZScpO1xuICAgICAgaWYgKHBsYXllci5vcHBvbmVudC5ib2FyZC5oYXNTaGlwKGNvcmRzKSAmJiBwbGF5ZXIub3Bwb25lbnQuYm9hcmQuZ2V0U3F1YXJlKGNvcmRzKS5oaXQpIHtcbiAgICAgICAgc3F1YXJlRGl2LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyLm9wcG9uZW50LmJvYXJkLmdldFNxdWFyZShjb3JkcykuaGl0KSB7XG4gICAgICAgIHNxdWFyZURpdi5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgICB9XG4gICAgICBzcXVhcmVEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHBsYXllci5wbGF5KGNvcmRzKTtcbiAgICAgICAgcGxheWVyLm9wcG9uZW50LmF1dG9wbGF5KCk7XG4gICAgICAgIGRyYXdCb2FyZChwbGF5ZXIpO1xuICAgICAgfSk7XG4gICAgICBlbmVteUJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZURpdik7XG4gICAgfVxuICB9XG4gIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215LWJvYXJkJyk7XG4gIHBsYXllckJvYXJkLmlubmVySFRNTCA9ICcnO1xuICBmb3IgKGxldCBpID0gOTsgaSA+PSAwOyBpLS0pIHtcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IDEwOyBrKyspIHtcbiAgICAgIGNvbnN0IGNvcmRzID0gW2ssIGldO1xuICAgICAgY29uc3Qgc3F1YXJlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBzcXVhcmVEaXYuY2xhc3NMaXN0LmFkZCgnc3F1YXJlJyk7XG4gICAgICBpZiAocGxheWVyLmJvYXJkLmhhc1NoaXAoY29yZHMpKSB7XG4gICAgICAgIHNxdWFyZURpdi5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgIGlmIChwbGF5ZXIuYm9hcmQuZ2V0U3F1YXJlKGNvcmRzKS5oaXQpIHtcbiAgICAgICAgICBzcXVhcmVEaXYuY2xhc3NMaXN0LmFkZCgnc2hpcC1oaXQnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwbGF5ZXIuYm9hcmQuZ2V0U3F1YXJlKGNvcmRzKS5oaXQpIHtcbiAgICAgICAgc3F1YXJlRGl2LmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgIH1cbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKHNxdWFyZURpdik7XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBkcmF3Qm9hcmQgZnJvbSBcIi4vZHJhd0JvYXJkXCI7XG5cbi8vY3JlYXRlIHBsYXllcnNcbmxldCBwbGF5ZXIxID0gbmV3IFBsYXllcigpO1xubGV0IHBsYXllcjIgPSBuZXcgUGxheWVyKCk7XG5wbGF5ZXIxLnNldE9wcG9uZW50KHBsYXllcjIpO1xucGxheWVyMi5zZXRPcHBvbmVudChwbGF5ZXIxKTtcbi8vcGxhY2Ugc2hpcHNcbnBsYXllcjEuYm9hcmQucGxhY2UoWzMsIDVdLCA0LCAncmlnaHQnKTtcbnBsYXllcjIuYm9hcmQucGxhY2UoWzMsIDVdLCA0LCAncmlnaHQnKTtcblxuLy8gc2V0IHVwIGZvcm0gZm9yIHBsYWNpbmcgc2hpcHNcblxuY29uc3Qgc2hpcEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG5cbnNoaXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IGxlbmd0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZW5ndGgnKS52YWx1ZTtcbiAgY29uc3QgY29yZHMgPSBbTnVtYmVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4JykudmFsdWUpLCBOdW1iZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3knKS52YWx1ZSldO1xuICBjb25zdCBvcmllbnRhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcmllbnRhdGlvbicpLnZhbHVlO1xuICBcbiAgcGxheWVyMS5ib2FyZC5wbGFjZShjb3JkcywgbGVuZ3RoLCBvcmllbnRhdGlvbik7XG4gIGRyYXdCb2FyZChwbGF5ZXIxKTtcbn0pXG5cbi8vZHJhdyBib2FyZHMgd2l0aCBhcHByb3ByaWF0ZSBldmVudCBsaXN0ZW5lcnMgb24gc3F1YXJlc1xuZHJhd0JvYXJkKHBsYXllcjEpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///29\n")}},__webpack_exports__={};__webpack_modules__[29]()})();